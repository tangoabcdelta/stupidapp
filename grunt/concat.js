module.exports = {
  options: {
    separator: '\n',
  },
  dev: {
    files: {
      'dist/index.html': ['index.html'],
      'tmp/jquery-all.js': ['vendor/jquery.js', 'vendor/jquery-ui.min.js'],
      'dist/js/main.lib.js': ['vendor/angular/angular.min.js', 'vendor/angular-route/angular-route.min.js', 'vendor/firebase/firebase.js', 'vendor/angularfire/dist/angularfire.min.js', 'tmp/jquery-all.js', 'vendor/highcharts-custom.js', 'vendor/lodash/lodash.min.js'],
      'dist/js/main.out.js': ['js/project-orig.js', 'js/project.js', 'js/cart-placeholder.js', 'js/search-bar.js'],
      'dist/css/main.out.css': ['css/bootstrap.min.css', "css/docs.css", "css/custom.css"],
      'dist/css/font-awesome.css': ['css/font-awesome.css']
    }
  }
}
