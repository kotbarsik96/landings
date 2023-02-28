// ПОСТОЯННЫЕ ФАЙЛА GULP //
const { src, dest, watch, series, parallel } = require('gulp');

// ПОСТОЯННЫЕ названий папок: приложение и результат //
const appFolder = 'src';
const distFolder = '../dist/';

//* ПОСТОЯННЫЕ ПЛАГИНОВ //*
const browsersync = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'),
    sass = require('gulp-sass')(require('sass')),
    // группирует media-запросы в конце файла (оптимизация: +)
    group_media = require('gulp-group-css-media-queries'),
    uglify_es = require('gulp-uglify-es').default,
    del = require('del'),
    clean_css = require('gulp-clean-css'),
    htmlmin = require('gulp-htmlmin');

// ОСНОВНЫЕ ПУТИ: 
// build - папка dist; 
// src - папка src; 
// watch - папка src с теми файлами, изменения которых прослушиваются //
let path = {
    build: {
        html: `${distFolder}/`,
        jobsStyles: `${distFolder}/jobs/`,
        css: `${distFolder}/css/`,
        js: `${distFolder}/js/`,
        img: `${distFolder}/img/`,
        fonts: `${distFolder}/fonts/`,
        json: `${distFolder}/json`,
    },
    src: {
        html: [`${appFolder}/*.html`, `${appFolder}/**/*.html`],
        jobsStyles: `${appFolder}/jobs/**/*.scss`,
        scss: [`${appFolder}/scss/*.scss`, `!${appFolder}/scss/import-only/`],
        js: `${appFolder}/js/*.js`,
        img: `${appFolder}/img/**/*.{jpg,png,svg,ico,svg,webp,gif,mp4}`,
        fonts: `${appFolder}/fonts/**/*.{ttf,woff,woff2,eot,svg}`,
        json: `${appFolder}/json/*.json`
    },
    watch: {
        html: `${appFolder}/**/*.html`,
        jobsStyles: `${appFolder}/jobs/**/*.scss`,
        devHTML: `${appFolder}/dev/**/*.html`,
        scss: `${appFolder}/scss/*.scss`,
        js: `${appFolder}/js/*.js`,
        img: `${appFolder}/img/**/*.{jpg,png,svg,ico,svg,webp,gif,mp4}`,
        fonts: `${appFolder}/fonts/**/*.{ttf,woff,woff2,eot,svg}`,
        json: `${appFolder}/json/*.json`
    },
    clean: [`${distFolder}/**`, `!${distFolder}/.git/`]
}

// ИНИЦИАЛИЗАЦИЯ GULP И ПЛАГИНОВ //

function browserSync() {
    browsersync.init({
        server: {
            baseDir: "../dist/"
        },
        port: 3000,
        notify: false
    })
}

function clean() {
    return del(path.clean, { force: true });
}

function html() {

    return src(path.src.html)
        .pipe(fileinclude({
            prefix: '@@'
        }))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream());
}

function styles() {
    const stylesPaths = ["jobsStyles"];
    for (let pathName of stylesPaths) {
        src(path.src[pathName])
            .pipe(sass({ outputStyle: "expanded" }))
            .pipe(group_media())
            .pipe(clean_css())
            .pipe(dest(path.build[pathName]))
    }

    src(path.src.scss)
        .pipe(sass({
            // compressed - сжатый
            outputStyle: 'expanded'
        }))
        .pipe(group_media())
        .pipe(clean_css())
        .pipe(dest(path.build.css));

    return src(path.src.scss)
        .pipe(browsersync.stream());
}

function javascripts() {
    return src(path.src.js)
        .pipe(fileinclude({
            prefix: '@@'
        }))
        .pipe(uglify_es())
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

function json() {
    return src(path.src.json)
        .pipe(dest(path.build.json));
}

function watching() {
    watch([path.watch.html], html);
    watch([path.watch.jobsStyles], styles);
    watch([path.watch.devHTML], html);
    watch([path.watch.scss], styles);
    watch([path.watch.js], javascripts);
    watch([path.watch.img], images);
    watch([path.watch.fonts], fonts);
    watch([path.watch.json], json);
}

const build = series(clean, parallel(html, styles, javascripts, images, fonts, json));
const start = parallel(build, watching, browserSync);


exports.json = json;
exports.fonts = fonts;
exports.images = images;
exports.styles = styles;
exports.html = html;
exports.javascripts = javascripts;

exports.build = build;
exports.default = start;