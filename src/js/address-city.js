
(function(bar){

	if(bar) {

		var maps = document.querySelectorAll('.address__map'),
			links = bar.querySelectorAll('.btn');

		PubSub.subscribe('windowScroll', function(){

			for (var i = 0; i < maps.length; i++) {

				if(maps[i].getBoundingClientRect().top > 0){

					Array.prototype.forEach.call(links, function(el,index){

						el.closest('.btn').classList.toggle('is-active', index === i);

					});

					break;

				}

			}

		});

	};

})(document.querySelector('.address__city'));


(function(shops){

	if(shops.length) {

		document.querySelector('.address').addEventListener('click', function (e) {

			var btn = e.target.closest('[data-shop]');

			if(btn) {

				var placemark = btn.getAttribute('data-shop');

				PubSub.publish('addressShop', placemark);

			}

		});

	};

})(document.querySelectorAll('.address-shop'));