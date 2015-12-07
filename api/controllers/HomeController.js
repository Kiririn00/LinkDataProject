//this is HomeController

var request = require('request');


module.exports = {
  index: function (req, res) {
    //return res.send("Hi there! 2");
    return res.view();
  },

  //this is function for test form by using sails
  Form: function (req, res) {

    req.param('username');

    return res.view();
  },

  //this is function for testing FB API(not relative with research project)
  FbMessage: function (req,res){

    var login = require("facebook-chat-api");
    var fb_email = "";
    var fb_password = "";

    // Create simple echo bot
    login({email: "", password: ""}, function callback (err, api) {
      if(err) return console.error(err);

      /*
      var yourID = 772475315;
      var msg = {body: "Hey!"};
      api.sendMessage(msg, yourID);
      */

      // Simple echo bot. He'll repeat anything that you say.
      // Will stop when you say '/stop'
      api.setOptions({listenEvents: true});

      var stopListening = api.listen(function(err, event) {
        if(err) return console.error(err);

        switch(event.type) {
          case "message":
            if(event.body === '/stop') {
              api.sendMessage("Goodbye...", event.thread_id);
              return stopListening();
            }
            api.markAsRead(event.thread_id, function(err) {
              if(err) console.log(err);
            });
            api.sendMessage("TEST BOT: " + event.body, event.thread_id);
            break;
          case "event":
            console.log(event);
            break;
        }
      });//end stopListening


    });//end FB api

    return res.view();
  },

  ServerSide: function (req, res) {

    //var request = require('request');
    var options = {
      url: 'http://localhost:3030/Jena-Tutorial-persistent/query?query=SELECT ?s ?p ?o\n' // \n は改行を表す
      + 'WHERE {?s ?p ?o}&output=json',
      query: 'SELECT ?s ?p ?o\n' // \n は改行を表す
      + 'WHERE {?s ?p ?o}',
      output: 'json',
      method: "GET"


    };
    var json;
    //callback function
    function check(json){
      return json;
    }

    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
        var json_data = body;
       json = check(json_data);//callback function

      } else {
        console.log('Error');
      }
      return res.view({
        test: "test55",
        json_result: json
      });

    });


    console.log('Server SIDE done');

    //var json = check();
  /*
    return res.view({
      test: "test55",
      json_result: json
    });
  */
  }//end ServerSide function



};//end module exprot
