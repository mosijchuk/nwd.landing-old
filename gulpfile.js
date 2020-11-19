let preprocessor = "scss";
let fileswatch = "html,htm,txt,json,md,woff2";
// let imageswatch = "jpg,jpeg,png,webp,svg";

const { src, dest, parallel, series, watch, lastRun } = require("gulp");
const sass = require("gulp-sass");
const scss = require("gulp-sass");
const less = require("gulp-less");
const styl = require("gulp-stylus");
const cleancss = require("gulp-clean-css");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const uglify = require("gulp-uglify-es").default;
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const rsync = require("gulp-rsync");
const del = require("del");

// Local Server
const browsersync = () => {
  browserSync.init({
    server: { baseDir: "app" },
    notify: false,
    // online: false, // Work offline without internet connection
  });
};

// const pages = [
//   {
//     pageName: "main",
//     scripts: [
//       "app/libs/jquery/jquery-3.4.1.min.js",
//       "app/libs/wow/wow.min.js",
//       "app/libs/scrollWorks/e054e.js",
//       "app/libs/scrollWorks/a9b30.js",
//       "app/js/index.js"
//     ]
//   },
//   {
//     pageName: "success-page",
//     scripts: [
//       "app/libs/jquery/jquery-3.4.1.min.js",
//       "app/libs/wow/wow.min.js",
//       "app/libs/lottie/lottie.min.js",
//       "app/js/index.js",
//       "app/js/data-success.js"
//     ]
//   },
//   {
//     pageName: "project",
//     scripts: [
//       "app/libs/jquery/jquery-3.4.1.min.js",
//       "app/libs/wow/wow.min.js",
//       "app/js/index.js"
//     ]
//   }
// ];

// CSS
let genStyles = (pageName) => {
  return src("app/" + preprocessor + `/${pageName}/${pageName}.*`)
    .pipe(eval(preprocessor)())
    .pipe(concat(`${pageName}.min.css`))
    .pipe(
      autoprefixer({ overrideBrowserslist: ["last 10 versions"], grid: true })
    )
    .pipe(cleancss({ level: { 1: { specialComments: 0 } } }))
    .pipe(dest("app/css"))
    .pipe(browserSync.stream());
};

let mainStyles = () => {
  return genStyles("main");
};

let successStyles = () => {
  return genStyles("success-page");
};

let projectStyles = () => {
  return genStyles("project");
};

// JS
const scripts = () => {
  return src([
    "app/libs/jquery/jquery-3.4.1.min.js",
    "app/libs/gsap/gsap.min.js",
    "app/libs/scrollMagic/ScrollMagic.js",
    "app/libs/scrollMagic/plugins/jquery.ScrollMagic.js",
    "app/libs/scrollMagic/plugins/animation.gsap.js",
    "app/libs/wow/wow.min.js",
    "app/libs/fancybox/jquery.fancybox.min.js",
    "app/js/index.js",
  ])
    .pipe(concat(`main.min.js`))
    .pipe(uglify()) // Minify JS (opt.)
    .pipe(dest("app/js"))
    .pipe(browserSync.stream());
};

// Images optimization
// function images() {
//   return src("app/images/src/**/*")
//     .pipe(newer("app/images/dest"))
//     .pipe(imagemin())
//     .pipe(dest("app/images/dest"));
// }

// const cleanimg = () => {
//   return del("app/images/dest/**/*", { force: true });
// };

// Deploy
// const deploy = () => {
//   return src("app/").pipe(
//     rsync({
//       root: "app/",
//       hostname: "username@yousite.com",
//       destination: "yousite/public_html/",
//       // include: ['*.htaccess'], // Included files
//       exclude: ["**/Thumbs.db", "**/*.DS_Store"], // Excluded files
//       recursive: true,
//       archive: true,
//       silent: false,
//       compress: true
//     })
//   );
// };

// Watching

const startwatch = () => {
  watch("app/" + preprocessor + "/**/*", mainStyles);
  watch("app/" + preprocessor + "/**/*", successStyles);
  watch("app/" + preprocessor + "/**/*", projectStyles);
  watch(["app/js/*.js", "!app/js/*.min.js"], scripts);
  watch(["app/js/*.js", "!app/js/*.min.js"], scripts);
  watch(["app/js/*.js", "!app/js/*.min.js"], scripts);
  // watch(["app/**/*.{" + imageswatch + "}"], images);
  watch(["app/**/*.{" + fileswatch + "}"]).on("change", browserSync.reload);
};

exports.browsersync = browsersync;
exports.assets = series(mainStyles, successStyles, projectStyles, scripts);
exports.mainStyles = mainStyles;
exports.successStyles = successStyles;
exports.projectStyles = projectStyles;
exports.scripts = scripts;
// exports.images = images;
// exports.cleanimg = cleanimg;
// exports.deploy = deploy;
exports.default = parallel(
  mainStyles,
  successStyles,
  projectStyles,
  scripts,
  browsersync,
  startwatch
);
