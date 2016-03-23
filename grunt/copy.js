module.exports = {
  main: {
    files: [
      {
        expand: true,
        cwd: 'templates/',
        src: ['*.html'],
        dest: 'dist/'
      },
      {
        expand: true,
        src: ['projects.json'],
        dest: 'dist/'
      },
      {
        expand: true,
        cwd: 'img/',
        src: ['*.*'],
        dest: 'dist/img/'
      }
    ]
  }
}
