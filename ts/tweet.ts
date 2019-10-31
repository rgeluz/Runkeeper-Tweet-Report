class Tweet {
	private text:string;
    time:Date;
    created_At:string;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
        this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
        this.created_At = tweet_time;
	}

    /*
        returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    */
    get source():string {
        let textLowerCase = this.text.toLowerCase();
        if( textLowerCase.includes('just completed') || textLowerCase.includes('just posted') ) {
            return "completed_event";
        } else if ( textLowerCase.includes('right now') ) {
            return "live_event";
        } else if ( textLowerCase.includes('set a goal') ||
                    textLowerCase.includes('met my') ||
                    textLowerCase.includes('achieved') ) {
            return "achievement";
        } else {
            return "miscellaneous"
        }
        //return "unknown";
    }

    /*
        extract hyperlink in tweettext
        regex (http|https|ftp):\/\/([^\s]+)
    */
    get link():string {
        let linkArray;
        let linkArrayString:string = "";
        linkArray = this.tweet_text.match(/(http|https|ftp):\/\/([^\s]+)/g);
        if(linkArray!=null){
            linkArray.forEach(element=> {
                linkArrayString+=element.toString();
            });
        }
        return linkArrayString;
    }

    /* 
        wrap hyperlinke string with an anchor tag
    */
    get linkWithAnchorTag():string {
        let linkString = this.link;
        let formattedlink = '<a href="' +linkString+ '">'  +linkString+'</a>';
        return formattedlink;
    }

    /*
        get tweet text
    */
    get tweet_text():string {
        return this.text;
    }

    /*
        the takes all hyperlinks within the text
        and wraps them with an anchor tag to make the hyperlink clickable.
    */
    get tweet_textWithClickableHyperlinks():string {
        let tweet_text = this.tweet_text;
        let linkString = this.link;
        let linkWithAnchorTag = this.linkWithAnchorTag;
        let formatted_text = "";

        //convert hyperlinks into clickable hyperlinks
        formatted_text = tweet_text.replace(linkString, linkWithAnchorTag);

        return formatted_text;
    }

    /*
        returns a boolean, whether the text includes any content written by the person tweeting.
    */
    get written():boolean {
        //TODO: identify whether the tweet is written
        let textLowerCase = this.text.toLowerCase();
        if( textLowerCase.includes(' - ') ) {
            return true;
        }
        return false;
    }

    /*
        returns the user written text portion of the tweet
    */
    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //let userWrittenText = this.text.substr(0, this.text.indexOf(' - '));
        let userWrittenText = this.text.substring( this.text.indexOf(' - '), this.text.indexOf('https') );
        return userWrittenText;
        //return "";
    }

    /*
        get activity type for completed event
    */
    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
        let textLowerCase = this.text.toLowerCase();
        //need to differentiate between "run" and "ski run" to get accurate counts
        if( textLowerCase.includes( ' run ' ) ) {  
            if( !textLowerCase.includes( ' ski ' )) {
                return "running"; 
            } else if ( textLowerCase.includes( 'ski run ' )) {
                return "skiing";
            }
        }
        else if( textLowerCase.includes( ' walk ' ) ) { return "walking"; }
        //need to differentiate between "bike" and "mtn bike" to get accurate counts
        else if( textLowerCase.includes( ' bike ' ) ) {           
            if( !textLowerCase.includes( ' mtn ' )) {
                return "biking"; 
            } else if ( textLowerCase.includes( ' mtn bike ' )) {
                return "mountain biking";
            }
        }
        else if( textLowerCase.includes( ' hike ' ) ) { return "hiking"; }
        else if( textLowerCase.includes( ' mi activity ' ) || 
                 textLowerCase.includes( ' km activity ' ) ) { return "activity"; }
        else if( textLowerCase.includes( ' swim ' ) ) { return "swimming"; }
        else if( textLowerCase.includes( ' chair ride ' ) ) { return "chair riding"; }
        else if( textLowerCase.includes( ' yoga ') ){ return "yoga"; }
        else if( textLowerCase.includes( ' workout' ) ) {
            /*if( textLowerCase.includes('strength') ) {
                return "strength workout";
            } else if( textLowerCase.includes('elliptical')) {
                return "elliptical workout";
            } else if( textLowerCase.includes('crossfit')) {
                return "crossfit workout";
            } else if( textLowerCase.includes('spinning')) {
                return "spinning workout";
            } else if( textLowerCase.includes('bootcamp')) {
                return "bootcomap workout";
            }*/
            return "workout";
        } else if( textLowerCase.includes( ' freestyle ' ) ) { return "freestyle"; }

        return "";
    }

    /*
        get distance of activity
        //tested regex pattern at https://regex101.com
        regex: 
            (?<= a )(.*?)(?= mi )
            (?<=a )(.*?)(?= km )

    */
    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        let distanceArray;
        let distanceString: string ="";
        if(this.text.includes( ' mi ' )) {
            /**/distanceArray = this.text.match(/(?<= a )(.*?)(?= mi )/g);
            if(distanceArray!=null) {
                distanceArray.forEach(element => {
                    if(element!=null){
                        distanceString += element.toString();
                    }
                });
            }
            let miles = parseFloat(distanceString);
            let milesString: string = miles.toFixed(2);
            let milesDecimal = parseFloat(milesString);
            return milesDecimal;
        } else if (this.text.includes( ' km ' )) {
            distanceArray = this.text.match(/(?<=a )(.*?)(?= km )/g);
            if(distanceArray!=null) {
                distanceArray.forEach(element => {
                    if(element!=null){
                        distanceString += element.toString();
                    }
                });
            }
            //convert kilometers to miles
            let kilometers = parseFloat(distanceString);
            let miles = kilometers/1.609;
            let milesString: string = miles.toFixed(2);
            let milesDecimal = parseFloat(milesString);
            return milesDecimal;
        }
        return 0;
    }

    /*
        get dayType, either weekend or weekday
    */
    get dayType():string {
        if(this.created_At.includes( 'Sat ') || 
           this.created_At.includes( 'Sun ' )) {
                return "weekend";
        } else if (this.created_At.includes( 'Mon ') || 
                this.created_At.includes( 'Tue ') ||
                this.created_At.includes( 'Wed ') ||
                this.created_At.includes( 'Thu ') ||
                this.created_At.includes( 'Fri ') ) {
                return "weekday";
        }
        return "";
    }

    /*
        get the day from the tweet text
    */
    get day():string {
        if(this.created_At.includes( 'Sat' )) {
            return "Sat";
        } else if(this.created_At.includes( 'Sun ' )) {
            return "Sun";
        } else if(this.created_At.includes( 'Mon ' )) {
            return "Mon";
        } else if(this.created_At.includes( 'Tue ' )) {
            return "Tue";
        } else if(this.created_At.includes( 'Wed ' )) {
            return "Wed";
        } else if(this.created_At.includes( 'Thu ' )) {
            return "Thu";
        } else if(this.created_At.includes( 'Fri ' )) {
            return "Fri";
        }  
        return "";

    }

    /*
        Did not implement this method. I decided to implement other functions. See above.
    */
    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}