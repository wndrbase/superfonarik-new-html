/*! UTF-8

© kovrigin
Все права разрешены
красивый дизайн должен иметь красивый код®

https://github.com/htmlpluscss/

*/

var SF = {};

(function(){

	SF.resizeTimeout = null,
	SF.windowWidthOLd = window.innerWidth,

	window.addEventListener("resize", function(){

		window.requestAnimationFrame(function(){

			if (!SF.resizeTimeout) {

				SF.resizeTimeout = setTimeout(function() {

					SF.resizeTimeout = null;

					if(SF.windowWidthOLd !== window.innerWidth) {

						SF.windowWidthOLd = window.innerWidth;

						PubSub.publish('windowWidthResize');

					}

				}, 100);

			}

		});

	});

	window.addEventListener("scroll", function(){

		window.requestAnimationFrame(function(){

			PubSub.publish('windowScroll');

		});

	});

	window.addEventListener("DOMContentLoaded", function(){

		PubSub.publish('DOMContentLoaded');

	});

	window.addEventListener("load", function(){

		PubSub.publish('pageLoad');

	});


	PubSub.subscribe('windowWidthResize', function(){

		setCustomProperty();

	});

	function setCustomProperty(){

		// создадим элемент с прокруткой
		var div = document.createElement('div');

		div.style.overflowY = 'scroll';
		div.style.width = '50px';
		div.style.height = '50px';

		// мы должны вставить элемент в документ, иначе размеры будут равны 0
		document.body.appendChild(div);
		var scrollWidth = div.offsetWidth - div.clientWidth;

		document.body.removeChild(div);

		// ищем первый видимый элемент
		var i = 0,
			el = document.querySelector('.main').children[i];

		while (el.offsetParent === null) {

			el = document.querySelector('.main').children[++i];

		}

		document.documentElement.style.setProperty("--widthCenter", el.clientWidth + 'px');
		document.documentElement.style.setProperty("--widthScrollBar", scrollWidth + 'px');

	}

	setCustomProperty();

	// обработчик анимаций
	SF.cssAnimation = function(a){var b,c,d=document.createElement("cssanimation");switch(a){case'animation':b={"animation":"animationend","OAnimation":"oAnimationEnd","MozAnimation":"animationend","WebkitAnimation":"webkitAnimationEnd"};break;case'transition':b={"transition":"transitionend","OTransition":"oTransitionEnd","MozTransition":"transitionend","WebkitTransition":"webkitTransitionEnd"}}for(c in b)if(d.style[c]!==undefined)return b[c]}

	// Determine if an element is in the visible viewport
	SF.isInViewport = function(element) {
		var rect = element.getBoundingClientRect();
		return (rect.top >= 0 && rect.bottom <= window.innerHeight);
	}

	// отделяем тысячи
	SF.sepNumber = function(str) {
		str = parseInt(str, 10).toString();
		return str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
	}

	// склеиваем тысячи
	SF.strToNumber = function(str) {
		return parseInt(str.replace(/\s+/g,''), 10);
	}

})();