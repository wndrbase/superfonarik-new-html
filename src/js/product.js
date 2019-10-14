(function(imgBlock){

	if(imgBlock) {

		imgBlock.addEventListener('click', function(e){

			var big = e.target.closest('.product__img-link');

			if(big) {

				e.preventDefault();
				SF.modalShow('gallery');

				var view = {
						"img": []
					},
					gallery = document.querySelector('#modal-gallery'),
					template = document.querySelector('#gallery-template').innerHTML,
					items = document.querySelectorAll('#gallery-product .swiper-slide'),
					index = big.closest('.swiper-slide').getAttribute('data-swiper-slide-index');

				if(gallery.querySelector('.swiper-container--gallery')){

					gallery.querySelector('.swiper-container--gallery').swiper.slideToLoop(parseInt(index), 0);

					return;

				}

				items.forEach(function(item){

					var i = parseInt(item.getAttribute('data-swiper-slide-index')),
						src = item.querySelector('.product__img-link').getAttribute('href');

					view.img[i] = src;

				});

				gallery.innerHTML = Mustache.render(template, view);

				gallery.querySelector('.swiper-container--gallery').setAttribute('data-start-slide', index);

				SF.swiper(gallery.querySelectorAll('.swiper-container--gallery'));

				return;

			}

			var preview = e.target.closest('[data-preview]');

			if(preview) {

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

		window.addEventListener("scroll", function(){

			window.requestAnimationFrame(function(){

				nav.classList.toggle('product__nav--fixed', nav.getBoundingClientRect().top <= 0);

				var _active = 0;

				blocks.forEach(function(block, index){

					if(block.getBoundingClientRect().top <= 0){

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

		});

	}

})(document.querySelector('.product__nav'));