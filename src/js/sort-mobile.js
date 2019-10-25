
(function(select){

	if(!select) {

		return;

	}

	Array.prototype.forEach.call(select, function(el){

		el.addEventListener('change', function() {

			location.assign(el.value);

		});

	});

})(document.querySelectorAll('.sort-mobile__select'));