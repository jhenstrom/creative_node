var express = require('express');
var fs = require('fs');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) 
{
  res.sendFile('index.html', { root:  'public' });
});

router.get('/adventure', function(req, res, next) 
{
   res.sendFile('adventure.html', { root: 'public'});
});

router.get('/spell', function(req,res) 
{
  console.log("getting a spell");
  console.log(req.query.q);
  var spell = req.query.q.split(' ');
  console.log(spell);
  var myurl = "http://dnd5eapi.co/api/spells/?name=";
  myurl += spell[0];
  for (var i = 1; i < spell.length; i++)
  {
      myurl += "+" + spell[i];
  }
  console.log(myurl);
  request(myurl).pipe(res);
});

router.get('/cast', function(req,res) 
{
  console.log("casting a spell");
  console.log(req.query.q);
  var myurl = "http://dnd5eapi.co/api/spells/" + req.query.q;
  console.log(myurl);
  request(myurl).pipe(res);
});

router.get('/monster', function(req,res) 
{
  console.log("getting a monster");
  //getting a random number to generate monster
  var rand_number = Math.floor((Math.random() * 325) + 1);
  console.log(rand_number);
  request("http://dnd5eapi.co/api/monsters/" + rand_number).pipe(res);
});

module.exports = router;
