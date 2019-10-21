
	document.addEventListener('click', function (e) {

		if(e.target.closest('.btn-menu-toggle') || e.target.classList.contains('menu-show')){

			if(SF.OpenMenu) {

				document.body.classList.remove('menu-show');

				window.scrollTo(0,SF.windowScrollOld);

				SF.OpenMenu = false;

			}
			else {

				SF.OpenMenu = true;

				// записываем значение скролла страницы
				SF.windowScrollOld = window.pageYOffset;
				window.scrollTo(0,0);

				document.body.classList.add('menu-show');

			}

		}

	});