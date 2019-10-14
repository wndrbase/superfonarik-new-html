
(function(items){

	if(!items.length) {

		return;

	}

	Array.prototype.forEach.call(items, function(el){

		var btn = el.querySelector('.more-slide__btn'),
			box = el.querySelector('.more-slide__box'),
			inner = el.querySelector('.more-slide__inner');

		btn.addEventListener('click', function () {

			var h = inner.clientHeight;


			if(btn.classList.contains('is-open')) {

				h = 0;
				box.classList.remove('is-open');

			}

			box.style.height = h + 'px';

			btn.classList.toggle('is-open');

		});


		box.addEventListener(SF.cssAnimation('transition'),function(){

			if(btn.classList.contains('is-open')) {

				box.classList.add('is-open');

			}

		});

	});

})(document.querySelectorAll('.more-slide'));