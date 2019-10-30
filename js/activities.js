function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	//retrieve tweets
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//Different types of activities with Runkeeper
	let activityTypeHashMap = new Object();
	activityTypeHashMap['running'] = { count: 0, total_distance: 0 };
	activityTypeHashMap['walking'] = { count: 0, total_distance: 0 };
	activityTypeHashMap['biking'] = { count: 0, total_distance: 0 };
	activityTypeHashMap['mountain biking'] = { count: 0, total_distance: 0 };
	activityTypeHashMap['hiking'] = { count: 0, total_distance: 0 };
	activityTypeHashMap['activity'] = {count: 0, total_distance: 0 };
	activityTypeHashMap['swimming'] = { count: 0, total_distance: 0 };
	activityTypeHashMap['chair riding'] = { count: 0, total_distance: 0 };
	activityTypeHashMap['skiing'] = { count: 0, total_distance: 0 };
	activityTypeHashMap['yoga'] = { count: 0, total_distance: 0 };

	
	//get activity type counts and total distance
	tweet_array.forEach(element => {
			if(element.activityType==="running"){ 
				activityTypeHashMap['running'].count++;
				activityTypeHashMap['running'].total_distance+=element.distance;
			}
			else if(element.activityType==="walking"){ 
				activityTypeHashMap['walking'].count++; 
				activityTypeHashMap['walking'].total_distance+=element.distance;
			}
			else if(element.activityType==="biking"){ 
				activityTypeHashMap['biking'].count++;
				activityTypeHashMap['biking'].total_distance+=element.distance;
			}
			else if(element.activityType==="mountain biking"){ 
				activityTypeHashMap['mountain biking'].count++;
				activityTypeHashMap['mountain biking'].total_distance+=element.distance;
			}	
			else if(element.activityType==="hiking"){ 
				activityTypeHashMap['hiking'].count++;
				activityTypeHashMap['hiking'].total_distance+=element.distance;
			}
			else if(element.activityType==="activity"){ 
				activityTypeHashMap['activity'].count++;
				activityTypeHashMap['activity'].total_distance+=element.distance;
			}
			else if(element.activityType==="swimming"){ 
				activityTypeHashMap['swimming'].count++;
				activityTypeHashMap['swimming'].total_distance+=element.distance;
			}
			else if(element.activityType==="chair riding"){ 
				activityTypeHashMap['chair riding'].count++;
				activityTypeHashMap['chair riding'].total_distance+=element.distance;
			}
			else if(element.activityType==="skiing"){ 
				activityTypeHashMap['skiing'].count++;
				activityTypeHashMap['skiing'].total_distance+=element.distance;
			}
			else if(element.activityType==="yoga"){ 
				activityTypeHashMap['yoga'].count++;
				activityTypeHashMap['yoga'].total_distance+=element.distance;
			}
	});


	//People logged most 1st, 2nd, 3rd type of activites
	//can't sort hashmap, need to convert to array
	//https://stackoverflow.com/questions/34940099/how-to-sort-a-hashmap-with-respect-to-the-value
	let activityTypeArray = [];
	for(let key in activityTypeHashMap){
		activityTypeArray.push({
				activity: key,
				count: activityTypeHashMap[key].count,
				totalDistance: activityTypeHashMap[key].total_distance
		});
		console.log('key:' + key);
		console.log('activityTypeHashMap['+key+']:');
		console.log(activityTypeHashMap[key]);
	}
	console.log('');

	//sort array by count //sort is in ascending order (small-->large)
	let activityTypeArraySortedByCount = activityTypeArray.sort( function(a, b) {
		return (a.count > b.count) ? 1: ((b.count > a.count) ? -1 : 0)
	});
	console.log('activityTypeArraySortedByCount: ');
	console.log(activityTypeArraySortedByCount);
	console.log('');
	
	//get count of all of the different activity types
	let differentTypeOfActivitiesCount = 0;
	activityTypeArraySortedByCount.forEach(element => {
		//test sorting 
		console.log('activity: ' + element.activity + ' count:' + element.count);
		if(element.count>0){
			differentTypeOfActivitiesCount++;
		}
	});
	console.log('differentTypeOfActivitiesCount: ' + differentTypeOfActivitiesCount);
	$('#numberActivities').text(differentTypeOfActivitiesCount);
	console.log('');

	//get the top three activies //array is sorted in ascending order, so the largest values are at the end of the array
	let firstActivity = "";
	let secondActivity = "";
	let thirdActivity = "";
	firstActivity = activityTypeArraySortedByCount[activityTypeArraySortedByCount.length-1].activity;
	secondActivity = activityTypeArraySortedByCount[activityTypeArraySortedByCount.length-2].activity;
	thirdActivity = activityTypeArraySortedByCount[activityTypeArraySortedByCount.length-3].activity;
	console.log('first activity: ' + firstActivity);
	console.log('second activity: ' + secondActivity);
	console.log('third activity: ' + thirdActivity);
	$('#firstMost').text(firstActivity);
	$('#secondMost').text(secondActivity);
	$('#thirdMost').text(thirdActivity);
	console.log('');

	//longest distance and the shortest distance
	//will take the average distance of each of the top three activities
	let firstActivityAvg = 0.0;
	let secondActivityAvg = 0.0;
	let thirdActivityAvg = 0.0;
	firstActivityAvg = parseFloat( (activityTypeArraySortedByCount[activityTypeArraySortedByCount.length-1].totalDistance / activityTypeArraySortedByCount[activityTypeArraySortedByCount.length-1].count).toFixed(2) );

	secondActivityAvg = parseFloat( (activityTypeArraySortedByCount[activityTypeArraySortedByCount.length-2].totalDistance / activityTypeArraySortedByCount[activityTypeArraySortedByCount.length-2].count).toFixed(2) );

	thirdActivityAvg = parseFloat( (activityTypeArraySortedByCount[activityTypeArraySortedByCount.length-3].totalDistance / activityTypeArraySortedByCount[activityTypeArraySortedByCount.length-3].count).toFixed(2) );
	console.log('first activity avg: ' + firstActivityAvg);
	console.log('second activity avg: ' + secondActivityAvg);
	console.log('third activity avg: ' + thirdActivityAvg);
	console.log('');

	//store top three activities into a hashmap
	let topThreeActivityHashMap = new Object();
	topThreeActivityHashMap['firstActivity'] = { activity: firstActivity, averageDistance: firstActivityAvg };
	topThreeActivityHashMap['secondActivity'] = { activity: secondActivity, averageDistance: secondActivityAvg };
	topThreeActivityHashMap['thirdActivity'] = { activity: thirdActivity, averageDistance: thirdActivityAvg };

	//can't sort hashmap, need to convert to array
	//https://stackoverflow.com/questions/34940099/how-to-sort-a-hashmap-with-respect-to-the-value
	let topThreeActivityArray = [];
	for(let key in topThreeActivityHashMap){
		topThreeActivityArray.push({
				activity: topThreeActivityHashMap[key].activity,
				averageDistance: topThreeActivityHashMap[key].averageDistance
		});
	}

	//then sort array by average distance in ascending order (small->large)
	let topThreeActivityArraySortedByAvgDistance = topThreeActivityArray.sort( function(a, b) {
		return (a.averageDistance > b.averageDistance) ? 1: ((b.averageDistance > a.averageDistance) ? -1 : 0)
	});
	console.log('topThreeActivityArraySortedByAvgDistance:');
	console.log(topThreeActivityArraySortedByAvgDistance);
	
	let activityWithTheLongestAvgDistance = topThreeActivityArraySortedByAvgDistance[topThreeActivityArraySortedByAvgDistance.length-1].activity;	//first element of array has smallest value
	let activityWithTheShortestAvgDistance = topThreeActivityArraySortedByAvgDistance[topThreeActivityArraySortedByAvgDistance.length-3].activity; //last element of array has largest value
	console.log('activity with the longest avg: ' + activityWithTheLongestAvgDistance);
	console.log('activity with the shortest avg: ' + activityWithTheShortestAvgDistance);
	$('#longestActivityType').text(activityWithTheLongestAvgDistance);
	$('#shortestActivityType').text(activityWithTheShortestAvgDistance);
	console.log('');

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
	console.log('activity with the longest distance: ' + activityWithTheLongestAvgDistance + ', weekend/weekday counts: ')
	console.log('weekdayCount: ' + weekdayCount);
	console.log('weekendCount: ' + weekendCount);
	if(weekdayCount>weekendCount){
		$('#weekdayOrWeekendLonger').text('weekdays');
		console.log('people tend to do their longest activities on weekdays');
	} else {
		$('#weekdayOrWeekendLonger').text('weekends');
		console.log('people tend to do their longest activities on weekends');
	}

	/*
		//vega-lite Plots for data visualization

	*/


	//create data for graphs below (vega-lite), just for the top three categories
	//for each of the top three activity types, the day and duration will be included.
	let dayOfWeekArray = [];
	console.log('tweet_array.length: ' + tweet_array.length);
	tweet_array.forEach(element => {
		if((element.activityType===firstActivity) || 
		(element.activityType===secondActivity) ||
		(element.activityType===thirdActivity) ){
			dayOfWeekArray.push({
				activity: element.activityType,
				day: element.day,
				distance: element.distance
			});
		}
	});	
	//console.log('dayOfWeekArray: ');
	//console.log(dayOfWeekArray);
	//
	console.log('dayOfWeekArray.length: ' + dayOfWeekArray.length);
	console.log('');


	
	//first graph: A plot of how many of each type of activity exists in the dataset.
	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v4.0.0-beta.8.json",
		"description": "A graph of the number of Tweets containing each type of activity.",
		"width": 400,
		"height": 200, 
	  "data": {
			//"values": tweet_array
			"values": activityTypeArray
	  },
		//TODO: Add mark and encoding
		"mark": "bar",
		"encoding": {
			"x": {"field": "activity", "type": "ordinal"},
			"y": {"field": "count", "type": "quantitative"}
		}
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});
	

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when. 

	//second graph: A plot of the distances by day of the week for all of the three most tweeted-about activities. 
	distance_vis_spec = {
		"$schema": "https://vega.github.io/schema/vega-lite/v4.0.0-beta.8.json",
		"description": "A graph of the number of Tweets containing each type of activity.",
		"width": 400,
		"height": 200, 
	  "data": {
			//"values": tweet_array
			"values": dayOfWeekArray
	  },
		"mark": "point",
		"encoding": {
			"x": {
				"field": "day",
				"type": "ordinal",
				"sort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
				"axis": {"title": "day of the week"}
			},
			"y": {
				"field": "distance",
				"type": "quantitative"
			},
			"color": {
				"field": "activity",
				"type": "nominal",
				"scale": {
					"domain": ["running","walking","biking"],
					"range": ["#e7ba52", "#c7c7c7", "#aec7e8"]
				},
				"legend": {"title": "Activity Type"}
			}
		}
	};
	vegaEmbed('#distanceVis', distance_vis_spec, {actions:false});

	//third graph: A plot of the distances by day of the week for all of the three most tweeted-about activities, aggregating the activities by the mean.
	distance_vis_aggregated = {
		"$schema": "https://vega.github.io/schema/vega-lite/v4.0.0-beta.8.json",
		"description": "A graph of the number of Tweets containing each type of activity.",
		"width": 400,
		"height": 200, 
	  "data": {
			//"values": tweet_array
			"values": dayOfWeekArray
	  },
		"mark": "point",
		"encoding": {
			"x": {
				"field": "day",
				"type": "ordinal",
				"sort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
				"axis": {"title": "day of the week"}
			},
			"y": {
				"field": "distance",
				"aggregate": "average",
				"type": "quantitative"
			},
			"color": {
				"field": "activity",
				"type": "nominal",
				"scale": {
					"domain": ["running","walking","biking"],
					"range": ["#e7ba52", "#c7c7c7", "#aec7e8"]
				},
				"legend": {"title": "Activity Type"}
			}
		}
	};
	vegaEmbed('#distanceVisAggregated', distance_vis_aggregated, {actions:false});


}



//Wait for the DOM to load
$(document).ready(function() {
	loadSavedRunkeeperTweets().then(parseTweets);

	/*
		event handler for button using jQuery
	*/
	//$("#distanceVis").hide();
	$("#distanceVisAggregated").hide();
	$("#aggregate").click(function(event) {
		console.log("clicked button!");
		var elem = $(event.target);
		if (elem.text()=="Show means") {
			elem.text("Show all activities");
			$("#distanceVis").hide();
			$("#distanceVisAggregated").show();
		} else if (elem.text()=="Show all activities") {
			elem.text("Show means");
			$("#distanceVis").show();
			$("#distanceVisAggregated").hide();
		}
	});

});