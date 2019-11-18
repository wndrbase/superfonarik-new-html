(function(videos){

	function parseMediaURL(media) {
		let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
		let url = media.src;
		let match = url.match(regexp);

		return match[1];
	}

	if(videos.length) {

		Array.prototype.forEach.call(videos, function (video) {

			var videoId = parseMediaURL(video.querySelector('img'));

			video.addEventListener('click', function (e) {

				e.preventDefault();

				var iframe = document.createElement('iframe');

				iframe.setAttribute('allowfullscreen','allowfullscreen');
				iframe.setAttribute('allow', 'autoplay');

				iframe.src = 'https://www.youtube.com/embed/' + videoId + '?rel=0&showinfo=0&autoplay=1';

				document.getElementById('modal-video').appendChild(iframe);

				SF.modalShow('video');

			});

		});

	}

})(document.querySelectorAll('.link-video'));