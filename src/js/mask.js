SF.mask = function(elems){

	if(!elems.length) {

		return;

	}

	if (typeof Inputmask === 'undefined') {

		var script = document.createElement('script');

		script.type = 'text/javascript';
		script.async = true;
		script.src ='/js/inputmask.min.js';

		script.onload = function () {

			Inputmask.extendDefaults({
				oncomplete: function () {
					/*console.log('complete');*/
					this.classList.add('inputmask--complete');
				},
				onincomplete: function () {
					/*console.log('incomplete');*/
					this.classList.remove('inputmask--complete');
				},
				oncleared: function () {
					/*console.log('cleared');*/
				},
				onKeyValidation: function(key, result){
					/*console.log(key, result);*/
				}
			});

			setMask();

		};

		setTimeout(function(){

			document.head.appendChild(script);

		}, 3000);

	} else {

		setMask();

	}

	function setMask() {

		Array.prototype.forEach.call(elems, function(el){

			if(el.classList.contains('inputmask--phone')) {

				var maskInput = new Inputmask({
					mask: "+7 999 999 99 99",
					showMaskOnHover: false,
					placeholder: "+7 ___ ___ __ __"
				});

			}
			else if(el.classList.contains('inputmask--date')) {

				var maskInput = new Inputmask({
					alias: "datetime",
					showMaskOnHover: false,
					inputFormat: "dd.mm.yyyy",
					placeholder: "дд.мм.гггг"
				});

			}
			else if(el.classList.contains('inputmask--currency')) {

				var maskInput = new Inputmask({
					alias: "integer",
					suffix: ' рублей',
					groupSize: 3,
					autoGroup: true,
					groupSeparator: ' ',
					rightAlign: false
				});

			}
			else {

				var maskInput = new Inputmask(el.getAttribute('data-mask'));

			}

			maskInput.mask(el);

		});

	}

};

SF.mask(document.querySelectorAll('.inputmask'));