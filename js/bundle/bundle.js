(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
window.addEventListener('DOMContentLoaded', function() {

	let tab = require('../parts/tab.js');
	let slider = require('../parts/slider.js');
	let scroll = require('../parts/scroll.js');
	let modal = require('../parts/modal.js');
	let calc = require('../parts/calc.js');
	let ajax = require('../parts/ajax.js');
	let timer = require('../parts/timer.js');

	tab();
	slider();
	scroll();
	modal();
	calc();
	ajax();
	timer();

});



},{"../parts/ajax.js":2,"../parts/calc.js":3,"../parts/modal.js":4,"../parts/scroll.js":5,"../parts/slider.js":6,"../parts/tab.js":7,"../parts/timer.js":8}],2:[function(require,module,exports){
function ajax() {
	//Form
	let message = new Object();
	message.loading = 'Loading....';
	message.success = 'ok';
	message.failure = 'Error 500';

	let form = document.getElementsByClassName('main-form')[0];
	let form2 = document.getElementById('form');
	let input = form.getElementsByTagName('input');
	let statusMessage = document.createElement('div');
			statusMessage.classList.add('status');

			//действие на отправку данных
		form.addEventListener('submit', sendForm);
		form2.addEventListener('submit', sendForm); 
		
		function sendForm(event) {
			event.preventDefault();
			this.appendChild(statusMessage);

			//AJAX
			let request = new XMLHttpRequest();
			request.open("POST", 'server.php');

			request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

			let formData = new FormData(form);

			request.send(formData);

			request.onreadystatechange = function() {
				if (request.readyState < 4) {
					statusMessage.innerHTML = message.loading;
				} else if (request.readyState === 4) {
						if (request.status == 200 && request.status < 300) {
							statusMessage.innerHTML = message.success;
							//Можно добавить любой контент на страницу
						}
						else {
							statusMessage.innerHTML = message.failure;
						}
				}
			}
			//Чистим инпуты
			for (let i = 0; i < input.length; i++) {
				input[i].value = '';
			}
		}
}
module.exports = ajax;
},{}],3:[function(require,module,exports){
function calc() {
	//calc
		let persons = document.getElementsByClassName('counter-block-input')[0];
		let restDays = document.getElementsByClassName('counter-block-input')[1];
		let place = document.getElementById('select');
		let totalValue = document.getElementById('total');
		let personsSum = 0;
		let daysSum = 0;
		let total = 0;

			totalValue.innerHTML = 0;

			persons.addEventListener('change', function() {
				personsSum = +this.value;
				total = (daysSum + personsSum)*4000;
				if (restDays.value == '' || restDays.value <= 0) {
					totalValue.innerHTML = 0;
				} else {
					totalValue.innerHTML = total;
				}
			});
			restDays.addEventListener('change', function() {
				daysSum = +this.value;
				total = (daysSum + personsSum)*4000;
				if (persons.value == '' || persons.value <= 0) {
					totalValue.innerHTML = 0;
				} else {
					totalValue.innerHTML = total;
				}
			});

			place.addEventListener('change', function() {
				if (restDays.value === '' || persons.value === '') {
					totalValue.innerHTML = 0;
				}
				if (restDays.value <= 0 || persons.value <= 0) {
					totalValue.innerHTML = 0;
				}else {
					let a = total;									 
						totalValue.innerHTML = a * this.options[this.selectedIndex].value;
				}
			});
}

module.exports = calc;
},{}],4:[function(require,module,exports){
function modal() {
	//Modal
	let more = document.querySelector('.more'),
	    description = document.querySelector('.description-btn'),
	    overlay = document.querySelector('.overlay'),
	    close = document.querySelector('.popup-close');
	    
	more.addEventListener('click', function() {
	    this.classList.add('more-splash');
	    overlay.style.display = "block";
	    document.body.style.overflow = 'hidden';
	});
	close.addEventListener('click', function() {
	    more.classList.remove('more-splash');
	    overlay.style.display = "none";
	    document.body.style.overflow = '';
	});
	description.addEventListener('click', function() {
	    this.classList.add('more-splash');
	    overlay.style.display = "block";
	    document.body.style.overflow = 'hidden';
	});
	close.addEventListener('click', function() {
	    description.classList.remove('more-splash');
	    overlay.style.display = "none";
	    document.body.style.overflow = '';
	});
}

module.exports = modal;
},{}],5:[function(require,module,exports){
function scroll() {
	//scroll my

	let linkNav = document.querySelectorAll('[href^="#"]'), 
	    x = 0.5; 
		for (var i = 0; i < linkNav.length; i++) {
		    linkNav[i].addEventListener('click', function(e) { 
		        e.preventDefault();
		        var w = window.pageYOffset,  
		            hash = this.href.replace(/[^#]*(.*)/, '$1'); 
		        t = document.querySelector(hash).getBoundingClientRect().top, 
		            start = null;
		        requestAnimationFrame(step);  

	        function step(time) {
	            if (start === null) start = time;
	            var progress = time - start,
	                r = (t < 0 ? Math.max(w - progress/x, w + t) : Math.min(w + progress/x, w + t));
	            window.scrollTo(0,r);
	            if (r != w + t) {
	                requestAnimationFrame(step)
	            } else {
	                location.hash = hash
	            }
	        }
	    }, false);
	}
}

module.exports = scroll;
},{}],6:[function(require,module,exports){
function slider() {
	//slider
		let slideIndex = 1;
		let slides = document.getElementsByClassName('slider-item');
		let prev = document.querySelector('.prev');
		let next = document.querySelector('.next');
		let dotsWrap = document.querySelector('.slider-dots');
		let dots = document.getElementsByClassName('dot');

			showSlides(slideIndex);

				function showSlides(n) {
					if (n > slides.length) {
						slideIndex = 1;
					};
					if (n < 1) {
						slideIndex = slides.length;
					};
					//скрываеи слайды
					for (let i = 0; i < slides.length; i++) {
						slides[i].style.display = 'none';
					};
					//убираем класс активности с точки
					for (let i = 0; i < dots.length; i++) {
						dots[i].classList.remove('dot-active');
					};
					slides[slideIndex - 1].style.display = 'block';
					dots[slideIndex - 1].classList.add('dot-active');
				}
				//приводим все в движение
				function plusSlides (n) {
					showSlides(slideIndex += n)
				}

				function currentSlide(n) {
					showSlides(slideIndex = n)
				}

				prev.addEventListener('click', function() {
					plusSlides(-1);
				});
				next.addEventListener('click', function() {
					plusSlides(1);
				});

				dotsWrap.addEventListener('click', function(event) {
					for (let i = 0; i < dots.length + 1; i++) {
							if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
								currentSlide(i);
							}
					}
				});
}

module.exports = slider;
},{}],7:[function(require,module,exports){
function tab() {
	let tab = document.getElementsByClassName('info-header-tab'),
			tabContent = document.getElementsByClassName('info-tabcontent'),
			info = document.getElementsByClassName('info-header')[0];
			

	function hideTabContent(a) {
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');

		}
	}
	hideTabContent(1)

	function showTabContent(b) {
		if (tabContent[b].classList.contains('hide')) {
			hideTabContent(0);
			tabContent[b].classList.remove('hide');
			tabContent[b].classList.add('show');
		}
	}

	info.addEventListener('click', function(event) {
		let target = event.target;
		if(target.className == 'info-header-tab' ) {
				for (let i = 0; i < tab.length; i++) {
					if (target == tab[i]) {
						showTabContent(i);
						break;
					}
				}
		};
	});
}

module.exports = tab;
},{}],8:[function(require,module,exports){
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
},{}]},{},[1]);
