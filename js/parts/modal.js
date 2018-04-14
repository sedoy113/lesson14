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