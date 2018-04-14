function timer() {
	//timer
	let deadline = '2018-04-20'

	function getTimeRemaining(endtime) {
		let t = Date.parse(endtime) - Date.parse(new Date());
		seconds = 0,
		minutes = 0,
		hours = 0;
			if(t > 0){
							seconds = Math.floor( (t/1000) % 60 ), 
							minutes = Math.floor( (t/1000/60) % 60),
							hours = Math.floor( (t/1000/60/60) );
							if(hours < 10) hours = '0'+hours;
			        if(minutes < 10) minutes = '0'+minutes;
			        if(seconds < 10) seconds = '0'+seconds;
						}


		return {
			'total' : t,
			'hours' : hours,
			'minutes' : minutes,
			'seconds' : seconds
		};
	};

	function setClock(id, endtime) {
		let timer = document.getElementById(id),
				hours = timer.querySelector('.hours'),
				minutes = timer.querySelector('.minutes'),
				seconds = timer.querySelector('.seconds');

				function updateClock() {
					let t = getTimeRemaining(endtime);
					hours.innerHTML = t.hours;
					minutes.innerHTML = t.minutes;
					seconds.innerHTML = t.seconds;

					if (t.total <= 0) {
						clearInterval(timeInterval);
					}
				};
				updateClock();
				let timeInterval = setInterval(updateClock, 1000);

	};

	setClock('timer', deadline)
}

module.exports = timer;