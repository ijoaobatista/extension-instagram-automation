const DEFAULT = {
	'installed': true,
	'inite': true,
	'widget': true,
	'no-click': false,
	'feed': true,
	'explore': true,
	'explore-people': true,
	'location': false,
	'hashtags': false,
	'follow': true,
	'followers': true,
	'stories': false,
	'time_inite': 10,
	'inite_alert': true,
	'widget_position': 'bottom_left',
	'feed_transition': 5000,
	'feed_reload': 300000,
	'marge_count': '5-',
	'follow_day': 400,
	'my_location': [
		{'url': '/explore/locations/213088733/brasilia-brazil/'},
		{'url': '/explore/locations/213163910/sao-paulo-brazil/'}
	],
	'my_hashtags': [
		{'tag': '#google'},
		{'tag': '#facebook'},
		{'tag': '#instagram'},
		{'tag': '#lifestyle'}
	],
	'follow_chart': [0,0,0,0,0,0,0],
	'like_chart': [0,0,0,0,0,0,0],
	'user_account': null
};

chrome.runtime.onInstalled.addListener(function() {
	chrome.tabs.create({active: true, url: '/main.html'}, function(tab) {
		setDefaultConfig();
	});
});

chrome.browserAction.onClicked.addListener(function() {
	chrome.tabs.create({active: true, url: '/main.html'}, function(tab) {
		setDefaultConfig();
	});
});

