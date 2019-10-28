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
	let activityTypeHashMap = new Object();
	activityTypeHashMap['running'] = { count: 0, distance: 0 };
	activityTypeHashMap['walking'] = { count: 0, distance: 0 };
	activityTypeHashMap['biking'] = { count: 0, distance: 0 };
	activityTypeHashMap['mountain biking'] = { count: 0, distance: 0 };
	activityTypeHashMap['hiking'] = { count: 0, distance: 0 };
	activityTypeHashMap['activity'] = {count: 0, distance: 0 };
	activityTypeHashMap['swimming'] = { count: 0, distance: 0 };
	activityTypeHashMap['chair riding'] = { count: 0, distance: 0 };
	activityTypeHashMap['skiing'] = { count: 0, distance: 0 };
	activityTypeHashMap['yoga'] = { count: 0, distance: 0 };


	tweet_array.forEach(element => {
			if(element.activityType==="running"){ 
				activityTypeHashMap['running'].count++;
				activityTypeHashMap['running'].distance+=element.distance;
			}
			else if(element.activityType==="walking"){ 
				activityTypeHashMap['walking'].count++; 
				activityTypeHashMap['walking'].distance+=element.distance;
			}
			else if(element.activityType==="biking"){ 
				activityTypeHashMap['biking'].count++;
				activityTypeHashMap['biking'].distance+=element.distance;
			}
			else if(element.activityType==="mountain biking"){ 
				activityTypeHashMap['mountain biking'].count++;
				activityTypeHashMap['mountain biking'].distance+=element.distance;
			}	
			else if(element.activityType==="hiking"){ 
				activityTypeHashMap['hiking'].count++;
				activityTypeHashMap['hiking'].distance+=element.distance;
			}
			else if(element.activityType==="activity"){ 
				activityTypeHashMap['activity'].count++;
				activityTypeHashMap['activity'].distance+=element.distance;
			}
			else if(element.activityType==="swimming"){ 
				activityTypeHashMap['swimming'].count++;
				activityTypeHashMap['swimming'].distance+=element.distance;
			}
			else if(element.activityType==="chair riding"){ 
				activityTypeHashMap['chair riding'].count++;
				activityTypeHashMap['chair riding'].distance+=element.distance;
			}
			else if(element.activityType==="skiing"){ 
				activityTypeHashMap['skiing'].count++;
				activityTypeHashMap['chair riding'].distance+=element.distance;
			}
			else if(element.activityType==="yoga"){ 
				activityTypeHashMap['yoga'].count++;
				activityTypeHashMap['yoga'].distance+=element.distance;
			}
	});
	//People logged most 1st, 2nd, 3rd type of activites
	//can't sort hashmap, need to convert to array
	//https://stackoverflow.com/questions/34940099/how-to-sort-a-hashmap-with-respect-to-the-value
	let activityTypeArray = [];
	for(let key in activityTypeHashMap){
		activityTypeArray.push({
				name: key,
				count: activityTypeHashMap[key].count,
				totalDistance: activityTypeHashMap[key].distance
		});
		//console.log(key);
		//console.log(activityTypeHashMap[key]);
	}
	//sort array by count
	let activityTypeArraySortedByCount = activityTypeArray.sort( function(a, b) {
		return (a.count > b.count) ? 1: ((b.count > a.count) ? -1 : 0)
	});
	console.log(activityTypeArraySortedByCount);
	
	//get count all of the different activity types
	let differentTypeOfActivitiesCount = 0;
	activityTypeArraySortedByCount.forEach(element => {
		//test sorting 
		console.log('name: ' + element.name + ' count:' + element.count);
		if(element.count>0){
			differentTypeOfActivitiesCount++;
		}
	});
	$('#numberActivities').text(differentTypeOfActivitiesCount);

	//get the top three activies
	let firstActivity = "";
	let secondActivity = "";
	let thirdActivity = "";
	firstActivity = activityTypeArraySortedByCount[activityTypeArraySortedByCount.length-1].name;
	secondActivity = activityTypeArraySortedByCount[activityTypeArraySortedByCount.length-2].name;
	thirdActivity = activityTypeArraySortedByCount[activityTypeArraySortedByCount.length-3].name;
	console.log('first activity: ' + firstActivity);
	console.log('second activity: ' + secondActivity);
	console.log('third activity: ' + thirdActivity);
	$('#firstMost').text(firstActivity);
	$('#secondMost').text(secondActivity);
	$('#thirdMost').text(thirdActivity);


	//longest distance and the shortest distance
	let firstActivityAvg = 0.0;
	let secondActivityAvg = 0.0;
	let thirdActivityAvg = 0.0;
	firstActivityAvg = parseFloat( (activityTypeArraySortedByCount[activityTypeArraySortedByCount.length-1].totalDistance / activityTypeArraySortedByCount[activityTypeArraySortedByCount.length-1].count).toFixed(2) );

	secondActivityAvg = parseFloat( (activityTypeArraySortedByCount[activityTypeArraySortedByCount.length-2].totalDistance / activityTypeArraySortedByCount[activityTypeArraySortedByCount.length-2].count).toFixed(2) );

	thirdActivityAvg = parseFloat( (activityTypeArraySortedByCount[activityTypeArraySortedByCount.length-3].totalDistance / activityTypeArraySortedByCount[activityTypeArraySortedByCount.length-3].count).toFixed(2) );

	console.log('first activity avg: ' + firstActivityAvg);
	console.log('second activity avg: ' + secondActivityAvg);
	console.log('third activity avg: ' + thirdActivityAvg);

	let topThreeActivityHashMap = new Object();
	topThreeActivityHashMap['firstActivity'] = { name: firstActivity, averageDistance: firstActivityAvg };
	topThreeActivityHashMap['secondActivity'] = { name: secondActivity, averageDistance: secondActivityAvg };
	topThreeActivityHashMap['thirdActivity'] = { name: thirdActivity, averageDistance: thirdActivityAvg };

	//can't sort hashmap, need to convert to array
	//https://stackoverflow.com/questions/34940099/how-to-sort-a-hashmap-with-respect-to-the-value
	let topThreeActivityArray = [];
	for(let key in topThreeActivityHashMap){
		topThreeActivityArray.push({
				name: topThreeActivityHashMap[key].name,
				averageDistance: topThreeActivityHashMap[key].averageDistance
		});
		//console.log(key);
		//console.log(activityTypeHashMap[key]);
	}
	let topThreeActivityArraySortedByAvgDistance = topThreeActivityArray.sort( function(a, b) {
		return (a.averageDistance > b.averageDistance) ? 1: ((b.averageDistance > a.averageDistance) ? -1 : 0)
	});
	console.log(topThreeActivityArraySortedByAvgDistance);
	
	let activityWithTheLongestAvgDistance = topThreeActivityArraySortedByAvgDistance[topThreeActivityArraySortedByAvgDistance.length-1].name;	//first element of array has smallest value
	let activityWithTheShortestAvgDistance = topThreeActivityArraySortedByAvgDistance[topThreeActivityArraySortedByAvgDistance.length-3].name; //last element of array has largest value
	console.log('activity with the longest avg: ' + activityWithTheLongestAvgDistance);
	console.log('activity with the shortest avg: ' + activityWithTheShortestAvgDistance);
	$('#longestActivityType').text(activityWithTheLongestAvgDistance);
	$('#shortestActivityType').text(activityWithTheShortestAvgDistance);

	//longest activies on either  weekday or weekend 
	let weekdayCount = 0;
	let weekendCount = 0;
	tweet_array.forEach(element => { 
		if(element.activityType===activityWithTheLongestAvgDistance) {
			if(element.dayType==="weekday") {
				weekdayCount++;
			} else if (element.dayType==="weekend") {
				weekendCount++;
			}
		}
	}); 
	console.log('weekdayCount: ' + weekdayCount);
	console.log('weekendCount: ' + weekendCount);
	if(weekdayCount>weekendCount){
		$('#weekdayOrWeekendLonger').text('weekdays');
	} else {
		$('#weekdayOrWeekendLonger').text('weekends');
	}




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
	*/

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when. 
}

//Wait for the DOM to load
$(document).ready(function() {
	loadSavedRunkeeperTweets().then(parseTweets);
});