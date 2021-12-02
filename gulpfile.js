const gulp = require("gulp");
const mergeAddon = require("@foxitsoftware/gulp-merge-addon");

const addonDirectory = './node_modules/@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/'

gulp.task("merge-addons", () => {
    return gulp
        .src([
          addonDirectory + '*/addon.info.json'
        ])
        .pipe(
            mergeAddon({
                library: "Addons",
                filename: "merged-foxit-addons.js",
                lazyInit: true,
                progress: true,
            })
        )
        .pipe(gulp.dest("src/"));
});
