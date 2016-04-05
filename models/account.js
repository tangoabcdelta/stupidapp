// http://mherman.org/blog/2015/01/31/local-authentication-with-passport-and-express-4/#.VwMQ3hN96V7
// https://gist.github.com/manjeshpv/84446e6aa5b3689e8b84

// https://scotch.io/bar-talk/s-o-l-i-d-the-first-five-principles-of-object-oriented-design?utm_content=buffer0e500&utm_medium=social&utm_source=facebook.com&utm_campaign=buffer
// https://stormpath.com/blog/everything-you-ever-wanted-to-know-about-node-dot-js-sessions/
// https://codeforgeek.com/2015/07/using-redis-to-handle-session-in-node-js/
// http://knexjs.org/#Builder-select
// https://remysharp.com/2016/03/22/the-copy--paste-guide-to-your-first-service-worker
// https://github.com/dolox/fallback/blob/master/README.md

var LocalStrategy   = require('passport-local').Strategy;
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'new_schema'
  }
});


module.exports = function ( passport ) {
  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done){
    knex
    .select('*')
    .from('sample_users')
    .limit(1)
    .where('id','=', id)
    .then(function(){
      console.log("sucess");
    })
    .finally(function(e, rows){
      done(e, rows && rows[0] || "")
    });
  });

  passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  }, function(req, email, password, done) {
    console.log("reached here");
    return done();
  }));
}
