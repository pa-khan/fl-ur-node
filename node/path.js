class PATH {
	static SRC     = 'src/';
	static DIST    = 'dist/';
	static TEMP    = this.SRC + 'template/';
	static UPLOAD  = this.SRC + 'uploads/';
	static BLOCKS  = this.TEMP + 'blocks/';
	static COMPS   = this.TEMP + 'components/';
	static CSS     = this.TEMP + 'css/';
	static SASS    = this.TEMP + 'sass/';
	static PUG     = this.TEMP + 'pug/';
	static JS      = this.TEMP + 'js/';
	static IMGS    = this.TEMP + 'imgs/';
	static LIBS    = this.TEMP + 'libs/';
	static FONTS   = this.TEMP + 'fonts/';

	static TEMPS   = this.PUG + 'templates/';
	static PAGES   = this.PUG + 'pages/';
}

module.exports = PATH;