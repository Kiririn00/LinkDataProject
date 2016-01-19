/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function (req, res) {
		return res.send("Hi there!");
	},

  Login : function (req,res){

    return res.view();
  },

  Register: function (req, res) {

    if(req.method=='POST') {

      //set name of dataset that will INSERT
      var dataset = 'users';
      //set SPARQL that will query by Fuseki
      var postData = 'PREFIX user: <http://testproject.com/user#>\n' +
        'PREFIX data: <http://testproject.com/data#>\n' +
        'INSERT DATA{\n' +
        'user:test data:test "testhhkk"\n' +
        '}';
      //what wii send and what will set in header and body of HTTP POST REQUEST
      var options = {
        hostname: 'localhost',
        port: 3030,
        path: '/users/update',
        method: 'POST',
        headers: {
          'Content-Type': 'application/sparql-update',
          'Content-Length': postData.length
        }
      };
      //send http request to Fuseki
      var req = http.request(options, function (res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
          console.log('BODY: ' + chunk);
        });
        res.on('end', function () {
          console.log('No more data in response.')
        })
      });
      //if error for send HTTP request
      req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
      });

      // write data to request body
      req.write(postData);
      req.end();
    }//end if post

    //show view

    return res.view();
  }
};
