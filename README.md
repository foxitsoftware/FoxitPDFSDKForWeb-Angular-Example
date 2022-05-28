# FoxitPDFSDK for Web Example - Angular.js

This guide shows two examples for angular. One introduces how to quickly run the out-of-the-box sample in FoxitPDFSDK for Web package, and the other presents a way to integrate FoxitPDFSDK for Web into an exiting Angular/cli app.

## Quickly run the out-of-the-box example for Angular  

This example is built for [@angular/cli](https://www.npmjs.com/package/@angular/cli) app.

### Prerequisites

- [Nodejs](https://nodejs.org/en/) and [npm](https://www.npmjs.com)
- [FoxitPDFSDK for Web](https://developers.foxit.com/products/web/)

### Getting started

First clone the repository to any location:

```bash
git clone https://github.com/foxitsoftware/FoxitPDFSDKForWeb-Angular-Example.git
```

Enter `./FoxitPDFSDKForWeb-Angular-Example` and execute:

```bash
cd ./FoxitPDFSDKForWeb-Angular-Example
npm i
```

This step will download all dependencies into `node_modules` folder.

Besides, to correctly reference your fonts lib, duplicate the `external` folder inside SDK to `src/assets`.

### Runnning the example

On the shell, execute the following command to start your application:

```sh
npm start
```

Now you are ready to launch the app. Open your browser, navigate to `<http://localhost:4200>` to load your example.

## Integrate FoxitPDFSDK for Web into existing Angular project

This integration assumes you have `@Angular/cli` app installed.

### Prerequisites

- [Nodejs](https://nodejs.org/en/) and [npm](https://www.npmjs.com)
- [@angular/cli](https://www.npmjs.com/package/@angular/cli)
- [FoxitPDFSDKforWeb](https://developers.foxit.com/products/web/)

### Basic setup

1. Generating and serving an Angular project via a development server

  ```bash
    ng new my-angular-app
    cd my-angular-app
  ```

Let's call the root folder of your exiting project as `AngularJS` and FoxitPDFSDK for Web as SDK.

1. Install the lattest version of `@foxitsoftware/foxit-pdf-sdk-for-web-library`.
  
  ```bash
    npm i -S @foxitsoftware/foxit-pdf-sdk-for-web-library
  ```

_Inside AngularJS, implement the following:_

1. In the `angular.json`, update `architect/build` options of `assets`,`styles` and `extractCss`, and `architect/lint` section.

   ```json
   {
     ...
     "build": {
       "assets": [
         ...,
         {
            "glob": "**/*",
            "input": "node_modules/@foxitsoftware/foxit-pdf-sdk-for-web-library/lib",
            "output": "/foxit-lib",
            "ignore": ["PDFViewCtrl.js", "PDFViewCtrl.{vendor,polyfills}.js", "UIExtension.*"]
         }
       ],
      "styles": [
          "src/styles.css"
        ],
        "extractCss": true,
        ...
     }
   }
   ```

> **NOTE:**
> https://angular.io/cli/build
>
>--extract-css
>
>Deprecated: Deprecated since version 11.0. No longer required to disable CSS extraction for HMR. Extract CSS from global styles into '.css' files instead of '.js'.

### Creating components

1. In AngularJS, run

   ```sh
   ng generate component PDFViewer
   ```

   This step will create `pdfviewer`folder and related component files under `AngularJS/src/app`. Now, you need to implement the followings in `AngularJS/src/app/`.

1. Place the `license-key.js` into `src/app/pdfviewer/`. You can find the license information at `SDK/examples/`.
1. Update `src/app/pdfviewer/pdfviewer.component.ts`. For configuration details, refer to the counterpart file inside SDK.
1. Update `src/app/app.component.html` to pass a DOM element for placing web viewer.

   ```html
   <div>
     <app-foxitpdfviewer
       #pdfviewer
       class="foxit-pdf-viewer-container"
     ></app-foxitpdfviewer>
   </div>
   ```

1. Update `pdfviewer.component.css` to make it look as what you preferred.

   ```css
   @import url('@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/UIExtension.css');
   ```

1. Update `app.component.css` to make it look as what you preferred

  ```css
  .foxit-pdf-viewer-container {
    display: block;
    margin: 0 auto;
    width: 100vw;
    height: 100vh;
  }
  .foxit-pdf-viewer-app {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  ```

### Reference fonts lib

If some text in a PDF document requires a specified font to be rendered correctly, you need to specify a font loading path during initialization. In this example, you can refer to the `fontPath` configuration in `src/app/pdfviewer/pdfviewer.component.ts`. What we need to do is to copy the `external` folder in the SDK to the `src/assets` folder so that the special font can be rendered normally.

### Referencing Addons

If you are integrating FoxitPDFSDK for Web into your existing Angular project, you should read this section before continue. You may want to check out [Addons](../addons/introduction.md) for detailed introductions. 

Here we introduce three ways to reference SDK addons for Anguar project, you may choose one of them based on your needs. This [Comparison](#Addons reference methods comparison) will help you to better understand the difference of the three ways and make a choice.

#### 1. Reference fragmented addons

This method was used by default in past versions before version 7.2. You should open `pdfviewer.component.ts`, write the addons under ngOnInit() as shown below:

```js
ngOnInit(){
this.pdfui = new UIExtension.PDFUI({
    addons: [
        the_path_to_foxit_lib + '/uix-addons/file-property/addon.info.json',
        the_path_to_foxit_lib + '/uix-addons/full-screen/addon.info.json',
        // .etc
    ],
    // other options
});
}
```

Where `the_path_to_foxit_lib` is the SDK lib folder，the path depends on the assets configuration of angular.json. For details, check out [Basic Setup](#basic-setup).

#### 2. Import modular addons

This method was used by default in the out-of-the-box example for Anguar.

1. Install

   ```sh
   npm install -D gulp @foxitsoftware/gulp-merge-addon
   ```

2. Refer to `gulpfile.js` for merging addons with gulp.task.

3. Update the scripts section in package.json:

   ```json
   "scripts": {
       "merge-addons": "gulp merge-addons",
       "start": "npm run merge-addons && ng serve",
       "build": "npm run merge-addons && ng build",
       "test": "npm run merge-addons && ng test",
       "lint": "set NODE_OPTIONS=--max-old-space-size=8192 && ng lint",
       "e2e": "ng e2e"
   },
   ```

   This way will automatically merge addons once `npm start` is successfully executed.

4. The import method can be seen at `src/app/pdfviewer/pdfviewer.component.ts`.

#### 3. Reference allInOne.js

The allInOne.js already combines all addons, that locates in `node_modules/@foxitsoftware/foxit-pdf-sdk-for-web-library/uix-addons/`. To refenece this file, open `pdfviewer.component.ts`, and update the code as follows:

```js
// ...
import * as UIExtension from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/UIExtension.full.js';
import * as Addons from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/allInOne.js';
// ...
```

Under the ngOnInit(), pass Addons to PDFUI:

```js
this.pdfui = new UIExtension.PDFUI({
    addons: Addons,
    // other options
});
```

#### Comparions of addons reference methods 

|Referene method|Configuration|HTTP Requests|Modifiable (e.g Localization resoures, and addon.info.json)|
|--|--|--|--|
|Fragmentized|No|n+|Yes|
|Modularized|Configure gulp|0|Yes,but should re-merge the addons after modification |
|allInOne.js|No|1|No|

Note: You can rebuild allInOne.js by using our [Addons merge tools](http://webviewer-demo.foxitsoftware.com/docs/developer-guide/ui-extension/addons/introduction.html#merge-addons)

### Running your Application

On the Shell, run

```sh
npm start
```

Awsome, all are made ready. In your browser, go to <http://localhost:4200> to load your application.

### Notice

Angular 9.0.0 and the later version modified the default tsconfig.json configuration: `strict=true`, you should add the following parameters in `tsconfig.json` to make the example run correctly:

```json
"compilerOptions": {
  "allowJs": true,
  "allowSyntheticDefaultImports": true,
  "noImplicitAny": false,
}
```

For more information, check out: <https://github.com/angular/angular/pull/34798>
and the changelog: <https://github.com/angular/angular/blob/master/CHANGELOG.md#user-content-900-2020-02-06>
