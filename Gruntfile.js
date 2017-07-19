/**
 * phpMyFAQ Gruntfile.js
 *
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @category  phpMyFAQ
 * @package   Development
 * @author    Thorsten Rinne <thorsten@phpmyfaq.de>
 * @copyright 2013-2017 phpMyFAQ Team
 * @license   http://www.mozilla.org/MPL/2.0/ Mozilla Public License Version 2.0
 * @link      http://www.phpmyfaq.de
 * @since     2013-06-23
 */

/*global module:false, require:false */

module.exports = function (grunt) {

  'use strict';

  // Load all tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    //
    // Metadata.
    //
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! phpMyFAQ v<%= pkg.version %> - <%= pkg.homepage %> - Copyright (c) 2001 - <%= grunt.template.today("yyyy") %> Thorsten Rinne and phpMyFAQ Team */\n',
    bumpup: {
      files: ['package.json', 'composer.json']
    },

    //
    // Task configuration.
    //
    copy: {
      tinymce: {
        files: [
          {
            expand: true,
            src: 'node_modules/tinymce/tinymce.min.js',
            flatten: true,
            dest: 'phpmyfaq/admin/assets/js/editor'
          },
          {
            expand: true,
            cwd: 'node_modules/tinymce/plugins/',
            src: '**',
            dest: 'phpmyfaq/admin/assets/js/editor/plugins/'
          },
          {
            expand: true,
            cwd: 'node_modules/tinymce/skins/',
            src: '**/*.!(less)',
            dest: 'phpmyfaq/admin/assets/js/editor/skins/'
          },
          {
            expand: true,
            cwd: 'node_modules/tinymce/themes/',
            src: '**',
            dest: 'phpmyfaq/admin/assets/js/editor/themes/'
          }
        ]
      },
      fontawesome: {
        files: [
          {
            expand: true,
            cwd: 'node_modules/font-awesome/fonts/',
            src: '**',
            dest: 'phpmyfaq/admin/assets/fonts/'
          },
          {
            expand: true,
            cwd: 'node_modules/font-awesome/fonts/',
            src: '**',
            dest: 'phpmyfaq/assets/template/default/fonts/'
          }
        ]
      },
      glyphicons: {
        files: [
          {
            expand: true,
            cwd: 'node_modules/bootstrap/fonts/',
            src: '**',
            dest: 'phpmyfaq/admin/assets/fonts/'
          },
          {
            expand: true,
            cwd: 'node_modules/bootstrap/fonts/',
            src: '**',
            dest: 'phpmyfaq/assets/template/default/fonts/'
          }
        ]
      },
      highlightjs: {
        files: [
          {
            expand: true,
            src: 'node_modules/highlightjs/highlight.pack.js',
            flatten: true,
            dest: 'phpmyfaq/assets/js/libs'
          },
          {
            expand: true,
            src: 'node_modules/highlightjs/styles/default.css',
            flatten: true,
            dest: 'phpmyfaq/assets/js/libs'
          }
        ]
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: false
      },
      dist: {
        src: [
          'node_modules/jquery/dist/jquery.js',
          'node_modules/bootstrap/js/tooltip.js',
          'node_modules/bootstrap/js/transition.js',
          'node_modules/bootstrap/js/alert.js',
          'node_modules/bootstrap/js/button.js',
          'node_modules/bootstrap/js/collapse.js',
          'node_modules/bootstrap/js/dropdown.js',
          'node_modules/bootstrap/js/modal.js',
          'node_modules/bootstrap/js/popover.js',
          'node_modules/bootstrap/js/tab.js',
          'node_modules/corejs-typeahead/dist/typeahead.bundle.js',
          'node_modules/handlebars/dist/handlebars.js',
          'node_modules/mermaid/dist/mermaid.js',
          'node_modules/bootstrap-fileinput/js/fileinput.js',
          'phpmyfaq/assets/js/autosave.js',
          'phpmyfaq/assets/js/category.js',
          'phpmyfaq/assets/js/comments.js',
          'phpmyfaq/assets/js/records.js',
          'phpmyfaq/assets/js/typeahead.js',
          'phpmyfaq/assets/js/functions.js'
        ],
        dest: 'phpmyfaq/assets/js/phpmyfaq.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>',
        preserveComments: 'some'
      },
      frontend: {
        files: {'phpmyfaq/assets/js/phpmyfaq.min.js': ['<%= concat.dist.dest %>']}
      },
      phpmyfaq_tinymce_plugin: {
        files: {
          'phpmyfaq/admin/assets/js/editor/plugins/phpmyfaq/plugin.min.js': ['phpmyfaq/admin/assets/js/phpmyfaq.tinymce.plugin.js'],
          'phpmyfaq/admin/assets/js/editor/plugins/imageupload/plugin.min.js': ['phpmyfaq/admin/assets/js/imageupload.tinymce.plugin.js']
        }
      }
    },
    jshint: {
      jshintrc: '.jshintrc',
      gruntfile: {
        src: 'Gruntfile.js'
      },
      beforeconcat: [
        'phpmyfaq/admin/assets/js/*.js',
        'phpmyfaq/assets/js/autosave.js',
        'phpmyfaq/assets/js/comments.js',
        'phpmyfaq/assets/js/setup.js',
        'phpmyfaq/assets/js/typeahead.js',
        'phpmyfaq/assets/js/functions.js'
      ]
    },
    less: {
      development: {
        banner: '<%= banner %>',
        files: {
          'phpmyfaq/admin/assets/css/style.css': 'phpmyfaq/admin/assets/less/style.less',
          //'phpmyfaq/admin/assets/css/style.rtl.css': 'phpmyfaq/admin/assets/less/style.rtl.less',
          'phpmyfaq/assets/template/default/css/style.css': 'phpmyfaq/assets/template/default/less/style.less'
          //'phpmyfaq/assets/template/default/css/style.rtl.css': 'phpmyfaq/assets/template/default/less/style.rtl.less'
        }
      },
      production: {
        files: {
          'phpmyfaq/admin/assets/css/style.css': 'phpmyfaq/admin/assets/less/style.less',
          //'phpmyfaq/admin/assets/css/style.rtl.css': 'phpmyfaq/admin/assets/less/style.rtl.less',
          'phpmyfaq/assets/template/default/css/style.css': 'phpmyfaq/assets/template/default/less/style.less'
          //'phpmyfaq/assets/template/default/css/style.rtl.css': 'phpmyfaq/assets/template/default/less/style.rtl.less'
        },
        compress: true
      }
    },
    cssmin: {
      add_banner: {
        options: {
          banner: '<%= banner %>',
          keepSpecialComments: 0
        },
        files: {
          'phpmyfaq/admin/assets/css/style.min.css': 'phpmyfaq/admin/assets/css/style.css',
          //'phpmyfaq/admin/assets/css/style.rtl.css': 'phpmyfaq/admin/assets/css/style.rtl.css',
          'phpmyfaq/assets/template/default/css/style.min.css': ['phpmyfaq/assets/template/default/css/style.css']
          //'phpmyfaq/assets/template/default/css/style.rtl.min.css': ['phpmyfaq/assets/template/default/css/style.rtl.css']
        }
      }
    },
    modernizr: {
      dist: {
        dest: 'phpmyfaq/assets/js/modernizr.min.js',
        uglify: true
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['phpmyfaq/admin/assets/js/**/*.js', 'phpmyfaq/assets/js/*.js'],
        tasks: ['jshint', 'concat', 'uglify'],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['phpmyfaq/admin/assets/less/*.less', 'phpmyfaq/assets/template/default/less/*.less'],
        tasks: ['less', 'cssmin'],
        options: {
          livereload: true
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['copy', 'jshint', 'concat', 'uglify', 'less:development', 'cssmin', 'modernizr']);

  // Build task
  grunt.registerTask('build', ['copy', 'concat', 'uglify', 'less:production', 'cssmin', 'modernizr']);

  // Watcher
  grunt.event.on('watch', function (action, filepath, target) {
    grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
  });
};
