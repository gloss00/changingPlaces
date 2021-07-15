const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const pump = require('pump');
const nodemon = require('gulp-nodemon');

const gulpConfig = {
    paths: {
        scss: `${__dirname}/dev/scss/**/*.scss`,
        scssDest: `${__dirname}/app/assets/css`,
        // js: [`${__dirname}/dev/scripts/**/*.js`, `${__dirname}/node_modules/govuk-frontend/govuk/all.js`],
        // jsDest: `${__dirname}/app/assets/scripts`,
        nunjucks: `${__dirname}/app/views/**/*.njk`,
        key: `${__dirname}/dev/certs/server.key`,
        cert: `${__dirname}/dev/certs/server.crt`
    }
};

// minifies and compiles sass files from development to app (main.scss imports sass files from govuk node_modules)
function sassTask() {
    try {
        return gulp.src(gulpConfig.paths.scss)
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(gulp.dest(gulpConfig.paths.scssDest))
            .pipe(browserSync.reload({
                stream: true
            }));
    }
    catch(error) {
        console.log(error);
    }
}

// function uglyJsTask(cb) {
//     pump([
//         gulp.src(gulpConfig.paths.js),
//         uglify(),
//         gulp.dest(gulpConfig.paths.jsDest)
//     ],
//     cb)
//         .pipe(browserSync.reload({
//             stream: true
//         }));
// }

// refreshes on njk file change
function nunjucksTask() {
    browserSync.reload();
}

function browserSyncTask() {
    browserSync.init({
        proxy: 'https://localhost:9050',
        port: 9051,
        reloadDelay: 1000,
        ghostMode: {
            clicks: false,
            forms: false,
            scroll: false
        },
        https: {
            key: gulpConfig.paths.key,
            cert: gulpConfig.paths.cert
        },
        open: false
    });
}

function serverTask() {
    nodemon({
        script: 'index.js',
        ext: 'js,json,njk'
    }).on('quit', function() {
        process.exit(0);
    });
}

// watch all scss and js files, run required tasks, refresh browser
function watch() {
    gulp.watch(gulpConfig.paths.scss, {interval: 1000, mode: 'poll'}, sassTask);
    // gulp.watch(gulpConfig.paths.js, {interval: 1000, mode: 'poll'}, uglyJsTask);
    gulp.watch(gulpConfig.paths.nunjucks, {interval: 1000, mode: 'poll'}, nunjucksTask);
}

gulp.task('default', gulp.parallel(watch, sassTask, serverTask, browserSyncTask));
