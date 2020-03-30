(function(infomess){

	if(infomess) {

		infomess.querySelector('.infomess__close').addEventListener('click', function () {

			infomess.style.marginTop = '-' + infomess.clientHeight + 'px';

			Cookies.set('BITRIX_SM_infomessCookie', infomess.getAttribute('data-time'));

			setTimeout(function(){

				infomess.classList.add('hide');

			},3000);

		});

	}

})(document.querySelector('.infomess'));