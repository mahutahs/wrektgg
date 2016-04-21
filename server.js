var express = require('express')
app = express();
var exphbs = require('express-handlebars');
var request = require('request');
var async = require('async')


app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

app.get('/', function(req, res){
	res.render('index');
});

app.get('/search', function(req, res){
  var data = {};
  var api_key = '0502b72a-4912-4b5e-b71e-5ee60617b694';
  var s_toSearch = req.query.summoner.toLowerCase();


async.waterfall([
	function(callback) {
		var URL = 'https://oce.api.pvp.net/api/lol/oce/v1.4/summoner/by-name/' + s_toSearch + '?api_key=' + api_key;
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
	function(data, callback) {
		var URL = 'https://oce.api.pvp.net/api/lol/oce/v1.3/stats/by-summoner/' + data.id + '/ranked?season=SEASON2016&api_key=' + api_key
		request(URL, function(err, response, body){
			if(!err && response.statusCode == 200) {
				var json = JSON.parse(body);
				var mostPlayed = 0;
				var championPlayed = 0;
				for (var c = 0;c < json['champions'].length; c++){
					var currentPlayed = json['champions'][c]['stats'].totalSessionsPlayed;
					if(currentPlayed > mostPlayed && !json['champions'][c].id == 0) {
						mostPlayed = currentPlayed;
						json['champions'][c].id;
					}
				}
				console.log(mostPlayed)
				callback(null, data)
			}else{
				console.log('line 53')
			}
		});
	},
	function(data, callback) {
		var URL = 'https://global.api.pvp.net/api/lol/static-data/oce/v1.2/champion/' + data.champId + '?locale=en_US&champData=infor&api_key=' + api_key
		request (URL, function(err,response, body){
			if(response.statusCode == 200) {
				var json = JSON.parse(body);
				data.champName = json['name'];
				console.log(data.champName);
				callback(null, data);
			} else {
				console.log(err);
			}
		});
	}
],
	function(err,data) {
		if(err) {
			console.log(err);
			return;
	}
	console.log(data)
	res.render('index', {
		info: data
	});
});

});

var port = Number(process.env.PORT || 3000);
app.listen(port);

