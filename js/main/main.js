$(".button-collapse").sideNav();

$('.m-label-count').hover(function() {
	$('#linkP').removeClass('black-text');
	$('#linkP').addClass('white-text');
}, function() {
	$('#linkP').removeClass('white-text');
	$('#linkP').addClass('black-text');
});

chrome.storage.local.get('user_account', function(result) {

	const uri = 'https://instagram.com/';
	let insta = new mLayerJs(result.user_account);
	let username = result.user_account;

	$.get(uri, function(data) {

		data = data.match(/sharedData = {(.*?)};/g);
		data = data[0].match(/"entry_data":{"(.*?)":/g);
		data = data[0].replace(/"entry_data":{"(.*?)":/g, '$1');

		if (data === 'LandingPage' && username != null && username != undefined && result.user_account != '') {

			$('.m-label-count > a').text('Fazer login');

			$('.m-label-count').hover(function() {
				$('#linkP').removeClass('black-text');
				$('#linkP').addClass('white-text');
				$('#linkP').attr('href', uri+'accounts/login/');
				$('#linkP').attr('title', 'Fazer login');
				$('#icon-m').text('launch');
			}, function() {
				$('#linkP').removeClass('white-text');
				$('#linkP').addClass('black-text');
				$('#linkP').attr('href', '');
				$('#icon-m').text('');
			});

		}else if (data != 'LandingPage' && result.user_account != null && result.user_account != undefined && result.user_account != ''){

			insta.totalMedia('.pub');
			insta.followers('.flw');
			insta.follow('.fwg');
			insta.userName('.m-label-count > a');
			insta.profilePicSmall('.m-image-p > img', 'graph_src');

			let ctx2 = document.getElementById('myChart2').getContext('2d');

			let chart = new Chart(ctx2, {
				type: 'doughnut',
				data: {
					labels: ['Seguidores', 'Seguindo', 'Publicações'],
					datasets: [{
						data: [10, 20, 30],
						backgroundColor: ['rgba(255, 61, 0, 0.50)', 'rgba(33, 150, 243, 0.50)', 'rgba(211, 47, 47, 0.50)'],
						borderColor: ['rgba(255, 61, 0, 0.85)', 'rgba(33, 150, 243, 0.85)', 'rgba(211, 47, 47, 0.85)'],
						borderWidth: 1
					}]
				}
			});

			$('.m-label-count').hover(function() {
				let textUser = $(this).text();
				textUser = textUser.replace(/@(.*?)/g, '$1');
				$('#linkP').removeClass('black-text');
				$('#linkP').addClass('white-text');
				$('#linkP').attr('href', 'https://instagram.com/'+textUser);
				$('#linkP').attr('title', 'Acessar perfil');
				$('#icon-m').text('launch');
			}, function() {
				$('#linkP').removeClass('white-text');
				$('#linkP').addClass('black-text');
				$('#linkP').attr('href', '');
				$('#icon-m').text('');
			});
		}
	});
});

var ctx = document.getElementById('myChart').getContext('2d');

chrome.storage.local.get(['follow_chart', 'like_chart'], function(result) {

	let myChart = new Chart(ctx, {
	    type: 'line',
	    data: {
	        labels: ['Dom','Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
	        datasets: 
	        [{
	        	label: 'Seguiu',
	            data: result.follow_chart,
	            backgroundColor: [
	                'transparent'
	            ],
	            borderColor: [
	                'rgba(255, 61, 0, 0.85)'
	            ],
	            borderWidth: 1
	        },{
	        	label: 'Curtiu',
	        	data: result.like_chart,
	        	backgroundColor: [
	        		'transparent'
	        	],
	        	borderColor: [
	        		'rgba(33, 150, 243, 0.85)'
	        	],
	        	borderWidth: 1
	        }]
	    }
	});

	let week = new Date();
	let week_day = week.getDay();

	$('.m-big-fv').text(result.like_chart[week_day]);
	$('.m-flw-c').text(' '+result.follow_chart[week_day]+' ');
});

