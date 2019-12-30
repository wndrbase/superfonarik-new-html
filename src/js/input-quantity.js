/*(function(quantity){

	if(quantity.length) {

		Array.prototype.forEach.call(quantity, function(el){

			var up = el.querySelector('.input-quantity__plus'),
				down = el.querySelector('.input-quantity__minus'),
				input = el.querySelector('.input-quantity__input'),
				value = parseInt(input.value);

			up.addEventListener('click',function(){

				value++;
				input.value = value;

			});

			down.addEventListener('click',function(){

				value--;

				if(value < 1) {

					value = 1;

				}

				input.value = value;

			});

			input.addEventListener('focus',function(){

				setTimeout(function(){

					input.setSelectionRange(0,9);

				},100);

			});

			input.addEventListener('keydown',function(e){

				if (e.keyCode == 13) {

					e.preventDefault();
					this.blur();

				}

			});

			input.addEventListener('keyup',function(){

				value = this.value.replace(/[^\d]/g, '');

				this.value = value;

			});

			input.addEventListener('blur',function(){

				var val = parseInt(this.value);

				if (isNaN(val) || val === 0) {

					value = 1;
					this.value = value;

				}

			});

		});

	}

})(document.querySelectorAll('.input-quantity'));*/