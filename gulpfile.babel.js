import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";
import image from "gulp-image";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import miniCSS from "gulp-csso";
import bro from "gulp-bro";
import babelify from "babelify";
import ghPages from "gulp-gh-pages";

sass.compiler = require("node-sass");

const routes = {
  pug: {
    watch: "assets/**/*.pug",
    src: "assets/*.pug",
    dest: "static",
  },
  img: {
    src: "assets/img/*",
    dest: "static/img",
  },
  css: {
    watch: "assets/scss/**/*.scss",
    src: "assets/scss/styles.scss",
    dest: "static/css",
  },
  js: {
    watch: "assets/js/**/*.js",
    src: "assets/js/main.js",
    dest: "static/js",
  },
};

const pug = () =>
  gulp
    .src(routes.pug.src, { allowEmpty: true })
    .pipe(gpug())
    .pipe(gulp.dest(routes.pug.dest));

const clean = () => del(["static/", ".publish"]);

const webserver = () => gulp.src("static").pipe(ws({ livereload: true }));

const img = () =>
  gulp.src(routes.img.src, {allowEmpty: true}).pipe(image()).pipe(gulp.dest(routes.img.dest));

const styles = () =>
  gulp
    .src(routes.css.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
      })
    )
    .pipe(miniCSS())
    .pipe(gulp.dest(routes.css.dest));

const js = () =>
  gulp
    .src(routes.js.src)
    .pipe(
      bro({
        transform: [
          babelify.configure({ presets: ["@babel/preset-env", "@babel/preset-react"] }),
          ["uglifyify", { global: true }],
        ],
      })
    )
    .pipe(gulp.dest(routes.js.dest));

const gh = () => gulp.src("static/**/*").pipe(ghPages());

const watch = () => {
  gulp.watch(routes.pug.watch, pug);
  gulp.watch(routes.img.src, img);
  gulp.watch(routes.css.watch, styles);
  gulp.watch(routes.js.watch, js);
};

const prepare = gulp.series([clean, img]);

const assets = gulp.series([pug, styles, js]);

const live = gulp.parallel([webserver, watch]);

export const build = gulp.series([prepare, assets]);
export const dev = gulp.series([build, live]);
export const deploy = gulp.series([build, gh, clean]);
