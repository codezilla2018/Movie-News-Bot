console.log('Bot is starting...');

//add twit library that connect with twitter API
var Twit = require('twit');

//Add module that consist with consumer keys and other stuff required for OAuth
var config=require('./config');

//create new twit object with config module
var T = new Twit(config);


tweet();
setInterval(tweet,1000*60*60*24);
like();
follow();

//bot will tweet every 24 hour about new movie news all around twitter with links
function tweet(){
    var params=[{q: '@screenrant',count: 3},{q: '@CinemaBlend',count: 1},{q: '@IMDb',count: 1},{q: '@comingsoonnet',count: 1},{q: '@RottenTomatoes',count: 3}];
    for(j=0;j<params.length;j++){
        T.get('search/tweets', params[j], gotData);//get tweets about queries(q) in param
        function gotData(err, data, response){
            console.log(data);
            for(i=0;i<data.statuses.length;i++){
                
                var tweet={
                    status: '#MovieNews '+data.statuses[i].text+ ' \n\nSOURCE: twitter.com'
                }
                //console.log('#Movienews '+data.statuses[i].text+ ' \n\nSOURCE: twitter.com');
                //This posts tweets mentioned in tweet param.
                T.post('statuses/update', tweet,tweeted);
                }
        }
        //this is a call back function work after tweet has posted.
        function tweeted(err, data, response) {
            if(err){
                console.log(err);  
            }
            else{
                console.log("Bot tweeted.");
            }
        }
    }
}
    
//bot will reply when someone follow him
function follow(){
    //when stream is on bot will listen to events like follow.
    var stream=T.stream('user');
    stream.on('follow',retweet);
    
    //if someone follow bot bot will reply
    function retweet(eventMsg){
    var tweet={
                    status: 'Thanks for following me '+'@'+eventMsg.source.screen_name
                }
    T.post('statuses/update', tweet,tweeted);
        
    //this is a call back function work after tweet has posted.
    function tweeted(err, data, response) {//this is a call back function work after tweet has posted.
            if(err){
                console.log(err);  
            }
            else{
                console.log("Bot tweeted.");
            }
        }
}

}

//bot will reply when someone like his tweets who never like bot's tweets
function like(){
    var stream=T.stream('user');
    stream.on('favorite',retweet);
    

    function retweet(eventMsg){
    var tweet={
                    status: 'Thanks for like my tweet '+'@'+eventMsg.source.screen_name
                }
    T.post('statuses/update', tweet,tweeted);
        
    //this is a call back function work after tweet has posted.
    function tweeted(err, data, response) {//this is a call back function work after tweet has posted.
            if(err){
                console.log(err);  
            }
            else{
                console.log("Bot tweeted.");
            }
        }
}

}

