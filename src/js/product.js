(function(imgBlock){

	if(imgBlock) {

		var gallery = document.querySelector('#modal-gallery');

		function galleryInit(big){

			if(document.querySelector('#gallery-product')) {

				// если несколько изображений

				var view = {
						"img": []
					},
					template = document.querySelector('#gallery-template').innerHTML,
					items = document.querySelectorAll('#gallery-product .swiper-slide'),
					index = big.closest('.swiper-slide').getAttribute('data-swiper-slide-index');

				if(gallery.querySelector('.swiper-container--gallery')){

					galleryOpen(index);

					return;

				}

				items.forEach(function(item){

					var i = parseInt(item.getAttribute('data-swiper-slide-index')),
						link = item.querySelector('.product__img-link');

					view.img[i] = {
						"img1x" : link.getAttribute('data-img1x'),
						"img2x" : link.getAttribute('data-img2x'),
						"webp1x" : link.getAttribute('data-webp1x'),
						"webp2x" : link.getAttribute('data-webp2x')
					};

				});

				gallery.innerHTML = Mustache.render(template, view);

				gallery.querySelector('.swiper-container--gallery').setAttribute('data-start-slide', index);

				SF.swiper(gallery.querySelectorAll('.swiper-container--gallery'));

			}
			else {

				// только одно изображение

				var template = document.querySelector('#gallery-template').innerHTML;

				var view = {
					"img1x" : big.getAttribute('data-img1x'),
					"img2x" : big.getAttribute('data-img2x'),
					"webp1x" : big.getAttribute('data-webp1x'),
					"webp2x" : big.getAttribute('data-webp2x')
				};

				gallery.innerHTML = Mustache.render(template, view);

			}

		}

		function galleryOpen(index){

			gallery.querySelector('.swiper-container--gallery').swiper.slideToLoop(parseInt(index), 0);

		}

		imgBlock.addEventListener('click', function(e){

			e.preventDefault();

			if(window.innerWidth < 768) {

				return;

			}

			var big = e.target.closest('.product__img-link');

			if(big) {

				SF.modalShow('gallery');

				if(window.Swiper) {

					galleryInit(big);

				}
				else {

					PubSub.subscribe('swiperJsLoad', function(){

						galleryInit(big);

					});

				}

				return;

			}

			var preview = e.target.closest('[data-preview]');

			if(preview && document.querySelector('.swiper-container--product').swiper) {

				document.querySelector('.swiper-container--product').swiper.slideToLoop(parseInt(preview.getAttribute('data-preview')));

			}

		});

	}

})(document.querySelector('.product__img'));

// scroll

(function(nav){

	if(nav) {

		var links = nav.querySelectorAll('a'),
			blocks = [],
			active = 0;

		Array.prototype.forEach.call(links, function (a) {

			var href = a.getAttribute('href'),
				b = document.querySelector(href);

			if(b) {

				blocks.push(b);

			}

/*			a.addEventListener('click', function(e){

				e.preventDefault();

				history.pushState(null, null, href);

				window.scrollTo(0, b.getBoundingClientRect().top + window.pageYOffset - nav.clientHeight);

			});
*/
		});

		PubSub.subscribe('windowScroll', function(){

			nav.classList.toggle('product__nav--fixed', nav.getBoundingClientRect().top <= 0);

			var _active = 0;

			blocks.forEach(function(block, index){

				if(block.getBoundingClientRect().top < 1){

					_active = index;

				}

			});

			if (active != _active) {

				active = _active;

				Array.prototype.forEach.call(links, function (a,i) {

					a.classList.toggle('is-active', i == active);

				});

			}

		});

	}

})(document.querySelector('.product__nav'));


// js-img-modal
(function(items){

	if(items.length) {

		Array.prototype.forEach.call(items, function(el){

			el.addEventListener('click', function(e) {

				e.preventDefault();

				var img = document.createElement('img'),
					photo = document.querySelector('#modal-photo');

				img.src = el.getAttribute('href');

				photo.innerHTML = '';
				photo.appendChild(img);

				SF.modalShow('photo');

			});

		});

	}

})(document.querySelectorAll('.js-img-modal'));
