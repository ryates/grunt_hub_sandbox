module.exports = function(grunt) {
  // config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    project: {
      mainDir: 'test2',
      cssDir: 'assets/css',
      sassDir: 'assets/sass',
      jsDir: 'assets/js',
    },

    sass: {
      dev: {
        options: {
          style: 'compact',
          lineNumbers: false,
          compass: false,
        },
        files: [{
          expand: true,
          cwd: '<%= project.sassDir %>', // All src matches are relative to (but don't include) this path
          src: ['*.scss'], // Pattern(s) to match, relative to the cwd
          dest: '<%= project.cssDir %>', // Destination path prefix
          ext: '.css' // Replace any existing extension with this value in generated dest paths
        }]
      },
    },

    autoprefixer: {
      dev: {
        options: {
          browsers: ['last 3 versions', 'ie9', 'ie10']
        },
        no_dest_multiple: {
          src: '<%= project.cssDir %>/*.css'
        }
      },
    },

    watch: {
      grunt: {
        options: {
          reload: true
        },
        files: ['Gruntfile.js']
      },

      sass: {
        files: '<%= project.sassDir %>/*.scss',
        tasks: ['sass'],
        options: {
          // Start a live reload server on the default port 35729
          livereload: false,
        },
      },
    },

  });

  // load tasks
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // tasks
  grunt.registerTask('build', [ 'sass', 'autoprefixer']);
  grunt.registerTask('default', ['watch']);
};
