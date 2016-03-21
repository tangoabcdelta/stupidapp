$(function(){
  $("#login").on("click",function(){
    var _data = function(){
      return {
        "userid": $("#username").val(),
        "pwd": $("#password").val()
      }
    }();
    var jqxhr = $.ajax({
      type: "POST",
      url: "/login",
      dataType: "application/json",
      data: _data
    })
    .done(function(data) {
      alert( "success" );
      console.log( data );
    })
    .fail(function(e) {
      console.log( "error", e );
    })
    .always(function(e) {
      console.log( "complete", e );
    });
  });
})
