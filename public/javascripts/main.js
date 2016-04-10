$(function(){
  $("#login").on("click",function(){
    var _data = function(){
      return {
        "username": $("#username").val(),
        "password": $("#password").val()
      }
    }();
    var jqxhr = $.ajax({
      type: "POST",
      url: "/login",
      // dataType: "application/json",
      data: _data
    })
    .done(function(data) {
      var html = _.template("Hi, ${user}, welcome to stupid app")({
        user: data['user_first_name']
      })
      $("#userDetails").html(html);
      window.setTimeout(function(){ window.location.reload(); },3000);
    })
    .fail(function(e) {
      console.log( "error", e );
      var html = _.template("Houston, There is a problem: ${text}")({
        text: e.responseText
      })
      $("#userDetails").html(html);
    })
    .always(function(e) {
      console.log( "complete", e );
    });
  });

  $("#show").on("click", function(event){
    $.get("/api").done(function(data) {
      console.log( data );
    });
    $.get("/api/events").done(function(data) {
      console.log( data );
    });
    $.get("/api/games").done(function(data) {
      console.log( data );
    });
  });
})
