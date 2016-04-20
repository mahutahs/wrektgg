var express = require('express')
app = express();
var exphbs = require('express-handlebars');
var request = require('request');
var async = require('async')
/*var lol = require('/lol.js');*/

app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

app.get('/', function(req, res){
  var data = {};
  var api_key = '0502b72a-4912-4b5e-b71e-5ee60617b694';
  var s_toSearch = 'deathgun';
  var URL = 'https://oce.api.pvp.net/api/lol/oce/v1.4/summoner/by-name/' + s_toSearch + '?api_key=' + api_key;

async.waterfall([
	function(callback) {
		request(URL, function(err, response, body){
			if(!err && response.statusCode == 200) {
				var json = JSON.parse(body);
				data.id = json[s_toSearch].id;
				data.name = json[s_toSearch].name;
				callback(null, data);
			} else {
				console.log(err);
			}
		});
	},
],
function(err,data) {
	if(err) {
		console.log(err);
		return;
	}

	res.render('index', {
		info: data
	})
})

});

var port = Number(process.env.PORT || 3000);
app.listen(port);