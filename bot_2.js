console.log('Bot is starting...');

var Twit = require('twit');//add twit library that connect with twitter API
var config=require('./config');//Add module that consist with consumer keys and other stuff.

var T = new Twit(config);//create new twit object with config module



var tweet={
    status: '#movienewsbot start tweeting.'
}

T.post('statuses/update', tweet,tweeted);//This is post tweets mentioned in tweet param.
       
function tweeted(err, data, response) {//this is a call back function work after tweet has posted.
  console.log(data);
}