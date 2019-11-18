SF.swiper = function(swiperContainer){

	Array.prototype.forEach.call(swiperContainer, function(swipe){

		var mySwipe = null,
			toggleSwipe = null,
			resetSwipe = null,
			swipeControls = document.createElement('div'),
			swipeNav = document.createElement('div'),
			swipeBtns = document.createElement('div'),
			swipeNext = document.createElement('button'),
			swipePrev = document.createElement('button'),
			items = swipe.querySelectorAll('.swiper-slide'),
			count = items.length,
			initialSlide = swipe.getAttribute('data-start-slide') ? parseInt(swipe.getAttribute('data-start-slide')) : 0,
			param = {
				loop: true,
				preloadImages: false,
				pagination: {
					clickable: true,
					bulletElement: 'button',
					bulletClass: 'button',
					bulletActiveClass: 'is-active',
					el: swipeNav
				},
				navigation: {
					nextEl: swipeNext,
					prevEl: swipePrev
				},
				autoplay: {
					delay: 996000
				}
			},
			gallery = swipe.classList.contains('swiper-container--gallery'),
			related = swipe.classList.contains('swiper-container--related'),
			carousel = swipe.classList.contains('swiper-container--carousel'),
			homeSlider = swipe.classList.contains('swiper-container--home-slider'),
			product = swipe.classList.contains('swiper-container--product');

		swipeNav.className = 'swiper-pagination';
		swipeControls.className = 'swiper-controls';

		swipeBtns.className = 'swiper-navigation';
		swipePrev.className = 'swiper-button-prev button';
		swipeNext.className = 'swiper-button-next button';

		swipePrev.innerHTML = '<svg width="19" height="24" viewBox="0 0 19 24"><path d="M12.528,23.999 L18.272,18.488 L11.243,12.706 L18.272,5.512 L12.529,-0.000 L-0.002,11.998 L12.528,23.999 Z"/></svg>';
		swipeNext.innerHTML = '<svg width="19" height="24" viewBox="0 0 19 24"><path d="M6.471,0.001 L0.728,5.511 L7.756,11.294 L0.728,18.487 L6.470,23.999 L19.001,12.000 L6.471,0.001 Z"/></svg>';

		swipeBtns.appendChild(swipePrev);
		swipeBtns.appendChild(swipeNext);
		swipeControls.appendChild(swipeBtns);
		swipeControls.appendChild(swipeNav);
		swipe.parentNode.appendChild(swipeControls);

		resetSwipe = function(){

			if(mySwipe) {

				mySwipe.destroy(false,true);
				mySwipe = undefined;

			}

		}

		resetSwipe();

		if (homeSlider) {

			swipeControls.classList.add('center');

			toggleSwipe = function() {

				console.log('homeSlider');

				new Swiper(swipe, param);
				toggleSwipe = null;

			}

		}

		if (related) {

			param.loopFillGroupWithBlank = true;

			swipeNav.classList.add('hide');
			swipeNext.classList.add('hide');
			swipePrev.classList.add('hide');

			toggleSwipe = function() {

				resetSwipe();

				swipeNav.classList.add('hide');
				swipeNext.classList.add('hide');
				swipePrev.classList.add('hide');

				swipe.parentNode.classList.remove('swiper-container-style');

				if (count > 4 && window.innerWidth >= 1200) {

					swipe.parentNode.classList.add('swiper-container-style');
					swipeNext.classList.remove('hide');
					swipePrev.classList.remove('hide');

					param.slidesPerView = 4;
					param.slidesPerGroup = 4;
					param.spaceBetween = 48;
					mySwipe = new Swiper(swipe, param);

				}
				else if (count > 3 && window.innerWidth < 1200 &&  window.innerWidth >= 768) {

					swipe.parentNode.classList.add('swiper-container-style');
					swipeNext.classList.remove('hide');
					swipePrev.classList.remove('hide');

					param.slidesPerView = 3;
					param.slidesPerGroup = 3;
					param.spaceBetween = 20;
					mySwipe = new Swiper(swipe, param);

				}
				else if (count > 2 && window.innerWidth < 768) {

					swipe.parentNode.classList.add('swiper-container-style');
					swipeNav.classList.remove('hide');

					param.slidesPerView = 2;
					param.slidesPerGroup = 2;
					param.spaceBetween = 10;
					mySwipe = new Swiper(swipe, param);

				}

			}

		}

		if (carousel) {

			param.autoHeight = false;
			param.slidesPerView = 3;
			param.slidesPerGroup = 3;
			param.spaceBetween = 59;
			param.loopFillGroupWithBlank = true;
			param.loopAdditionalSlides = 1;
			param.breakpoints = {
				320: {
					slidesPerView: 1,
					slidesPerGroup: 1,
					spaceBetween: 0
				},
				768: {
					slidesPerView: 3,
					slidesPerGroup: 3,
					spaceBetween: 20
				},
				1200: {
					spaceBetween: 59
				}
			};

			toggleSwipe = function() {

				console.log('carousel')

				new Swiper(swipe, param);
				toggleSwipe = null;

			}

		}

		if (product) {

			param.autoplay = false;

			toggleSwipe = function() {

				console.log('product')

				new Swiper(swipe, param);
				toggleSwipe = null;

			}

		}

		if (gallery) {

			toggleSwipe = function() {

				if(!mySwipe) {

					console.log('gallery')

					mySwipe = new Swiper(swipe, {
						loop: true,
						initialSlide: initialSlide,
						navigation: {
							nextEl: swipeNext,
							prevEl: swipePrev
						}
					});

				}

			}

		}

		PubSub.subscribe('windowWidthResize', function(){

			if (window.Swiper && toggleSwipe) {

				toggleSwipe();

			}

		});

		if(window.Swiper && toggleSwipe) {

			toggleSwipe();

		}
		else {

			PubSub.subscribe('swiperJsLoad', toggleSwipe);

		}

		if(!SF.swiper.init) {

			SF.swiper.init = true;

			var script = document.createElement('script');

			script.type = 'text/javascript';
			script.async = true;
			script.src = '/js/swiper.min.js';

			script.onload = function () {

				PubSub.publish('swiperJsLoad');

			};

			document.head.appendChild(script);

		}

	});

};

if(document.querySelector('.swiper-container')) {

	SF.swiper(document.querySelectorAll('.swiper-container'));

}