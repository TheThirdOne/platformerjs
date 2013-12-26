/*global module:false*/
module.exports = function(grunt) {
  var sourceFiles = [
    'src/main.js',
    'src/bindings.js',
    'src/entities.js',
    'src/game.js',
    'src/resource.js',
    'src/collision.js'
  ];
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        separator: '\n',
      },
      dist: {
        src: sourceFiles,
        dest: 'build/concat.js',
      },
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        force: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        devel: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_main: {
        src: ['<%= concat.dist.dest %>']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_main: {
        files: '<%= jshint.lib_main.src %>',
        tasks: ['jshint:lib_main']
      }
    },
    shell: {                                // Task
        jsDoc: {                      // Target
            options: {                      // Options
                stdout: true
            },
            command: 'node_modules/jsdoc/jsdoc.js src/* README.md -d doc --verbose'
        }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  // Default task.
  grunt.registerTask('default', ['concat', 'uglify','shell','jshint']);
  grunt.registerTask('min', ['concat', 'uglify']);
  grunt.registerTask('style', ['concat', 'jshint']);
  grunt.registerTask('doc', ['shell']);

};
