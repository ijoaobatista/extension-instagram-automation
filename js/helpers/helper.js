$(".button-collapse").sideNav();
$('.collapsible').collapsible();

$('#general-questions').click(function(event) {
	$('.button-collapse').sideNav('hide');
});

$('#extension-features').click(function(event) {
	$('.button-collapse').sideNav('hide');
});

$('#settings-features').click(function(event) {
	$('.button-collapse').sideNav('hide');
});

$('#other-solution').click(function(event) {
	$('.button-collapse').sideNav('hide');
});

$('#mail-send').click(function(event) {
	var data = {
		mail: 'support@mjobi.com',
		subject: 'MJobi Suporte | Extensão Chrome',
		body: ''
	};
	$(this).attr('href', 'mailto:'+data.mail+'?subject='+data.subject+'&body='+data.body+'');
});

