console.log('Bot is starting...');

var Twit = require('twit');//add twit library that connect with twitter API
var config=require('./config');//Add module that consist with consumer keys and other stuff.

var T = new Twit(config);//create new twit object with config module

var params={
    q: 'avengers infinity war', 
    count: 2
}
T.get('search/tweets', params, gotData);//get data about 2 queries(q) we need
function gotData(err, data, response){
    //console.log(data);  //and we write the data about query
    for(i=0;i<data.statuses.length;i++){
        var tweet={
            status: '#Movienews '+data.statuses[i].text
        }

        T.post('statuses/update', tweet,tweeted);//This is post tweets mentioned in tweet param.
       
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