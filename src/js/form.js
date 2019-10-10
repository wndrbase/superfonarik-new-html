
(function(checkbox){

	if(!checkbox.length) {

		return;

	}

	Array.prototype.forEach.call(checkbox, function(el){

		el.addEventListener('change', function () {

			SF.modalShow('rules');

		});

	});

})(document.querySelectorAll('.js-checkbox-rule'));

(function(btn){

	if(!btn.length) {

		return;

	}

	Array.prototype.forEach.call(btn, function(el){

		el.addEventListener('click', function () {

			var change = el.getAttribute('data-change'),
				checked = el.getAttribute('data-checked'),
				checkbox = document.querySelectorAll('.' + change);

			Array.prototype.forEach.call(checkbox, function(elem){

				elem.checked = checked == 'true';

			});

		});

	});

})(document.querySelectorAll('.js-btn-rules'));