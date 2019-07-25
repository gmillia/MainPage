/*
Illia Shershun

Timer class -> takes in the minutes and starts counting down. 

TODO: Possible separate start to call additional function, add Resume function
*/

class Timer
{
	constructor(minutes, seconds, halves)
	{
		this.initialMins = minutes;
		this.minutes = minutes;
		this.seconds = seconds;
		this.handle = 0;
		this.finish = 0;
		this.isRunning = false;
		this.halves = halves;
		this.currHalf = 1;
	}

	start()
	{	
		this.minutes = Number(this.minutes);
		this.seconds = Number(this.seconds);
		this.isRunning = true;
		var fnsh = new Date();
		fnsh.setMinutes(fnsh.getMinutes() + this.minutes);
		fnsh.setSeconds(fnsh.getSeconds() + this.seconds);
		fnsh= new Date(fnsh).getTime();
		this.finish = fnsh;
		
		var self = this;
		
		this.handle = setInterval(function() 
		{
		    // Get today's date and time
		    var now = new Date().getTime();
		    
		    // Find the distance between now and the count down date
		    var distance = fnsh - now;
		    
		    //Stops the timer if time ran out 
			if(self.minutes <= 0 && self.seconds <= 0) 
			{ 
				self.stop();

				if($(".play").hasClass('playing'))
				{
					$(".play").removeClass('playing');
					$(".play").toggleClass('active');
				}

				if(self.currHalf < self.halves)
				{
					self.currHalf++;
					$(".timer-mins-input")[0].value = self.initialMins;
					$(".half")[0].innerHTML = "2nd";
					self.minutes = self.initialMins;
				}
			}

		    if(self.isRunning)
		    {
		    	self.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		    	self.seconds = Math.floor((distance % (1000 * 60)) / 1000);
			}
			
			if(self.minutes < 10)
				self.minutes = "0" + self.minutes;
			
			if(self.seconds < 10)
				self.seconds = "0" + self.seconds;
		    
		    document.getElementsByClassName('timer-mins-input')[0].value = self.minutes;
		    document.getElementsByClassName('timer-secs-input')[0].value= self.seconds;

		}, 1000);		
	}

	stop()
	{
		//alert(this.minutes + ":" + this.seconds)
		this.isRunning = false;
		this.minutes = this.minutes;
		this.seconds = this.seconds;
		clearInterval(this.handle)
	}

	/*
	Helper function that gets called when half finishes and there is 2nd half ahead
	*/
	reset()
	{

	}
}
