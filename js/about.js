function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	} /*else {
		window.alert('Tweets Returned!');
	} */

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	$('#numberTweets').text(tweet_array.length);

	//debug: verify contents in tweet_array. Use Chrome Dev Tools to view console output. This prints
	/*
	var arrayCount = 0;
	tweet_array.forEach(function(tweet) {
		arrayCount++;
		//console.log(tweet.time);
	}); 
	console.log("arrayCount: " + arrayCount);
	console.log("tweet_array.length : " + tweet_array.length);
	  */

	//Test DOM manipulation
	/* */
	//$('#firstDate').text('test 12345')
	//$('#lastDate').text('test 45678')
	

	//Tweet Dates
	//Find the earliest and latest Tweets in the set, and then update the spans.
	//Use Month, Day, and Year format exp: Monday, October 14, 2019
	//for options use https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
	var firstTweetElement= tweet_array[0];
	var lastTweetElement = tweet_array[tweet_array.length-1];
	//console.log(firstTweetElement.time);
	//console.log(lastTweetElement.time);
	//console.log(tweet_array[1]);
	//console.log(tweet_array[tweet_array.length-2]);

	var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	
	$('#firstDate').text(lastTweetElement.time.toLocaleDateString('en-US',options));
	$('#lastDate').text(firstTweetElement.time.toLocaleDateString('en-US',options));


	
	
}

//Wait for the DOM to load
$(document).ready(function() {
	loadSavedRunkeeperTweets().then(parseTweets);
});