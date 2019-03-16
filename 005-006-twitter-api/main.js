const { twitterClient } = require('./twitter');
console.log(Date.now());
(async () => {

    var stream = twitterClient.stream('statuses/filter', { track: '#arthurwebdev' });
    stream.on('data', function (event) {
        const tweet = {
            user: event.user.id,
            username: event.user.screen_name,
            tweet: event.text,
            tweet_id: event.id_str
        }
        const tweetAnswer = {
            status: `Hey @${tweet.username}, this is a test answer from Twitter API.`,
            in_reply_to_status_id: tweet.tweet_id,
            auto_populate_reply_metadata: true
        }
        twitterClient.post('favorites/create', { id: tweet.tweet_id }, (...params) => {
            console.log(params)
        })
        twitterClient.post('statuses/update', tweetAnswer, function (error, tweet, response) {
            if (error) {
                console.log(error)
                return
            }
            console.log(tweet);  // Tweet body.
        });
    });

    stream.on('error', function (error) {
        throw error;
    });

})() 