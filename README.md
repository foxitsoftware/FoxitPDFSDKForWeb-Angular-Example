# FoxitPDFSDK for Web Example - Angular.js

This guide shows two examples. One introduces how to quickly run the boilerplate sample for Angular.js inside FoxitPDFSDK for Web, and the other presents a way to integrate FoxitPDFSDK for Web into an exiting Angular/cli app.

## Quickly run the built-in example for Angular.js

FoxitPDFSDK for Web provides a boilerplate project for [@angular/cli](https://www.npmjs.com/package/@angular/cli) app. This example can be found at `../integrations/` inside FoxitPDFSDK for Web package.

### Prerequisites

- [Nodejs](https://nodejs.org/en/) and [npm](https://www.npmjs.com)
- [FoxitPDFSDK for Web](https://developers.foxitsoftware.com/pdf-sdk/Web)

### Getting started

Enter `../integratons/angular.js/` inside FoxitPDFSDK for Web, and execute:

  ```sh
  npm i
  ```
This step will create a `node_modules` folder and download all dependencies, copy the `lib` folder from the root folder to `../integrations/angular/src*, and auto rename it as `foxit-lib`.

### Runnning the example

On the shell, execute the following command to start your application:

  ```sh
  npm start
  ```

Now you are ready to launch the app. Open your browser, navigate to `<http://localhost:4200>` to load your example.

## Integrate FoxitPDFSDK for Web into existing Angular.js project
This integration assumes you have `@Angular/cli` app installed.

### Prerequisites

- [Nodejs](https://nodejs.org/en/) and [npm](https://www.npmjs.com)
- [@angular/cli](https://www.npmjs.com/package/@angular/cli)
- [FoxitPDFSDKforWeb](https://developers.foxitsoftware.com/pdf-sdk/Web)

### Basic Setup

Let's call the root folder of your exiting project as AngularJS and FoxitPDFSDK for Web as SDK.

1. Find the `lib` folder inside SDK, duplicate it to `AngularJS/src/` and rename it as `foxit-lib`. Besides， to correctly referene your fonts lib, you also need to duplicate the `external` folder inside SDK to `AngularJS/src/foxit-lib/assets`. 

_Inside AngularJS, implement the following:_

2. Update `assets` and `lint` in the `angular.json`.

   ```json
   {
     ...
     "build": {
       "assets": [
         ...,
         {
           "glob": "**/*",
           "input": "src/foxit-lib",
           "output": "/foxit-lib",
           "ignore": ["PDFViewCtrl.*", "UIExtension.*"]
         }
       ]
     }
   }
   "lint": {
         "builder":...,
         "options": {
           "tsConfig": [
             //existing configuration can remain as they are
           ],
           "exclude": [
             // other dependencies you may have
             "src/foxit-lib/**/*.*"
           ]
         }
       },
   ```

3. Update `tsconfig.app.json` to exclude the `"src/foxit-lib/**/*.*"`.

   ```json
   {
     ...,
     "exclude": [
       ...
       ...,
       ...,
       "src/foxit-lib/**/*.*"
     ]
   }

   ```

4. Set `extractCss: true` and then add `UIExtension.css` to `"style"` and make sure it is loaded before your custom CSS assets

  ```json
  {
    ...
    "build": {
      "builder": "@angular-devkit/build-angular:browser",
      "options": {
        ...
        "styles": [
          "src/foxit-lib/UIExtension.css",
          "src/styles.css"
        ],
        "extractCss": true
      }
    }
  }
  ```

### Creating Components

1. In AngularJS, run

   ```sh
   ng generate component PDFViewer
   ```
This step will create `pdfviewer`folder and related component files under `AngularJS/src/app`. Now, you need to implement the followings in `AngularJS/src/app/`. 

1. Place the `license-key.js` into `../pdfviewer/`. You can find the license information at `SDK/examples/`.
2. Update `../pdfviewer/component.ts`. For configuration details, refer to the counterpart file inside SDK. 
3. Update `../component.html` to pass a DOM element for placing web viewer.

   ```html
   <div>
     <app-foxitpdfviewer
       #pdfviewer
       class="foxit-pdf-viewer-container"
     ></app-foxitpdfviewer>
   </div>
   ```

4. Update `component.css` to make it look as what you preferred.

   ```css
   .foxit-pdf-viewer-container {
     display: block;
     margin: 0 auto;
     width: 1280px;
     height: 1024px;
   }
   ```

### Running your Application

On the Shell, run

   ```sh
   npm start
   ```

Awsome, all are made ready. In your browser, go to <http://localhost:4200> to load your application.
