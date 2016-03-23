var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'deveedutta',
    password : '',
    database : 'sattabazi',
    debug    : false
  }
});

switch ('') {
  case 'dev':
  case 'development':
  case '':
  default:
  knex.schema.hasTable('game_events')
  .then(function(exists){
    if(!exists){
      knex.schema.createTableIfNotExists ('game_events', function (table) {
        table.increments();
        table.string('event_name');
        table.string('event_genre');
        table.string('event_country');
        table.date('event_date');
        table.string('event_date_type'); //scheduled, tentative,
        table.string('event_status'); //complete, cancelled, not-decided-yet
        table.timestamps();
      })
      .then(function(data){
        console.log( "============= table `game_events` created =============" );
        // data = JSON.stringify(data);
        // console.log( data );
        console.log()
      });
    } else {
      console.log( "table `game_events` already exists" );
      process.exit();
    }
  })


  break;
}
