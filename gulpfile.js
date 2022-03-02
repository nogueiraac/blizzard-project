const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const GulpUglify = require("gulp-uglify");

/* Compilando o sass, adicionando autoprefixed e atualizando a página*/
function compileSass() {
  return gulp
    .src("scss/*.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(gulp.dest("css/"))
    .pipe(browserSync.stream());
}
/* Tarefa do sass*/
gulp.task("sass", compileSass);

function pluginCSS() {
  return gulp
    .src("css/lib/*.css")
    .pipe(concat("plugins.css"))
    .pipe(gulp.dest("css/"))
    .pipe(browserSync.stream());
}
gulp.task("plugincss", pluginCSS);

/* Unindo todos os arquivos javascripts em um único arquivo*/
function gulpJs() {
  return gulp
    .src("js/scripts/*.js")
    .pipe(concat("all.js"))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("js/"))
    .pipe(browserSync.stream());
}
/* Tarefa do alljs*/
gulp.task("alljs", gulpJs);

/* Unindo todos os plugins javascripts em um único arquivo*/
function pluginsJs() {
  return gulp
    .src(["js/lib/aos.min.js", "js/lib/swiper.min.js"])
    .pipe(concat("plugins.js"))
    .pipe(gulp.dest("js/"))
    .pipe(browserSync.stream());
}
/* Tarefa do pluginjs*/
gulp.task("pluginjs", pluginsJs);
/* Função do browserSync*/
function browser() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
}
/* Tarefa do browser-sync*/
gulp.task("browser-sync", browser);

/* Função do watch para alterações em scss e html*/
function watch() {
  gulp.watch("scss/*.scss", compileSass);
  gulp.watch("*.html").on("change", browserSync.reload);
  gulp.watch("/js/scripts/*.js", gulpJs);
  gulp.watch("/js/lib/*.js", pluginsJs);
  gulp.watch("/css/lib/*.css", pluginCSS);
}

/* Tarefa do watch*/
gulp.task("watch", watch);

/* Tarefa do padrão que executa o watch e o browser-sync*/
gulp.task(
  "default",
  gulp.parallel(
    "watch",
    "browser-sync",
    "alljs",
    "sass",
    "pluginjs",
    "plugincss"
  )
);
