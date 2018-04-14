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