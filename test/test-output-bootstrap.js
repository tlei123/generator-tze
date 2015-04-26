'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('generator-tze output test - bootstrap option', function () {
  var runGen;

  before(function (done) {
    this.timeout(10000);
    runGen = helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-testtze'))
      .withOptions({ 
        'skip-install': true,
        'skip-welcome-message': true,
        'skip-message': true,
        'skip-install-message': true
      })
      .withPrompt({
        appName: 'testTze',
        version: '0.0.0',
        author: 'Tze Lei',
        email: 'tze.lei@mrm-mccann.com',
        jqVersion: '2.1.3',
        uiOptn: 'bootstrap',
        eq3optn: true,
        servOptn: true
      })
      .on('end', done);
  });

  it('creates package.json & Gruntfile.js', function () {
    assert.file([
      'package.json',
      'Gruntfile.js'
    ]);
  });


  it('creates index.html in src', function () {
    assert.file([
      'src/index.html'
    ]);
  });

  it('creates all JavaScript files in src/js', function () {
    assert.file([
      'src/js/main.js',
      'src/js/libs/bootstrap.min.js',
      'src/js/libs/bootstrap.js',
      'src/js/libs/ie-emulation-modes-warning.js',
      'src/js/libs/ie10-viewport-bug-workaround.js',
      'src/js/libs/respond.min.js',
      'src/js/libs/modernizr.2.8.3.custom.js'
    ]);
  });

  it('creates all SASS stylesheets in src/sass', function () {
    assert.file([
      'src/sass/main.scss',
      'src/sass/modules/_all.scss',
      'src/sass/modules/_vars.scss',
      'src/sass/modules/_mixins.scss',
      'src/sass/modules/_webfonts.scss',
      'src/sass/partials/_base.scss',
      'src/sass/partials/_page.scss',
      'src/sass/partials/_masthead.scss',
      'src/sass/partials/_component1.scss',
      'src/sass/partials/_component2.scss',
      'src/sass/libs/bootstrap/_alerts.scss',
      'src/sass/libs/bootstrap/_badges.scss',
      'src/sass/libs/bootstrap/_bootstrap.scss',
      'src/sass/libs/bootstrap/_breadcrumbs.scss',
      'src/sass/libs/bootstrap/_button-groups.scss',
      'src/sass/libs/bootstrap/_buttons.scss',
      'src/sass/libs/bootstrap/_carousel.scss',
      'src/sass/libs/bootstrap/_close.scss',
      'src/sass/libs/bootstrap/_code.scss',
      'src/sass/libs/bootstrap/_component-animations.scss',
      'src/sass/libs/bootstrap/_dropdowns.scss',
      'src/sass/libs/bootstrap/_forms.scss',
      'src/sass/libs/bootstrap/_glyphicons.scss',
      'src/sass/libs/bootstrap/_grid.scss',
      'src/sass/libs/bootstrap/_input-groups.scss',
      'src/sass/libs/bootstrap/_jumbotron.scss',
      'src/sass/libs/bootstrap/_labels.scss',
      'src/sass/libs/bootstrap/_list-group.scss',
      'src/sass/libs/bootstrap/_media.scss',
      'src/sass/libs/bootstrap/_mixins.scss',
      'src/sass/libs/bootstrap/_modals.scss',
      'src/sass/libs/bootstrap/_navbar.scss',
      'src/sass/libs/bootstrap/_navs.scss',
      'src/sass/libs/bootstrap/_normalize.scss',
      'src/sass/libs/bootstrap/_pager.scss',
      'src/sass/libs/bootstrap/_pagination.scss',
      'src/sass/libs/bootstrap/_panels.scss',
      'src/sass/libs/bootstrap/_popovers.scss',
      'src/sass/libs/bootstrap/_responsive-embed.scss',
      'src/sass/libs/bootstrap/_responsive-utilities.scss',
      'src/sass/libs/bootstrap/_scaffolding.scss',
      'src/sass/libs/bootstrap/_tables.scss',
      'src/sass/libs/bootstrap/_theme.scss',
      'src/sass/libs/bootstrap/_thumbnails.scss',
      'src/sass/libs/bootstrap/_tooltip.scss',
      'src/sass/libs/bootstrap/_type.scss',
      'src/sass/libs/bootstrap/_utilities.scss',
      'src/sass/libs/bootstrap/_variables.scss',
      'src/sass/libs/bootstrap/_wells.scss',
      'src/sass/libs/bootstrap/mixins/_alerts.scss',
      'src/sass/libs/bootstrap/mixins/_background-variant.scss',
      'src/sass/libs/bootstrap/mixins/_border-radius.scss',
      'src/sass/libs/bootstrap/mixins/_buttons.scss',
      'src/sass/libs/bootstrap/mixins/_center-block.scss',
      'src/sass/libs/bootstrap/mixins/_clearfix.scss',
      'src/sass/libs/bootstrap/mixins/_forms.scss',
      'src/sass/libs/bootstrap/mixins/_gradients.scss',
      'src/sass/libs/bootstrap/mixins/_grid-framework.scss',
      'src/sass/libs/bootstrap/mixins/_grid.scss',
      'src/sass/libs/bootstrap/mixins/_hide-text.scss',
      'src/sass/libs/bootstrap/mixins/_image.scss',
      'src/sass/libs/bootstrap/mixins/_labels.scss',
      'src/sass/libs/bootstrap/mixins/_list-group.scss',
      'src/sass/libs/bootstrap/mixins/_nav-divider.scss',
      'src/sass/libs/bootstrap/mixins/_nav-vertical-align.scss',
      'src/sass/libs/bootstrap/mixins/_opacity.scss',
      'src/sass/libs/bootstrap/mixins/_pagination.scss',
      'src/sass/libs/bootstrap/mixins/_panels.scss',
      'src/sass/libs/bootstrap/mixins/_progress-bar.scss',
      'src/sass/libs/bootstrap/mixins/_reset-filter.scss',
      'src/sass/libs/bootstrap/mixins/_resize.scss',
      'src/sass/libs/bootstrap/mixins/_responsive-visibility.scss',
      'src/sass/libs/bootstrap/mixins/_size.scss',
      'src/sass/libs/bootstrap/mixins/_tab-focus.scss',
      'src/sass/libs/bootstrap/mixins/_table-row.scss',
      'src/sass/libs/bootstrap/mixins/_text-emphasis.scss',
      'src/sass/libs/bootstrap/mixins/_text-overflow.scss',
      'src/sass/libs/bootstrap/mixins/_vendor-prefixes.scss'
    ]);
  });

  it( 'creates all Bootstrap webfonts in src/fonts/bootstrap', function () {
    assert.file([
      'src/fonts/bootstrap/glyphicons-halflings-regular.eot',
      'src/fonts/bootstrap/glyphicons-halflings-regular.svg',
      'src/fonts/bootstrap/glyphicons-halflings-regular.ttf',
      'src/fonts/bootstrap/glyphicons-halflings-regular.woff',
      'src/fonts/bootstrap/glyphicons-halflings-regular.woff2'
    ]);
  } ); 

  it ( 'removes _reset.scss lib from src/sass/libs', function () {
    assert.noFile( [
      'src/sass/libs/_reset.scss'
    ] );
  } );

  describe('generates templated files based on User-options', function () {
    it ('appName ["testTze"] in package.json & main.js', function () {
      assert.fileContent([
        ['package.json', /"name"\: "testTze"/],
        ['src/js/main.js', /var testTze = function \(\$\) /],
        ['src/js/main.js', /testTze\.init\(\$\(.+\)\);/]
      ]);
    });

    it ('version ["0.0.0"] in package.json', function () {
      assert.fileContent([
        ['package.json', /"version"\: "0\.0\.0"/]
      ]);
    });

    it ('author ["Tze Lei"] in package.json', function () {
      assert.fileContent([
        ['package.json', /"author"\: "Tze Lei"/]
      ]);
    });

    it ('email ["tze.lei@mrm-mccann.com"] in package.json', function () {
      assert.fileContent([
        ['package.json', /"email"\: "tze.lei@mrm-mccann.com"/]
      ]);
    });

    it ('grunt-contrib-connect in package.json', function () {
      assert.fileContent([
        ['package.json', /"grunt-contrib-connect"/]
      ]);
    });

    it ('jQuery version [2.1.3] in index.html', function () {
      assert.fileContent([
        ['src/index.html', /jquery\-2\.1\.3\.min\.js/]
      ]);
    });

    it ('Bootstrap [true] in index.html and _base.scss', function () {
      assert.fileContent([
        ['src/index.html', /bootstrap\.min\.js/],
        ['src/sass/partials/_base.scss', /bootstrap/]
      ]);
    });

    it ('_responsive.scss partial removed from main.scss', function () {
      assert.noFileContent([
        ['src/sass/main.scss', /responsive/]
      ]);
    });

    it ('_reset.scss lib removed from _base.scss partial', function () {
      assert.noFileContent([
        ['src/sass/partials/_base.scss', /reset/]
      ]);
    });

    it ('jsHint eqeqeq [true] in Gruntfile.js', function () {
      assert.fileContent([
        ['Gruntfile.js', /eqeqeq: true/]
      ]);
    });

    it ('grunt-contrib-connect and grunt serve in Gruntfile.js', function () {
      assert.fileContent([
        ['Gruntfile.js', /connect\: \{/],
        ['Gruntfile.js', /'grunt-contrib-connect'/],
        ['Gruntfile.js', /'connect:dev'/],
        ['Gruntfile.js', /'connect:build'/],
        ['Gruntfile.js', /'setWatchConfig'/],
        ['Gruntfile.js', /'serve'/],
        ['Gruntfile.js', /'buildWatch'/]
      ]);
    });
  });

});
