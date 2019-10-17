SF.tabs = function(elems){

	Array.prototype.forEach.call(elems, function(tab){

		var btn = tab.querySelectorAll('.tabs__btn'),
			item = tab.querySelectorAll('.tabs__item'),
			nav = document.createElement('div');

		Array.prototype.forEach.call(btn, function(el,index){

			nav.appendChild(el);

			el.addEventListener('click',function(){

				Array.prototype.forEach.call(btn, function(e,i){

					if(i == index) {

						e.classList.add('tabs__btn--active');
						item[i].classList.remove('visuallyhidden');

					}
					else{

						e.classList.remove('tabs__btn--active');
						item[i].classList.add('visuallyhidden');

					}

				});

			});

		});

		nav.classList.add('tabs__nav');

		tab.insertBefore(nav, item[0]);

	});

};


if(document.querySelectorAll('.tabs').length) {

	SF.tabs(document.querySelectorAll('.tabs'));

}

SF.tabsHash = function(elems){

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

		var btn = tab.querySelectorAll('.tabs-hash__btn'),
			item = tab.querySelectorAll('.tabs-hash__item'),
			nav = document.createElement('div');

		Array.prototype.forEach.call(btn, function(el){

			var _btn = document.createElement('a'),
				id = deleteSlash(el.closest('.tabs-hash__item').querySelector('.hash-detect').getAttribute('id'));

			_btn.setAttribute('href','#' + id);

			_btn.className = 'tabs-hash__btn h4';

			_btn.textContent = el.textContent;

			if(el.classList.contains('tabs-hash__btn--active')){

				_btn.classList.add('tabs-hash__btn--active');

			}

			nav.appendChild(_btn);

			el.classList.add('hide');

		});

		nav.classList.add('tabs-hash__nav');

		tab.insertBefore(nav, item[0]);

		btn = nav.querySelectorAll('.tabs-hash__btn');

		Array.prototype.forEach.call(item, function(el){

			var id = deleteSlash(el.querySelector('.hash-detect').getAttribute('id'));

			PubSub.subscribe('tab-show#' + id, function(msg, hash){

				Array.prototype.forEach.call(item, function(el,index){

					if(el.querySelector('.hash-detect').getAttribute('id') === hash) {

						el.classList.remove('visuallyhidden');
						btn[index].classList.add('tabs-hash__btn--active');

					}
					else{

						el.classList.add('visuallyhidden');
						btn[index].classList.remove('tabs-hash__btn--active');

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


if(document.querySelectorAll('.tabs-hash').length) {

	SF.tabsHash(document.querySelectorAll('.tabs-hash'));

}