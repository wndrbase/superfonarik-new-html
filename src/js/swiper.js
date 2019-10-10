SF.swiper = function(swiperContainer){

	Array.prototype.forEach.call(swiperContainer, function(swipe){

		var mySwipe = null,
			resizeTimeout = null,
			windowWidthOLd = null,
			toggleSwipe = null,
			resetSwipe = null,
			swipeControls = document.createElement('div'),
			swipeNav = document.createElement('div'),
			swipeBtns = document.createElement('div'),
			swipeNext = document.createElement('button'),
			swipePrev = document.createElement('button'),
			items = swipe.querySelectorAll('.swiper-slide'),
			count = items.length,
			param = {
				loop: true,
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
					delay: 6000
				}
			},
			carousel = swipe.classList.contains('swiper-container--carousel'),
			homeSlider = swipe.classList.contains('swiper-container--home-slider');

		swipeNav.className = 'swiper-pagination';
		swipeControls.className = 'swiper-controls center';

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
				mySwipe = new Swiper(swipe, param);

			}

		}

		if (carousel) {

			param.autoHeight = false;
			param.slidesPerView = 3;
			param.slidesPerGroup = 3;
			param.spaceBetween = 59;
			param.loopFillGroupWithBlank = true;

			toggleSwipe = function() {

		//		resetSwipe();

/*				swipeNav.classList.remove('hide');
				swipeNext.classList.remove('hide');
				swipePrev.classList.remove('hide');*/

				mySwipe = new Swiper(swipe, param);

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

		if(!SF.swiper.init) {

			SF.swiper.init = true;

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

	SF.swiper(document.querySelectorAll('.swiper-container'));

}