BF.swiper = function(swiperContainer){

	Array.prototype.forEach.call(swiperContainer, function(swipe){

		var mySwipe = null,
			resizeTimeout = null,
			windowWidthOLd = null,
			toggleSwipe = null,
			resetSwipe = null,
			swipeNav = document.createElement('div'),
			swipeNext = document.createElement('button'),
			swipePrev = document.createElement('button'),
			items = swipe.querySelectorAll('.swiper-slide'),
			count = items.length,
			carousel = swipe.classList.contains('swiper-container--carousel'),
			homeSlider = swipe.classList.contains('swiper-container--home-slider');

		swipeNav.className = 'swiper-pagination';
		swipePrev.className = 'swiper-button-prev button';
		swipeNext.className = 'swiper-button-next button';

		swipePrev.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16"><path d="M9.95 14.05L5.046 9.142H16V6.857H5.045L9.95 1.951 8.335.335.67 8l7.665 7.665z"/></svg>';
		swipeNext.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16"><path d="M6.05 14.05l4.905-4.907H0V6.857h10.955L6.05 1.951 7.665.335 15.33 8l-7.665 7.665z"/></svg>';

		swipe.appendChild(swipeNav);
		swipe.parentNode.appendChild(swipeNext);
		swipe.parentNode.appendChild(swipePrev);

		resetSwipe = function(){

			if(mySwipe) {

				mySwipe.destroy(false,true);
				mySwipe = undefined;

			}

/*			swipeNav.classList.add('hide');
			swipeNext.classList.add('hide');
			swipePrev.classList.add('hide');
*/
		}

		resetSwipe();

		if (homeSlider) {

			toggleSwipe = function() {

		//		resetSwipe();

/*				swipeNav.classList.remove('hide');
				swipeNext.classList.remove('hide');
				swipePrev.classList.remove('hide');
*/
				mySwipe = new Swiper(swipe, {
					loop: true,
					pagination: {
						clickable: true,
						el: swipeNav
					},
					navigation: {
						nextEl: swipeNext,
						prevEl: swipePrev
					}
				});

			}

		}

		if (carousel) {

			toggleSwipe = function() {

		//		resetSwipe();

/*				swipeNav.classList.remove('hide');
				swipeNext.classList.remove('hide');
				swipePrev.classList.remove('hide');*/

				mySwipe = new Swiper(swipe, {
					loop: true,
					autoHeight: false,
					slidesPerView: 3,
					spaceBetween: 30,
					slidesPerGroup: 3,
					loopFillGroupWithBlank: true,
					pagination: {
						clickable: true,
						el: swipeNav
					},
					navigation: {
						nextEl: swipeNext,
						prevEl: swipePrev
					}
				});

			}

		}
/*
		if (faq) {

			toggleSwipe = function() {

				resetSwipe();

				// удаляем/добавляем классы, чтобы не переопределять стили, когда свайп отключен
				swipe.parentNode.classList.toggle('swiper-container-style', window.innerWidth < 768);

				if (window.innerWidth < 768) {

					Array.prototype.forEach.call(swipe.querySelectorAll('.faq__visuallyhidden'), function(el){

						el.classList.remove('visuallyhidden');

					});

					swipeNext.classList.remove('hide');
					swipePrev.classList.remove('hide');

					mySwipe = new Swiper(swipe, {
						loop: true,
						autoHeight: true,
						navigation: {
							nextEl: swipeNext,
							prevEl: swipePrev
						}
					});

				}
				else {

					Array.prototype.forEach.call(swipe.querySelectorAll('.faq__visuallyhidden'), function(el){

						el.classList.add('visuallyhidden');

					});

				}

			}

		}
*/
		window.addEventListener("resize", function(){

			window.requestAnimationFrame(function(){

				if (window.Swiper && !resizeTimeout) {

					resizeTimeout = setTimeout(function() {

						resizeTimeout = null;

						if(window.innerWidth != windowWidthOLd){

							windowWidthOLd = window.innerWidth;

							toggleSwipe();

						}

					}, 1000);

				}

			});

		});

		if(window.Swiper) {

			toggleSwipe();

		}

		if(!BF.swiper.init) {

			BF.swiper.init = true;

			setTimeout(function(){

				var script = document.createElement('script');

				script.type = 'text/javascript';
				script.async = true;
				script.src = '/js/swiper.min.js';

				script.onload = function () {

					var event = new Event('resize');
					window.dispatchEvent(event);

				};

				document.head.appendChild(script);

			},3000);

		}

	});

};

if(document.querySelector('.swiper-container')) {

	BF.swiper(document.querySelectorAll('.swiper-container'));

}