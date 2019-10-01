/*

(function(){

// input-box

	var inputLabel = document.querySelectorAll('.input-box__input');

	function focusInputLabel(el){

		el.parentNode.classList.toggle('input-box--no-empty', el.value);

	}

	if(inputLabel.length) {

		Array.prototype.forEach.call(inputLabel, function(el){

			el.addEventListener('focus', function() {

				focusInputLabel(el);

			});

			el.addEventListener('keyup', function() {

				focusInputLabel(el);

			});

			el.addEventListener('blur', function() {

				focusInputLabel(el);

			});

			focusInputLabel(el);

			setTimeout(function(){

				focusInputLabel(el);

			},1000);

		});

	}

})();
*/