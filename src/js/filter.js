(function (filter) {

	// slider-range

	var sliderRange = document.querySelectorAll('.slider-range');

	if(sliderRange.length) {

		// загрузка скрипта

		var script = document.createElement('script');

		script.type = 'text/javascript';
		script.async = true;
		script.src = '/js/nouislider.min.js';

		script.onload = function () {

			SF.sliderRangeInit(sliderRange);

		};

		document.head.appendChild(script);

	}

})(document.querySelector('.filter'));


// инициализация слайдеров

SF.sliderRangeInit = function(elems){

	Array.prototype.forEach.call(elems, function(el){

		var min = parseInt(el.getAttribute('data-min'), 10),
			max = parseInt(el.getAttribute('data-max'), 10),
			minInputHidden = el.querySelector('.slider-range__value-min'),
			maxInputHidden = el.querySelector('.slider-range__value-max'),
			start = el.getAttribute('data-start'),
			input = el.querySelectorAll('.slider-range__input-control .input'),
			inputMin = el.querySelector('.slider-range__input-min'),
			inputMax = el.querySelector('.slider-range__input-max'),
			track = el.querySelector('.slider-range__track');

		if(start) {

			start = start.split(',');
			start = start.map(function(el){

				return parseInt(el, 10);

			});

		}
		else {

			start = [min, max];

		}

		noUiSlider.create(track, {
			start: start,
			connect: true,
			range: {
				'min': min,
				'max': max
			}
		});

		track.noUiSlider.on('slide', function(values){

			inputMin.value = SF.sepNumber(parseInt(values[0], 10));
			inputMax.value = SF.sepNumber(parseInt(values[1], 10));

		});

		// create and dispatch the event
		var event = new CustomEvent("change", {
			detail: {
				hazcheeseburger: true
			}
		});

		track.noUiSlider.on('update', function(values){

			minInputHidden.value = parseInt(values[0], 10);
			maxInputHidden.value = parseInt(values[1], 10);

			minInputHidden.dispatchEvent(event);
			maxInputHidden.dispatchEvent(event);

		});


	// события в инпутах

		Array.prototype.forEach.call(input, function(el){

			el.addEventListener('focus', function() {

				setTimeout(function(){

					el.setSelectionRange(0,99);

				},100);

			});

			el.addEventListener('input', function(e) {

				var _min = parseInt(inputMin.value, 10),
					_max = parseInt(inputMax.value, 10);

				if (e.keyCode == 13) {

					el.blur();
					e.preventDefault();

				}

				if (_min < min) {

					_min = min;
					this.value = min;

				}

				if (_max > max) {

					_max = max;
					this.value = max;

				}

				if(_min < _max) {

					track.noUiSlider.set([_min, _max]);

				}

			});

		});

	// reset
		PubSub.subscribe('filterFormReset', function(){

			track.noUiSlider.reset();

		});

	});
/*
	PubSub.subscribe('windowWidthResize', function(){



	});*/

};

// мобильный фильтр

(function(btn){

	if(btn) {

		btn.addEventListener('click', function(){

			document.body.classList.add('filter-show');

			var mainTop = document.querySelector('.main').getBoundingClientRect().top;

			if(mainTop < 0) {

				window.scrollTo(0, window.pageYOffset + mainTop);

			}

		});

		document.querySelector('.js-close-filter').addEventListener('click', function(){

			document.body.classList.remove('filter-show');

		});

	}

})(document.querySelector('.js-open-filter'));

// reset

(function (form) {

	if(form) {

		form.addEventListener('reset', function(){
console.log('reset')
			PubSub.publish('filterFormReset');

		});

	}

})(document.querySelector('.filter__form'));