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