console.log('Bot is starting...');

var Twit = require('twit');//add twit library that connect with twitter API
var config=require('./config');//Add module that consist with consumer keys and other stuff.

var T = new Twit(config);//create new twit object with config module


tweet();
setInterval(tweet,1000*60*60*24);
function tweet(){
    var params=[{q: '@screenrant',count: 1},{q: '@CinemaBlend',count: 1},{q: '@IMDb',count: 1},{q: '@CBR',count: 1},{q: '@movieweb',count: 1},{q: '@comingsoonnet',count: 1},{q: '@darkhorizons',count: 1},{q: '@RottenTomatoes',count: 1}];
    for(j=0;j<params.length;j++){
        T.get('search/tweets', params[j], gotData);//get data about 2 queries(q) we need
        function gotData(err, data, response){
            for(i=0;i<data.statuses.length;i++){
                
                var tweet={
                    status: '#Movienews '+data.statuses[i].text
                }
                //console.log('#Movienews '+data.statuses[i].text);
                T.post('statuses/update', tweet,tweeted);//This posts tweets mentioned in tweet param.
                }
        }
        function tweeted(err, data, response) {//this is a call back function work after tweet has posted.
            if(err){
                console.log(err);  
            }
            else{
                console.log("Bot Start Tweeting!!!");
            }
        }
    }
}
    