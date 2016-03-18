//this is HomeController

var request = require('request');
var http = require('http');


module.exports = {

  index: function (req, res) {

    return res.view();

  },

  Home: function (req,res){

    //special layout for home.ejs
    res.locals.layout = 'layout2';
    return res.view();
  },

  ShowSopt: function (req,res){

  },

  SearchResult : function (req,res){
    //if post data come
    if(req.method == 'POST') {
      //get post data will use as tree attribute
      var type = req.param("type");
      var category = req.param("category");
      var good_for = req.param("good_for");

      var ati1 = 0,ati2 = 0,ati3 = 0;
      var ans_case = 0 ;

      //debug post data
      console.log("POST DATA:"+type+" "+category+" "+good_for);

      //--------------------decision tree algorithm-------------------------------------------//

      if(type == 0){//node layer 1 case 1
        ati1 = 0;
        if(category == 0){//node layer 2 case 1
          ati2 = 0;
          if(good_for == 0){//node layer 3 case 1
            ati3 = 0;
            ans_case = 1; //case 0,0,0
          }
          else if(good_for == 1){//node layer 3 case 2
            ati3 = 1;
            ans_case = 2;//case 0,0,1
          }
          else if(good_for == 2){//node layer 3 case 3
            ati3 = 2;
            ans_case = 3;//case 0,0,2
          }
          else{//error in layer 3

          }
        }
        else if(category == 1){//node layer 2 case 2
          ati2 = 1;
          if(good_for == 0){//node layer 3 case 1
            ati3 = 0;
            ans_case = 4;//case 0,1,0
          }
          else if(good_for == 1){//node layer 3 case 2
            ati3 = 1;
            ans_case = 5;//case 0,1,1
          }
          else if(good_for == 2){//node layer 3 case 3
            ati3 = 2;
            ans_case = 6;//case 0,1,2
          }
          else{//error in layer 3

          }
        }
        else{//error in layer 2

        }
      }

      else if(type == 1){// node layer 1 case 2
        ati1 = 1;
        if(category == 0){//node layer 2 case 1
          ati2 = 0;
          if(good_for == 0){//node layer 3 case 1
            ati3 = 0;
            ans_case = 7;//case 1,0,0
          }
          else if(good_for == 1){//node layer 3 case 2
            ati3 = 1;
            ans_case = 8;//case 1,0,1
          }
          else if(good_for == 2){//node layer 3 case 3
            ati3 = 2;
            ans_case = 9;//case 1,0,2
          }
          else{//error in layer 3

          }
        }
        else if(category == 1){//node layer 2 case 2
          ati2 = 1;
          if(good_for == 0){//node layer 3 case 1
            ati3 = 0;
            ans_case = 10;//case 1,1,0
          }
          else if(good_for == 1){//node layer 3 case 2
            ati3 = 1;
            ans_case = 11;//case 1,1,1
          }
          else if(good_for == 2){//node layer 3 case 3
            ati3 = 2;
            ans_case = 12;//case 1,1,2
          }
          else{//error in layer 3

          }
        }
        else{//error in layer 2

        }

      }
      else{//error in layer 1

      }
      console.log("attribute: "+ati1+" "+ati2+" "+ati3);//debug attributes
      console.log("answer case:"+ans_case);
      //--------------- end decision tree algorithm---------------------------------------//



    }//end if post

    return res.view();
  },

  AddSpot : function (){

  },

  //this is function for test form by using sails


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
