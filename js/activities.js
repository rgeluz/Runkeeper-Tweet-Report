function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});


	//Different types of activities with Runkeeper
	let countHashMap = new Object();
	countHashMap['running'] = 0;
	countHashMap['walking'] = 0;
	countHashMap['biking'] = 0;
	countHashMap['mountain biking'] = 0;
	countHashMap['hiking'] = 0;
	countHashMap['activity'] = 0;
	countHashMap['swimming'] = 0;
	countHashMap['chair riding'] =0;
	countHashMap['skiing'] = 0;
	countHashMap['yoga'] = 0;
	tweet_array.forEach(element => {
			if(element.activityType==="running"){ countHashMap['running']++;}
			else if(element.activityType==="walking"){ countHashMap['walking']++; }
			else if(element.activityType==="biking"){ countHashMap['biking']++; }
			else if(element.activityType==="mountain biking"){ countHashMap['mountain biking']++; }	
			else if(element.activityType==="hiking"){ countHashMap['hiking']++; }
			else if(element.activityType==="activity"){ countHashMap['activity']++; }
			else if(element.activityType==="swimming"){ countHashMap['swimming']++; }
			else if(element.activityType==="chair riding"){ countHashMap['chair riding']++; }
			else if(element.activityType==="skiing"){ countHashMap['skiing']++; }
			else if(element.activityType==="yoga"){ countHashMap['yoga']++; }
	});
	//People logged most 1st, 2nd, 3rd type of activites
	//can't sort hashmap, need to convert to array
	//https://stackoverflow.com/questions/34940099/how-to-sort-a-hashmap-with-respect-to-the-value
	let activityTypeCountArray = [];
	for(let key in countHashMap){
		activityTypeCountArray.push({
				name: key,
				value: countHashMap[key]
		});
		//console.log(key);
		//console.log(countHashMap[key]);
	}
	let activityTypeCountArraySorted = activityTypeCountArray.sort( function(a, b) {
		return (a.value > b.value) ? 1: ((b.value > a.value) ? -1 : 0)
	});
	
	//get count all of the different activity types
	let differentTypeOfActivitiesCount = 0;
	activityTypeCountArraySorted.forEach(element => {
		//test sorting 
		console.log('name: ' + element.name + ' count:' + element.value);
		if(element.value>0){
			differentTypeOfActivitiesCount++;
		}
	});
	$('#numberActivities').text(differentTypeOfActivitiesCount);

	let firstActivity = "";
	let secondActivity = "";
	let thirdActivity = "";
	firstActivity = activityTypeCountArraySorted[activityTypeCountArraySorted.length-1].name;
	secondActivity = activityTypeCountArraySorted[activityTypeCountArraySorted.length-2].name;
	thirdActivity = activityTypeCountArraySorted[activityTypeCountArraySorted.length-3].name;
	//console.log(firstActivity);
	//console.log(secondActivity);
	//console.log(thirdActivity);
	$('#firstMost').text(firstActivity);
	$('#secondMost').text(secondActivity);
	$('#thirdMost').text(thirdActivity);


	//longest distance and the shortest distance

	//longest activies on 

/*

	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v4.0.0-beta.8.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": tweet_array
	  }
	  //TODO: Add mark and encoding
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when. */
}

//Wait for the DOM to load
$(document).ready(function() {
	loadSavedRunkeeperTweets().then(parseTweets);
});