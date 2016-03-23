module.exports = {
  options: {
    livereload: true
  },
  scripts: {
    files: ['js/*.js', '*.html', 'templates/**/*.html', 'css/**/*.css', 'grunt/*.js'],
    tasks: ['default'],
    options: {
      debounceDelay: 1000,
      spawn: false,
      reload: true,
      livereload: true
    }
  },
  express: {
    files: [ 'www' ],
    tasks: [ 'express:dev' ],
    options: {
      spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
    }
  }
}