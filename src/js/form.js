
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

(function(forms){

	if(!forms.length) {

		return;

	}

	Array.prototype.forEach.call(forms, function(form){

		form.addEventListener('submit', function (e) {

			e.preventDefault();

			document.querySelector('#popup_notify_url').value = form.getAttribute('data-url');

			SF.modalShow('notify');

		});

	});

})(document.querySelectorAll('.js-modal-notify'));