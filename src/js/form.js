
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

// уведомить

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

// купить в 1 клик
(function(forms){

	if(!forms.length) {

		return;

	}

	Array.prototype.forEach.call(forms, function(form){

		form.addEventListener('submit', function (e) {

			e.preventDefault();

			document.querySelector('#popup_one_click-buy').value = form.getAttribute('data-id');

			SF.modalShow('one-click-buy');

		});

	});

})(document.querySelectorAll('.js-modal-one-click-buy'));


// предзаказ
(function(forms){

	if(!forms.length) {

		return;

	}

	Array.prototype.forEach.call(forms, function(form){

		form.addEventListener('submit', function (e) {

			e.preventDefault();

			document.querySelector('#popup_pre_order').value = form.getAttribute('data-id');

			SF.modalShow('pre-order');

		});

	});

})(document.querySelectorAll('.js-modal-pre-order'));