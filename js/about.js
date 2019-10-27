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
	var numberOfTweets = tweet_array.length;
	$('#numberTweets').text(numberOfTweets);

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
	

	//Tweet Dates (1 point)
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


	//Tweet Categories (1 point)
	//The tweets can be divided into four categories:
	var completedEventCount = 0;
	var liveEventCount = 0;
	var achievementCount = 0;
	var miscellaneousCount = 0;
	tweet_array.forEach(element => {
		if(element.source==="completed_event") { completedEventCount++; }
		else if(element.source==="live_event") { liveEventCount++; }
		else if(element.source==="achievement") { achievementCount++; }
		else if(element.source==="miscellaneous") { miscellaneousCount++; }
	});
	$('.completedEvents').text(completedEventCount);
	$('.liveEvents').text(liveEventCount);
	$('.achievements').text(achievementCount);
	$('.miscellaneous').text(miscellaneousCount);

	var completedEventPct = ((completedEventCount/numberOfTweets)*100).toFixed(2);
	var liveEventPct = ((liveEventCount/numberOfTweets)*100).toFixed(2);
	var achievementPct = ((achievementCount/numberOfTweets)*100).toFixed(2);
	var misscellaneousPct = ((miscellaneousCount/numberOfTweets)*100).toFixed(2);
	$('.completedEventsPct').text(completedEventPct+"%");
	$('.liveEventsPct').text(liveEventPct+"%");
	$('.achievementsPct').text(achievementPct+"%");
	$('.miscellaneousPct').text(misscellaneousPct+"%");

	//User Written Tweets (1 point)
	//Some of the Tweets in each category also contain text written by the user. 
	var userWrittenTweetCount = 0;
	tweet_array.forEach(element => {
		 	if( element.written ) {
				//console.log(element.writtenText );
				userWrittenTweetCount++;
			}
	});		
	var userWrittenTweetPct = ((userWrittenTweetCount/numberOfTweets)*100).toFixed(2);
	$('.written').text(userWrittenTweetCount);
	$('.writtenPct').text(userWrittenTweetPct+"%");

}

//Wait for the DOM to load
$(document).ready(function() {
	loadSavedRunkeeperTweets().then(parseTweets);
});