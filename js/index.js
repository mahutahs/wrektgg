var express = require('express')
app = express();
var handleBars = require('express-handlebars');
var request = require('request');
var lol = require('/lol.js');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

app.get('/', function(req, res){
  var data = {};
  var api_key = '0502b72a-4912-4b5e-b71e-5ee60617b694';
  var s_toSearch = 'DEATHGUN';
  var URL = 'https://oce.api.pvp.net/api/lol/oce/v1.3/stats/by-summoner/570515/ranked?season=SEASON2016&api_key=' + api_key;
});

