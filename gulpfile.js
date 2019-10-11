'use strict';

const gulp             = require('gulp');

const postcss          = require('gulp-postcss');
const autoprefixer     = require("autoprefixer");
const csso             = require("gulp-csso");
const minify           = require('gulp-minify');
const browserReporter  = require('postcss-browser-reporter');

const mqpacker         = require("css-mqpacker");
const precss           = require("precss");
const sourcemaps       = require('gulp-sourcemaps');

const nunjucksRender   = require('gulp-nunjucks-render');

const rename           = require('gulp-rename');

const plumber          = require('gulp-plumber');
const server           = require('browser-sync').create();
const ftp              = require('gulp-ftp');
const replace          = require('gulp-replace');
const filter           = require('gulp-filter');

const del              = require('del');
const fs               = require("fs");

const newer            = require('gulp-newer');

const concat           = require('gulp-concat');
const gulpif           = require('gulp-if');
const remember         = require('gulp-remember');

const debug            = require('gulp-debug');
const touch            = require('gulp-touch');

const htmlmin          = require('gulp-html-minifier2');
const w3cjs            = require('gulp-w3cjs');

const gutil            = require('gulp-util');
const data             = require('gulp-data');
const svgStore         = require('gulp-svgstore');
const cheerio          = require('cheerio');
const svgmin           = require('gulp-svgmin');
const through2         = require('through2');
const consolidate      = require('gulp-consolidate');

let config             = null;

const site             = 'СуперФонарик';
const domain           = 'sf.wndrbase.com';

try {

	config           = require('./config.json');

	config.ftp.remotePath += domain;


}catch(e){

	console.log("config the file doesn't exists");

}

gulp.task('html', function() {

	const f = filter('**/*.html', {restore: true});

	return gulp.src(['src/**/*.html','!src/_include/**/*.html','!src/template/*.html'], {since: gulp.lastRun('html')})
		.pipe(plumber())
		.pipe(debug({title: 'html:'}))
		.pipe(nunjucksRender({
			data: {
				url: 'http://' + domain
			},
			path: 'src/'
		}))
		.pipe(w3cjs({
			callback: function (error, res) {
				console.log(error || res);
				if (res && res.messages.length > 0 ) {
					throw {error: 'html errors have been found', results: res};
				};
				done();
			}
		}))
//		.pipe(w3cjs.reporter())
		.pipe(gulp.dest('build'))

});

gulp.task('html-touch', function() {
	return gulp.src(['src/**/*.html','!src/_include/**/*.html','!src/template/*.html'])
		.pipe(touch());

});

gulp.task('css', function () {

	return gulp.src('src/css/style.css')
			.pipe(plumber())
			.pipe(sourcemaps.init())
			.pipe(postcss([
				precss(),
				mqpacker(),
				browserReporter()
			]))
			.pipe(sourcemaps.write())
			.pipe(rename('styles.css'))
			.pipe(gulp.dest('build/css'))
			.pipe(postcss([
				autoprefixer({
					browsers: 'Android >= 4.4'
				})
			]))
			.pipe(csso())
			.pipe(rename({suffix: ".min"}))
			.pipe(gulp.dest('src/css'))
			.pipe(gulp.dest('build/css'))

});

gulp.task('js', function() {

	return gulp.src([

		'src/js/min/*.js',

		'!src/js/min/swiper.min.js',
		'!src/js/min/inputmask.min.js',

		'src/js/js.js',
		'src/js/*.js',

		'!src/js/scripts.min.js'

	], {since: gulp.lastRun('js')})

		.pipe(debug({title: 'js'}))

		.pipe(sourcemaps.init())

		.pipe(remember('js'))

		.pipe(concat('scripts.js'))

		.pipe(sourcemaps.write())

// prod

/*		.pipe(minify({
			preserveComments: "some",
			ext : {
				min:'.min.js'
			}
		}))

		.pipe(gulp.dest('build/js'))

		.pipe(gulpif(
			function(file){
				return (/min$/.test(file.stem));
			},
			gulp.dest('src/js')
		));*/


// dev, off minify
		.pipe(gulp.dest('build/js'))
		.pipe(rename({suffix: ".min"}))
		.pipe(gulp.dest('build/js'))
		.pipe(gulp.dest('src/js'))


});

gulp.task('serve', function() {

	server.init({
		server: 'build',
		files: [
			{
				match: ['build/**/*.*', '!build/**/*.min.{css,js}'],
				fn: function (event, file) {
					this.reload()
				}
			}
		]
	});

});

gulp.task('sprite', function() {

	return gulp.src('src/images/*.svg')
		.pipe(plumber())
		.pipe(svgmin(function (file) {
			return {
				js2svg: {
					pretty: true
				},
				plugins: [
					{removeDesc: true},
					{cleanupIDs: {
						prefix: file.stem + '-',
						minify: true
					}},
					{mergePaths: false},
					{removeViewBox: false}
				]
			}
		}))
		.pipe(svgStore({inlineSvg: false}))
		.pipe(through2.obj(function (file, encoding, cb) {
			var $ = cheerio.load(file.contents.toString(), {xmlMode: true});
			let data = $('svg > symbol').map(function () {
				let symbol = $(this),
					name = symbol.attr('id'),
					viewBox = symbol.attr('viewBox');
				if (!viewBox) {
					throw new gutil.PluginError('svgSprite', 'File ' + name + '.svg not hav viewBox attribute');
					return {
						name: name,
						width: 0,
						height: 0,
						fill: 'initial',
						stroke: 'initial'
					};
				}
				let size = viewBox.split(' ').splice(2),
					fill = symbol.find('[fill]:not([fill="currentColor"])').attr('fill'),
					stroke = symbol.find('[stroke]').attr('stroke');
				return {
					name: name,
					width: size[0],
					height: size[1],
					fill: fill || 'initial',
					stroke: stroke || 'initial'
				};
			}).get();
			this.push(file);
			console.log(data)
			gulp.src('src/css/sprite.txt')
				.pipe(consolidate('lodash', {icons: data}))
				.pipe(rename('sprite.css'))
				.pipe(gulp.dest('src/css'));
			cb();
		}))
		.pipe(rename({basename: 'sprite'}))
		.pipe(svgmin({
			js2svg: {
				pretty: false
			},
			plugins: [
				{removeDesc: true},
				{cleanupIDs: false},
				{mergePaths: false},
				{removeViewBox: false}
			]
		}))
		.pipe(gulp.dest('build/images'));

});

gulp.task('clear', function() {

	return del('build');

});

gulp.task('copy-js', function() {

// big scripts
	return gulp.src([
		'src/js/min/swiper.min.js',
		'src/js/min/inputmask.min.js'
		])
		.pipe(gulp.dest('build/js'));

});

gulp.task('copy', function() {

	return gulp.src(['src/**/*.*', '!src/**/*.{css,html,js}'])
			.pipe(debug({title: 'copy:'}))
			.pipe(newer('build'))
			.pipe(debug({title: 'copy:newer'}))
			.pipe(gulp.dest('build'))

});

gulp.task('ftp', function () {

	if(!config) {

		return true;

	}

	const f = filter('**/*.html', {restore: true});
	const cssInline = fs.readFileSync('build/css/styles.min.css', "utf8");

	return gulp.src('build/**/*.{css,html,js,svg,png,jpg,json}', {since: gulp.lastRun('ftp')})
		.pipe(debug({title: 'ftp:'}))
		.pipe(f)
//		.pipe(replace('<link href="/css/styles.css" rel="stylesheet">', '<style>' + cssInline + '</style>'))
		.pipe(replace('sprite.svg', 'sprite.svg?' + Date.now()))
		.pipe(replace('css/styles.css', 'css/styles.min.css?' + Date.now()))
		.pipe(replace('js/scripts.js', 'js/scripts.min.js?' + Date.now()))
		/*.pipe(htmlmin({
			minifyJS: true,
			collapseWhitespace: true,
			processScripts: ['application/ld+json']
		}))*/
		.pipe(f.restore)
		.pipe(ftp(config.ftp));

});

gulp.task('watch', function() {
	gulp.watch(['src/js/*.*','!src/js/scripts.min.js'], gulp.series('js'));
	gulp.watch(['src/css/*.*','!src/css/styles.min.css'], gulp.series('css'));
	gulp.watch(['src/**/*.html','!src/_include/**/*.html','!src/template/*.html'], gulp.series('html'));
	gulp.watch(['src/_include/**/*.html','src/template/*.html'], gulp.series('html-touch'));
	gulp.watch(['src/**/*.*', '!src/**/*.{css,html,js}'], gulp.series('copy'));
	gulp.watch('build/**/*.*', gulp.series('ftp'));
	gulp.watch('src/images/*.svg', gulp.series('sprite'));
});

gulp.task('default', gulp.series(
	'clear',
	'copy-js',
	gulp.parallel('css','js','sprite'),
	'html',
	'copy',
	gulp.parallel('ftp','watch','serve')
	));