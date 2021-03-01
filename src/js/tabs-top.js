
(function(tab){

	if(tab) {

		var nav = tab.querySelector('.tabs-top__nav'),
			links = nav.querySelectorAll('.tabs-top__btn')
			items = tab.querySelectorAll('.tabs-top__item');

		PubSub.subscribe('windowScroll', function(){

			for (var i = 0; i < items.length; i++) {

				if(items[i].getBoundingClientRect().bottom > nav.clientHeight){

					Array.prototype.forEach.call(links, function(el,index){

						el.classList.toggle('is-active', index === i);

					});

					break;

				}

			}

		});

	};

})(document.querySelector('.tabs-top'));