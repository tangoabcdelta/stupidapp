module.exports = function ( grunt ) {
  grunt.registerTask('build', function( targetEnvironment ) {
    switch (targetEnvironment) {
      case 'dev':
      case 'development':
      case '':
      default:
        grunt.task.run(['clean:dist', 'concat', 'copy', 'express:dev', 'watch']);
        break;
    }
  });
}
