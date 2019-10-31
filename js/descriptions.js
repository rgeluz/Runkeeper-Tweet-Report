
var writtenTweet_array = []; //global array used by multiple functions.
function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	//TODO: Filter to just the written tweets
	//retrieve tweets
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	//let writtenTweet_array = [];
	let tweetIndex = 1;
	tweet_array.forEach(element => {
		if(element.written) {
			writtenTweet_array.push({
				tweetNumber: tweetIndex,
				activityType: element.activityType,
				tweet: element.writtenText
			});
			tweetIndex++;
		}
	});
	console.log('writtenTweet_array: ');
	console.log(writtenTweet_array);
	console.log('');

}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table

	//update searchText span
	//console.log('search box event');
	$('#searchText').text( $('#textFilter').val() );
	let searchText = $('#searchText').text();
	//console.log(searchText);

	//test global array
	//console.log('print global array: ');
	/*writtenTweet_array.forEach(element => {
		console.log(element);
	});*/

	//use filter on written tweet array. Filter on search text
	let filtered_Array = writtenTweet_array.filter( element => {
		if(element.tweet.includes(searchText)){
				return element;
		}

	});
	//console.log(filtered_Array);
	//update search count
	$('#searchCount').text(filtered_Array.length);

}

//Wait for the DOM to load
$(document).ready(function() {

	//bind event handler to search box
	$('#textFilter').keypress(addEventHandlerForSearch());

	loadSavedRunkeeperTweets().then(parseTweets);

});