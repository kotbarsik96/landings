// ПОСТОЯННЫЕ ФАЙЛА GULP //
const { src, dest, watch, series, parallel } = require('gulp');

// ПОСТОЯННЫЕ названий папок: приложение и результат //
const appFolder = 'src';
const distFolder = 'dist';

//* ПОСТОЯННЫЕ ПЛАГИНОВ //*
const browsersync = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'),
    sass = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    // группирует media-запросы в конце файла (оптимизация: +)
    group_media = require('gulp-group-css-media-queries');

// ОСНОВНЫЕ ПУТИ: 
// build - папка dist; 
// src - папка src; 
// watch - папка src с теми файлами, изменения которых прослушиваются //
let path = {
    build: {
        html: `${distFolder}/`,
        css: `${distFolder}/css/`,
        js: `${distFolder}/js/`,
        img: `${distFolder}/img/`,
        fonts: `${distFolder}/fonts/`
    },
    src: {
        html: `${appFolder}/*.html`,
        htmlNested: `${appFolder}/**/*.html`,
        scss: `${appFolder}/scss/styles.scss`,
        js: `${appFolder}/js/scripts.js`,
        img: `${appFolder}/img/**/*.{jpg,png,svg,ico,svg,webp}`,
        fonts: `${appFolder}/fonts/**/*.{ttf,woff,woff2,eot,svg}`
    },
    watch: {
        html: `${appFolder}/**/*.html`,
        scss: `${appFolder}/scss/*.scss`,
        js: `${appFolder}/js/*.js`,
        img: `${appFolder}/img/**/*.{jpg,png,svg,ico,svg,webp}`,
        fonts: `${appFolder}/fonts/**/*.{ttf,woff,woff2,eot,svg}`
    },
    clean: [`!${distFolder}/.git/`, `${distFolder}/`]
}

// ИНИЦИАЛИЗАЦИЯ GULP И ПЛАГИНОВ //

function browserSync() {
    browsersync.init({
        server: {
            baseDir: `dist/`
        },
        port: 3000,
        notify: false
    })
}

// function clean() {
// return del(path.clean)
// }

function html() {
    src(path.src.htmlNested)
        .pipe(fileinclude({
            prefix: '@@'
        }))
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream());

    return src(path.src.html)
        .pipe(fileinclude({
            prefix: '@@'
        }))
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream());
}

function styles() {
    src(path.src.scss)
        .pipe(sass({
            // compressed - сжатый
            outputStyle: 'expanded'
        }))
        .pipe(autoprefixer({
            overrideBrowserslist: ["last 5 versions"],
            cascade: true
        }))
        .pipe(group_media())
        .pipe(dest(path.build.css));

    return src(path.src.scss)
        .pipe(browsersync.stream());
}

function javascripts() {
    return src(path.src.js)
        .pipe(fileinclude({
            prefix: '@@'
        }))
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream());
}

function images() {
    src(path.src.img)
        .pipe(dest(path.build.img));

    return src(path.src.img)
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream());
}

function fonts() {
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts))
        .pipe(browsersync.stream());
}

function watching() {
    watch([path.watch.html], html);
    watch([path.watch.scss], styles);
    watch([path.watch.js], javascripts);
    watch([path.watch.img], images);
    watch([path.watch.fonts], fonts);
}

const build = series(parallel(html, styles, javascripts, images, fonts));
const start = parallel(build, watching, browserSync);


exports.fonts = fonts;
exports.images = images;
exports.styles = styles;
exports.html = html;
exports.javascripts = javascripts;

exports.build = build;
exports.default = start;