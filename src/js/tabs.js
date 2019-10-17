SF.tabs = function(elems){

	function deleteSlash(str) {

		if(str.slice(-1) == '/'){

			str = str.slice(0, -1);

		}

		return str;

	}

	function popState() {

		var hash = deleteSlash(location.hash);

		PubSub.publish('tab-show' + hash, hash.slice(1));

	}

	Array.prototype.forEach.call(elems, function(tab){

		var btn = tab.querySelectorAll('.tabs__btn'),
			item = tab.querySelectorAll('.tabs__item'),
			nav = document.createElement('div');

		Array.prototype.forEach.call(btn, function(el,index){

			var _btn = document.createElement('a'),
				id = deleteSlash(el.closest('.tabs__item').getAttribute('id'));

			_btn.setAttribute('href','#' + id);

			_btn.className = 'tabs__btn h4';

			_btn.textContent = el.textContent;

			if(index == 0){

				_btn.classList.add('tabs__btn--active');

			}

			nav.appendChild(_btn);

			el.classList.add('hide');

		});

		nav.classList.add('tabs__nav');

		tab.insertBefore(nav, item[0]);

		btn = nav.querySelectorAll('.tabs__btn');

		Array.prototype.forEach.call(item, function(el){

			var id = deleteSlash(el.getAttribute('id'));

			PubSub.subscribe('tab-show#' + id, function(msg, hash){

				Array.prototype.forEach.call(item, function(el,index){

					if(el.getAttribute('id') === hash) {

						el.classList.remove('visuallyhidden');
						btn[index].classList.add('tabs__btn--active');

					}
					else{

						el.classList.add('visuallyhidden');
						btn[index].classList.remove('tabs__btn--active');

					}

				});

			});

		});

		window.addEventListener('popstate',function() {

			popState();

		});

		popState();

	});

};


if(document.querySelectorAll('.tabs').length) {

	SF.tabs(document.querySelectorAll('.tabs'));

}