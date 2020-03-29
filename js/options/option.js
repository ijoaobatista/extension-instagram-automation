// Materialize inites
$(".button-collapse").sideNav();
$('.collapsible').collapsible();

// Modules check
let elementsStored = [
	'inite',
	'widget',
	'no-click',
	'feed',
	'explore',
	'explore-people',
	'location',
	'hashtags',
	'follow',
	'followers',
	'stories'
];

// Setting elements swipe check
$.each(elementsStored, function(index, val) {
	chrome.storage.local.get(val, function(result) {
		$.map(result, function(item, index) {
			$('#'+val).attr('checked', item);
		});
	});
});

chrome.storage.local.get('user_account', function(result) {

	let uri = 'https://instagram.com/';
	let insta = new mLayerJs(result.user_account);

	$.get(uri, function(data) {

		data = data.match(/sharedData = {(.*?)};/g);
		data = data[0].match(/"entry_data":{"(.*?)":/g);
		data = data[0].replace(/"entry_data":{"(.*?)":/g, '$1');

		// Check if you are logged in
		if (data === 'LandingPage' && result.user_account != null && result.user_account != undefined && result.user_account != '') {

			$('#edit-c').text('Fazer login');
			$('#user-n').text('Você não está logado');

		}else if (data != 'LandingPage' && result.user_account != null && result.user_account != undefined && result.user_account != ''){

			$('.user-c').remove();
			insta.userName('#user-n');
			insta.userName('#useraccount');
			insta.profilePicSmall('.img-p', 'graph_src');
		}

	});

});

$('#inite').click(function(event) {
	let check = $(this).prop('checked');
	console.log(check);
	// Store action
	storedata({'inite': check});
});

$('#widget').click(function(event) {
	let check = $(this).prop('checked');
	console.log(check);
	// Store action
	storedata({'widget': check});
});

$('#no-click').click(function(event) {
	let check = $(this).prop('checked');
	console.log(check);
	// Store action
	storedata({'no-click': check});
});

$('#feed').click(function(event) {
	let check = $(this).prop('checked');
	console.log(check);
	// Store action
	storedata({'feed': check});
});

$('#explore').click(function(event) {
	let check = $(this).prop('checked');
	console.log(check);
	// Store action
	storedata({'explore': check});
});

$('#explore-people').click(function(event) {
	let check = $(this).prop('checked');
	console.log(check);
	// Store action
	storedata({'explore-people': check});
});

$('#location').click(function(event) {
	let check = $(this).prop('checked');
	console.log(check);
	// Store action
	storedata({'location': check});
});

$('#hashtags').click(function(event) {
	let check = $(this).prop('checked');
	console.log(check);
	// Store action
	storedata({'hashtags': check});
});

$('#follow').click(function(event) {
	let check = $(this).prop('checked');
	console.log(check);
	// Store action
	storedata({'follow': check});
});

$('#followers').click(function(event) {
	let check = $(this).prop('checked');
	console.log(check);
	// Store action
	storedata({'followers': check});
});

$('#stories').click(function(event) {
	let check = $(this).prop('checked');
	console.log(check);
	// Store action
	storedata({'stories': check});
});

// Controls events

$('#back').click(function(event) {
	$('.module-box').slideUp('fast');
	$('.main-box').fadeIn('fast');
	console.log('Back clicked');
});

$('#tinite').click(function(event) {
	var modname = $(this).attr('data-mod');
	$('.button-collapse').sideNav('hide');
	$('.title-toolbar').text(modname);
	$('.main-box').fadeOut('fast');
	$('.module-box').slideDown('fast');
	showMod($(this).attr('data-tag'));
	console.log(modname);
});

$('#twidget').click(function(event) {
	var modname = $(this).attr('data-mod');
	$('.button-collapse').sideNav('hide');
	$('.title-toolbar').text(modname);
	$('.main-box').fadeOut('fast');
	$('.module-box').slideDown('fast');
	showMod($(this).attr('data-tag'));
	console.log(modname);
});

$('#tfeed').click(function(event) {
	var modname = $(this).attr('data-mod');
	$('.button-collapse').sideNav('hide');
	$('.title-toolbar').text(modname);
	$('.main-box').fadeOut('fast');
	$('.module-box').slideDown('fast');
	showMod($(this).attr('data-tag'));
	console.log(modname);
});

$('#texplore').click(function(event) {
	var modname = $(this).attr('data-mod');
	$('.button-collapse').sideNav('hide');
	$('.title-toolbar').text(modname);
	$('.main-box').fadeOut('fast');
	$('.module-box').slideDown('fast');
	showMod($(this).attr('data-tag'));
	console.log(modname);
});

$('#tlocation').click(function(event) {
	var modname = $(this).attr('data-mod');
	$('.button-collapse').sideNav('hide');
	$('.title-toolbar').text(modname);
	$('.main-box').fadeOut('fast');
	$('.module-box').slideDown('fast');
	showMod($(this).attr('data-tag'));
	console.log(modname);
});

$('#thash').click(function(event) {
	var modname = $(this).attr('data-mod');
	$('.button-collapse').sideNav('hide');
	$('.title-toolbar').text(modname);
	$('.main-box').fadeOut('fast');
	$('.module-box').slideDown('fast');
	showMod($(this).attr('data-tag'));
	console.log(modname);
});

$('.clck').click(function(event) {
	return false;
});

$('.user-c').click(function(event) {

	let edit = $('#edit-c').text();

	if (edit === 'Fazer login') {
		chrome.tabs.create({url: 'https://instagram.com/accounts/login/', active: true});
	}else {
		$('.show-usr').toggleClass('hide');
		$('.collapsible').collapsible('open', 0);
	}

});

$('#useraccount').focusout(function(event) {
	let dt = $('#useraccount').val();
	if (dt === '' || dt === null || dt === undefined) {
		$('#lbl').text('Campo vazio! Informe um usuário').addClass('red-text');
	}else {
		dt = dt.replace(/@(.*?)/g, '$1');
		console.log(dt);
		storedata({'user_account': dt});
	}
});

$('#mail-send').click(function(event) {
	var data = {
		mail: 'support@mjobi.com',
		subject: 'MJobi Suporte | Extensão Chrome',
		body: ''
	};
	$(this).attr('href', 'mailto:'+data.mail+'?subject='+data.subject+'&body='+data.body+'');
	console.log(data);
});

// UI by modules settings

function showMod(mod) {
	if (mod === 'cinite') {
		$('.content-module').html(
			'<span class="title-section grey-text s-box">Tempo em segundos</span>'+
			'<div class="section">'+
				'<div class="s-box">'+
					'<p >Arraste para esquerda ou direita para definir a inicialização dos recursos assim que a página do Instagram for acessada. Você também pode definir um aviso prévio antes de iniciar os controles.</p>'+
				'</div>'+
			'</div>'+
			'<div class="section s-box">'+
				'<p class="range-field">'+
					'<input type="range" id="seconds-inite" min="5" max="30" value="5"/>'+
				'</p>'+
			'</div>'+
			'<div class="section">'+
				'<div class="divider"></div>'+
			'</div>'+
			'<div class="section">'+
				'<span class="title-section grey-text s-box">Aviso prévio</span>'+
			'</div>'+
			'<ul class="collapsible z-depth-0 b-none" data-collapsible="expandable">'+
				'<li><div class="collapsible-header b-none p-20">Mostrar aviso de inicialização<div class="switch"><label><input type="checkbox" id="inite-confirm-1"><span class="lever"></span></label></div></div></li>'+
			'</ul>'
		);

		chrome.storage.local.get(['time_inite', 'inite_alert'], function(result){
			$('#seconds-inite').val(result.time_inite);
			$('#inite-confirm-1').attr('checked', result.inite_alert);
		});

		$('#seconds-inite').mouseup(function(event) {
			storedata({'time_inite': $(this).val()});
			// Store action
			console.log($(this).val());
		});
		$('#inite-confirm-1').click(function(event) {
			storedata({'inite_alert': $(this).prop('checked')});
			// Store action
			console.log($(this).prop('checked'));
		});
	}else if (mod === 'chash') {
		$('.content-module').html(
			'<span class="title-section grey-text s-box">Hashtags para explorar</span>'+
			'<div class="section">'+
				'<div class="s-box">'+
					'<p >Informe aqui as Hashtags que você deseja que a ferramenta percorra.Utilize sempre Hashtags que mais tem haver com seu negócio para melhor resultado.A utilização das Hashtags são excelentes meios de conseguir novos públicos.</p>'+
				'</div>'+
			'</div>'+
			'<div class="section s-box">'+
				'<div class="chips chips-initial chips-placeholder"></div>'+
			'</div>'
		);
		$('.chips').material_chip();
		$('.chips > input').focus();

		chrome.storage.local.get(['my_hashtags'], function(result){
			$('.chips-initial').material_chip({data:result.my_hashtags});
		});

		$('.chips').on('chip.add', function(e, chip){
			storedata({'my_hashtags': $('.chips-initial').material_chip('data')});
			// Store action
			console.log(chip);
		});
		$('.chips').on('chip.delete', function(e, chip){
			storedata({'my_hashtags': $('.chips-initial').material_chip('data')});
			// Store action
			console.log(chip);
		});
	}else if (mod === 'cwidget') {
		$('.content-module').html(
			'<span class="title-section grey-text s-box">Posição do Widget</span>'+
			'<div class="section s-box">'+
				'<img draggable="false" id="widget-view" src="img/extension-position.png" class="animated fadeIn responsive-img">'+
			'</div>'+
			'<div class="section s-box center">'+
				'<a id="widget-1" data-index="0" class="top_left chip white grey-text z-depth-1 hoverable waves-effect waves-light">posição 1</a>'+
				'<a id="widget-2" data-index="1" class="center_left chip white grey-text z-depth-1 hoverable waves-effect waves-light">posição 2</a>'+
				'<a id="widget-3" data-index="2" class="bottom_left chip white grey-text z-depth-1 hoverable waves-effect waves-light">posição 3</a>'+
				'<a id="widget-4" data-index="3" class="top_right chip white grey-text z-depth-1 hoverable waves-effect waves-light">posição 4</a>'+
				'<a id="widget-5" data-index="4" class="center_right chip white grey-text z-depth-1 hoverable waves-effect waves-light">posição 5</a>'+
				'<a id="widget-6" data-index="5" class="bottom_right chip white grey-text z-depth-1 hoverable waves-effect waves-light">posição 6</a>'+
			'</div>'
		);

		var elements = $('a[data-index]');

		chrome.storage.local.get(['widget_position'], function(result){
			$('.'+result.widget_position).removeClass('white grey-text');
			$('.'+result.widget_position).addClass('deep-orange accent-3 white-text');
		});

		$('#widget-1').click(function(event) {
			$('#widget-view').attr('src', 'img/extension-position_1.png');
			let index = $(this).attr('data-index');
			$.each(elements, function(index, val) {
				 $(elements[index]).removeClass('deep-orange accent-3 white-text');
				 $(elements[index]).addClass('white grey-text');
			});
			$(elements[index]).addClass('deep-orange accent-3 white-text');
			storedata({'widget_position': 'top_left'});
			// Store action
			console.log($(this).text());
		});

		$('#widget-2').click(function(event) {
			$('#widget-view').attr('src', 'img/extension-position_2.png');
			let index = $(this).attr('data-index');
			$.each(elements, function(index, val) {
				 $(elements[index]).removeClass('deep-orange accent-3 white-text');
				 $(elements[index]).addClass('white grey-text');
			});
			$(elements[index]).addClass('deep-orange accent-3 white-text');
			storedata({'widget_position': 'center_left'});
			// Store action
			console.log($(this).text());
		});

		$('#widget-3').click(function(event) {
			$('#widget-view').attr('src', 'img/extension-position_3.png');
			let index = $(this).attr('data-index');
			$.each(elements, function(index, val) {
				 $(elements[index]).removeClass('deep-orange accent-3 white-text');
				 $(elements[index]).addClass('white grey-text');
			});
			$(elements[index]).addClass('deep-orange accent-3 white-text');
			storedata({'widget_position': 'bottom_left'});
			// Store action
			console.log($(this).text());
		});

		$('#widget-4').click(function(event) {
			$('#widget-view').attr('src', 'img/extension-position_4.png');
			let index = $(this).attr('data-index');
			$.each(elements, function(index, val) {
				 $(elements[index]).removeClass('deep-orange accent-3 white-text');
				 $(elements[index]).addClass('white grey-text');
			});
			$(elements[index]).addClass('deep-orange accent-3 white-text');
			storedata({'widget_position': 'top_right'});
			// Store action
			console.log($(this).text());
		});

		$('#widget-5').click(function(event) {
			$('#widget-view').attr('src', 'img/extension-position_5.png');
			let index = $(this).attr('data-index');
			$.each(elements, function(index, val) {
				 $(elements[index]).removeClass('deep-orange accent-3 white-text');
				 $(elements[index]).addClass('white grey-text');
			});
			$(elements[index]).addClass('deep-orange accent-3 white-text');
			storedata({'widget_position': 'center_right'});
			// Store action
			console.log($(this).text());
		});

		$('#widget-6').click(function(event) {
			$('#widget-view').attr('src', 'img/extension-position_6.png');
			let index = $(this).attr('data-index');
			$.each(elements, function(index, val) {
				 $(elements[index]).removeClass('deep-orange accent-3 white-text');
				 $(elements[index]).addClass('white grey-text');
			});
			$(elements[index]).addClass('deep-orange accent-3 white-text');
			storedata({'widget_position': 'bottom_right'});
			// Store action
			console.log($(this).text());
		});

	}else if (mod === 'cfeed') {
		$('.content-module').html(
			'<span class="title-section grey-text s-box">Intervalo de transiçao</span>'+
			'<div class="section">'+
				'<div class="s-box">'+
					'<p>Nesta configuração será atribuido valores de tempo para transiçao de ações entre cada publicação identificada. Lembre-se de que você pode definir um tempo limite para atualização.</p>'+
				'</div>'+
			'</div>'+
			'<div class="section s-box">'+
				'<a id="5-sec" data-index="0" data-sec="5" class="5000 chip white grey-text z-depth-1 hoverable waves-effect waves-light">5 segundos</a>'+
				'<a id="7-sec" data-index="1" data-sec="7" class="7000 chip white grey-text z-depth-1 hoverable waves-effect waves-light">7 segundos</a>'+
				'<a id="9-sec" data-index="2" data-sec="9" class="9000 chip white grey-text z-depth-1 hoverable waves-effect waves-light">9 segundos</a>'+
				'<a id="11-sec" data-index="3" data-sec="11" class="11000 chip white grey-text z-depth-1 hoverable waves-effect waves-light">11 segundos</a>'+
			'</div>'+
			'<div class="section">'+
				'<div class="divider"></div>'+
			'</div>'+
			'<div class="section">'+
				'<span class="title-section grey-text s-box">Instervalo de atualização</span>'+
			'</div>'+
			'<div class="section s-box">'+
				'<a id="none-feed" data-index="0" data-refresh="0" class="* chip white grey-text z-depth-1 hoverable waves-effect waves-light">Não atualizar</a>'+
				'<a id="3-feed" data-index="1" data-refresh="3" class="180000 chip white grey-text z-depth-1 hoverable waves-effect waves-light">3 minutos</a>'+
				'<a id="5-feed" data-index="2" data-refresh="5" class="300000 chip white grey-text z-depth-1 hoverable waves-effect waves-light">5 minutos</a>'+
				'<a id="7-feed" data-index="3" data-refresh="7" class="420000 chip white grey-text z-depth-1 hoverable waves-effect waves-light">7 minutos</a>'+
				'<a id="9-feed" data-index="4" data-refresh="9" class="540000 chip white grey-text z-depth-1 hoverable waves-effect waves-light">9 minutos</a>'+
				'<a id="11-feed" data-index="5" data-refresh="11" class="660000 chip white grey-text z-depth-1 hoverable waves-effect waves-light">11 minutos</a>'+
				'<a id="13-feed" data-index="6" data-refresh="13" class="780000 chip white grey-text z-depth-1 hoverable waves-effect waves-light">13 minutos</a>'+
				'<a id="15-feed" data-index="7" data-refresh="15" class="900000 chip white grey-text z-depth-1 hoverable waves-effect waves-light">15 minutos</a>'+
			'</div>'
		);

		var elementsSec = $('a[data-sec]');
		var elements = $('a[data-refresh]');

		chrome.storage.local.get(['feed_transition', 'feed_reload'], function(result){
			$('.'+result.feed_transition).removeClass('white grey-text');
			$('.'+result.feed_transition).addClass('deep-orange accent-3 white-text');
			$('.'+result.feed_reload).removeClass('white grey-text');
			$('.'+result.feed_reload).addClass('deep-orange accent-3 white-text');
		});

		$('#5-sec').click(function(event) {
			let index = $(this).attr('data-index');
			$.each(elementsSec, function(index, val) {
				 $(elementsSec[index]).removeClass('deep-orange accent-3 white-text');
				 $(elementsSec[index]).addClass('white grey-text');
			});
			$(elementsSec[index]).addClass('deep-orange accent-3 white-text');
			storedata({'feed_transition': 5000});
			// Store action
			console.log($(this).text());
		});

		$('#7-sec').click(function(event) {
			let index = $(this).attr('data-index');
			$.each(elementsSec, function(index, val) {
				 $(elementsSec[index]).removeClass('deep-orange accent-3 white-text');
				 $(elementsSec[index]).addClass('white grey-text');
			});
			$(elementsSec[index]).addClass('deep-orange accent-3 white-text');
			storedata({'feed_transition': 7000});
			// Store action
			console.log($(this).text());
		});

		$('#9-sec').click(function(event) {
			let index = $(this).attr('data-index');
			$.each(elementsSec, function(index, val) {
				 $(elementsSec[index]).removeClass('deep-orange accent-3 white-text');
				 $(elementsSec[index]).addClass('white grey-text');
			});
			$(elementsSec[index]).addClass('deep-orange accent-3 white-text');
			storedata({'feed_transition': 9000});
			// Store action
			console.log($(this).text());
		});

		$('#11-sec').click(function(event) {
			let index = $(this).attr('data-index');
			$.each(elementsSec, function(index, val) {
				 $(elementsSec[index]).removeClass('deep-orange accent-3 white-text');
				 $(elementsSec[index]).addClass('white grey-text');
			});
			$(elementsSec[index]).addClass('deep-orange accent-3 white-text');
			storedata({'feed_transition': 11000});
			// Store action
			console.log($(this).text());
		});

		$('#none-feed').click(function(event) {
			let index = $(this).attr('data-index');
			$.each(elements, function(index, val) {
				 $(elements[index]).removeClass('deep-orange accent-3 white-text');
				 $(elements[index]).addClass('white grey-text');
			});
			$(elements[index]).addClass('deep-orange accent-3 white-text');
			storedata({'feed_reload': '*'});
			// Store action
			console.log($(this).text());
		});

		$('#3-feed').click(function(event) {
			let index = $(this).attr('data-index');
			$.each(elements, function(index, val) {
				 $(elements[index]).removeClass('deep-orange accent-3 white-text');
				 $(elements[index]).addClass('white grey-text');
			});
			$(elements[index]).addClass('deep-orange accent-3 white-text');
			storedata({'feed_reload': 180000});
			// Store action
			console.log($(this).text());
		});

		$('#5-feed').click(function(event) {
			let index = $(this).attr('data-index');
			$.each(elements, function(index, val) {
				 $(elements[index]).removeClass('deep-orange accent-3 white-text');
				 $(elements[index]).addClass('white grey-text');
			});
			$(elements[index]).addClass('deep-orange accent-3 white-text');
			storedata({'feed_reload': 300000});
			// Store action
			console.log($(this).text());
		});

		$('#7-feed').click(function(event) {
			let index = $(this).attr('data-index');
			$.each(elements, function(index, val) {
				 $(elements[index]).removeClass('deep-orange accent-3 white-text');
				 $(elements[index]).addClass('white grey-text');
			});
			$(elements[index]).addClass('deep-orange accent-3 white-text');
			storedata({'feed_reload': 420000});
			// Store action
			console.log($(this).text());
		});

		$('#9-feed').click(function(event) {
			let index = $(this).attr('data-index');
			$.each(elements, function(index, val) {
				 $(elements[index]).removeClass('deep-orange accent-3 white-text');
				 $(elements[index]).addClass('white grey-text');
			});
			$(elements[index]).addClass('deep-orange accent-3 white-text');
			storedata({'feed_reload': 540000});
			// Store action
			console.log($(this).text());
		});

		$('#11-feed').click(function(event) {
			let index = $(this).attr('data-index');
			$.each(elements, function(index, val) {
				 $(elements[index]).removeClass('deep-orange accent-3 white-text');
				 $(elements[index]).addClass('white grey-text');
			});
			$(elements[index]).addClass('deep-orange accent-3 white-text');
			storedata({'feed_reload': 660000});
			// Store action
			console.log($(this).text());
		});

		$('#13-feed').click(function(event) {
			let index = $(this).attr('data-index');
			$.each(elements, function(index, val) {
				 $(elements[index]).removeClass('deep-orange accent-3 white-text');
				 $(elements[index]).addClass('white grey-text');
			});
			$(elements[index]).addClass('deep-orange accent-3 white-text');
			storedata({'feed_reload': 780000});
			// Store action
			console.log($(this).text());
		});

		$('#15-feed').click(function(event) {
			let index = $(this).attr('data-index');
			$.each(elements, function(index, val) {
				 $(elements[index]).removeClass('deep-orange accent-3 white-text');
				 $(elements[index]).addClass('white grey-text');
			});
			$(elements[index]).addClass('deep-orange accent-3 white-text');
			storedata({'feed_reload': 900000});
			// Store action
			console.log($(this).text());
		});

	}else if (mod === 'cexplore') {
		$('.content-module').html(
			'<span class="title-section grey-text s-box">Padrões aproximados</span>'+
			'<div class="section">'+
				'<div class="s-box">'+
					'<p>Configure critérios para a automação seguir diante das decisões de curtir e seguir deste módulo. Veja também critérios para o modo Explorar pessoas e decida quando segui-las.</p>'+
				'</div>'+
			'</div>'+
			'<div class="section s-box">'+
				'<a id="fl-all" data-index="0" data-follow="*" class="* chip white grey-text z-depth-1 hoverable waves-effect waves-light">Seguir todos</a>'+
				'<a id="fl-1m" data-index="1" data-follow="1000" class="1- chip white grey-text z-depth-1 hoverable waves-effect waves-light">Seguir 1k -</a>'+
				'<a id="fl-5m" data-index="2" data-follow="5000" class="5- chip white grey-text z-depth-1 hoverable waves-effect waves-light">Seguir 5k -</a>'+
				'<a id="fl-7m" data-index="3" data-follow="7000" class="7- chip white grey-text z-depth-1 hoverable waves-effect waves-light">Seguir 7k -</a>'+
				'<a id="fl-10ms" data-index="4" data-follow="10000" class="10+ chip white grey-text z-depth-1 hoverable waves-effect waves-light">Seguir 10k +</a>'+
				'<a id="fl-20ms" data-index="5" data-follow="20000" class="20+ chip white grey-text z-depth-1 hoverable waves-effect waves-light">Seguir 20k +</a>'+
				'<a id="fl-30ms" data-index="6" data-follow="30000" class="30+ chip white grey-text z-depth-1 hoverable waves-effect waves-light">Seguir 30k +</a>'+
				'<a id="fl-40ms" data-index="7" data-follow="40000" class="40+ chip white grey-text z-depth-1 hoverable waves-effect waves-light">Seguir 40k +</a>'+
				'<a id="fl-100ms" data-index="8" data-follow="100000" class="100+ chip white grey-text z-depth-1 hoverable waves-effect waves-light">Seguir 100k +</a>'+
			'</div>'+
			'<div class="section">'+
				'<div class="divider"></div>'+
			'</div>'+
			'<div class="section">'+
				'<span class="title-section grey-text s-box">Quantidade por dia</span>'+
			'</div>'+
			'<div class="section s-box">'+
				'<a id="qtd-100" data-index="0" data-day="100" class="100 chip white grey-text z-depth-1 hoverable waves-effect waves-light">100 por dia</a>'+
				'<a id="qtd-200" data-index="1" data-day="200" class="200 chip white grey-text z-depth-1 hoverable waves-effect waves-light">200 por dia</a>'+
				'<a id="qtd-300" data-index="2" data-day="300" class="300 chip white grey-text z-depth-1 hoverable waves-effect waves-light">300 por dia</a>'+
				'<a id="qtd-400" data-index="3" data-day="400" class="400 chip white grey-text z-depth-1 hoverable waves-effect waves-light">400 por dia</a>'+
				'<a id="qtd-500" data-index="4" data-day="500" class="500 chip white grey-text z-depth-1 hoverable waves-effect waves-light">500 por dia</a>'+
				'<a id="qtd-600" data-index="5" data-day="600" class="600 chip white grey-text z-depth-1 hoverable waves-effect waves-light">600 por dia</a>'+
				'<a id="qtd-700" data-index="6" data-day="700" class="700 chip white grey-text z-depth-1 hoverable waves-effect waves-light">700 por dia</a>'+
				'<a id="qtd-800" data-index="7" data-day="800" class="800 chip white grey-text z-depth-1 hoverable waves-effect waves-light">800 por dia</a>'+
			'</div>'
		);

		var elementsSec = $('a[data-follow]');
		var elements = $('a[data-day]');

		chrome.storage.local.get(['marge_count', 'follow_day'], function(result){
			$('.'+result.marge_count).removeClass('white grey-text');
			$('.'+result.marge_count).addClass('deep-orange accent-3 white-text');
			$('.'+result.follow_day).removeClass('white grey-text');
			$('.'+result.follow_day).addClass('deep-orange accent-3 white-text');
		});

		$('#fl-all').click(function(event) {
			let index = $(this).attr('data-index');
			$.each(elementsSec, function(index, val) {
				 $(elementsSec[index]).removeClass('deep-orange accent-3 white-text');
				 $(elementsSec[index]).addClass('white grey-text');
			});
			$(elementsSec[index]).addClass('deep-orange accent-3 white-text');
			storedata({'marge_count': '*'});
			// Store action
			console.log($(this).text());
		});

		$('#fl-1m').click(function(event) {
			let index = $(this).attr('data-index');
			$.each(elementsSec, function(index, val) {
				 $(elementsSec[index]).removeClass('deep-orange accent-3 white-text');
				 $(elementsSec[index]).addClass('white grey-text');
			});
			$(elementsSec[index]).addClass('deep-orange accent-3 white-text');
			storedata({'marge_count': '1-'});
			// Store action
			console.log($(this).text());
		});

		$('#fl-5m').click(function(event) {
			let index = $(this).attr('data-index');
			$.each(elementsSec, function(index, val) {
				 $(elementsSec[index]).removeClass('deep-orange accent-3 white-text');
				 $(elementsSec[index]).addClass('white grey-text');
			});
			$(elementsSec[index]).addClass('deep-orange accent-3 white-text');
			storedata({'marge_count': '5-'});
			// Store action
			console.log($(this).text());
		});

		$('#fl-7m').click(function(event) {
			let index = $(this).attr('data-index');
			$.each(elementsSec, function(index, val) {
				 $(elementsSec[index]).removeClass('deep-orange accent-3 white-text');
				 $(elementsSec[index]).addClass('white grey-text');
			});
			$(elementsSec[index]).addClass('deep-orange accent-3 white-text');
			storedata({'marge_count': '7-'});
			// Store action
			console.log($(this).text());
		});

		$('#fl-10ms').click(function(event) {
			let index = $(this).attr('data-index');
			$.each(elementsSec, function(index, val) {
				 $(elementsSec[index]).removeClass('deep-orange accent-3 white-text');
				 $(elementsSec[index]).addClass('white grey-text');
			});
			$(elementsSec[index]).addClass('deep-orange accent-3 white-text');
			storedata({'marge_count': '10+'});
			// Store action
			console.log($(this).text());
		});

		$('#fl-20ms').click(function(event) {
			let index = $(this).attr('data-index');
			$.each(elementsSec, function(index, val) {
				 $(elementsSec[index]).removeClass('deep-orange accent-3 white-text');
				 $(elementsSec[index]).addClass('white grey-text');
			});
			$(elementsSec[index]).addClass('deep-orange accent-3 white-text');
			storedata({'marge_count': '20+'});
			// Store action
			console.log($(this).text());
		});

		$('#fl-30ms').click(function(event) {
			let index = $(this).attr('data-index');
			$.each(elementsSec, function(index, val) {
				 $(elementsSec[index]).removeClass('deep-orange accent-3 white-text');
				 $(elementsSec[index]).addClass('white grey-text');
			});
			$(elementsSec[index]).addClass('deep-orange accent-3 white-text');
			storedata({'marge_count': '30+'});
			// Store action
			console.log($(this).text());
		});

		$('#fl-40ms').click(function(event) {
			let index = $(this).attr('data-index');
			$.each(elementsSec, function(index, val) {
				 $(elementsSec[index]).removeClass('deep-orange accent-3 white-text');
				 $(elementsSec[index]).addClass('white grey-text');
			});
			$(elementsSec[index]).addClass('deep-orange accent-3 white-text');
			storedata({'marge_count': '40+'});
			// Store action
			console.log($(this).text());
		});

		$('#fl-100ms').click(function(event) {
			let index = $(this).attr('data-index');
			$.each(elementsSec, function(index, val) {
				 $(elementsSec[index]).removeClass('deep-orange accent-3 white-text');
				 $(elementsSec[index]).addClass('white grey-text');
			});
			$(elementsSec[index]).addClass('deep-orange accent-3 white-text');
			storedata({'marge_count': '100+'});
			// Store action
			console.log($(this).text());
		});

		$('#qtd-100').click(function(event) {
			let index = $(this).attr('data-index');
			$.each(elements, function(index, val) {
				 $(elements[index]).removeClass('deep-orange accent-3 white-text');
				 $(elements[index]).addClass('white grey-text');
			});
			$(elements[index]).addClass('deep-orange accent-3 white-text');
			storedata({'follow_day': 100});
			// Store action
			console.log($(this).text());
		});

		$('#qtd-200').click(function(event) {
			let index = $(this).attr('data-index');
			$.each(elements, function(index, val) {
				 $(elements[index]).removeClass('deep-orange accent-3 white-text');
				 $(elements[index]).addClass('white grey-text');
			});
			$(elements[index]).addClass('deep-orange accent-3 white-text');
			storedata({'follow_day': 200});
			// Store action
			console.log($(this).text());
		});

		$('#qtd-300').click(function(event) {
			let index = $(this).attr('data-index');
			$.each(elements, function(index, val) {
				 $(elements[index]).removeClass('deep-orange accent-3 white-text');
				 $(elements[index]).addClass('white grey-text');
			});
			$(elements[index]).addClass('deep-orange accent-3 white-text');
			storedata({'follow_day': 300});
			// Store action
			console.log($(this).text());
		});

		$('#qtd-400').click(function(event) {
			let index = $(this).attr('data-index');
			$.each(elements, function(index, val) {
				 $(elements[index]).removeClass('deep-orange accent-3 white-text');
				 $(elements[index]).addClass('white grey-text');
			});
			$(elements[index]).addClass('deep-orange accent-3 white-text');
			storedata({'follow_day': 400});
			// Store action
			console.log($(this).text());
		});

		$('#qtd-500').click(function(event) {
			let index = $(this).attr('data-index');
			$.each(elements, function(index, val) {
				 $(elements[index]).removeClass('deep-orange accent-3 white-text');
				 $(elements[index]).addClass('white grey-text');
			});
			$(elements[index]).addClass('deep-orange accent-3 white-text');
			storedata({'follow_day': 500});
			// Store action
			console.log($(this).text());
		});

		$('#qtd-600').click(function(event) {
			let index = $(this).attr('data-index');
			$.each(elements, function(index, val) {
				 $(elements[index]).removeClass('deep-orange accent-3 white-text');
				 $(elements[index]).addClass('white grey-text');
			});
			$(elements[index]).addClass('deep-orange accent-3 white-text');
			storedata({'follow_day': 600});
			// Store action
			console.log($(this).text());
		});

		$('#qtd-700').click(function(event) {
			let index = $(this).attr('data-index');
			$.each(elements, function(index, val) {
				 $(elements[index]).removeClass('deep-orange accent-3 white-text');
				 $(elements[index]).addClass('white grey-text');
			});
			$(elements[index]).addClass('deep-orange accent-3 white-text');
			storedata({'follow_day': 700});
			// Store action
			console.log($(this).text());
		});

		$('#qtd-800').click(function(event) {
			let index = $(this).attr('data-index');
			$.each(elements, function(index, val) {
				 $(elements[index]).removeClass('deep-orange accent-3 white-text');
				 $(elements[index]).addClass('white grey-text');
			});
			$(elements[index]).addClass('deep-orange accent-3 white-text');
			storedata({'follow_day': 800});
			// Store action
			console.log($(this).text());
		});

	}else if (mod === 'clocation') {

		let uri = 'https://instagram.com';
		let uri_locations = 'https://instagram.com/explore/locations/';

		let img;
		let title;
		let lg;
		let lt;
		let id;
		let slug;

		$('.content-module').html(
			'<span class="title-section grey-text s-box">Sua lista</span>'+
			'<div class="section">'+
				'<div class="s-box">'+
					'<p>Serão listadas aqui todas as localizações que você adicionou. Você pode removê-las quando quiser. As localizações aumentam a chance de você encontrar novo público em uma região específica.</p>'+
				'</div>'+
			'</div>'+
			'<ul class="collection">'+
			'</ul>'
		);

		chrome.storage.local.get('my_location', function(result) {
			if (result.my_location === undefined || result.my_location === null) {

				$('.collection').append(
					'<li class="collection-item avatar">'+
						'<img draggable="false" src="img/default_profile_300.png" alt="" class="circle">'+
						'<span class="title">Nenhuma localização</span>'+
						'<p class="grey-text">Sem localizações por enquanto.</p>'+
					'</li>'
				);

			}else {

				$.get(uri, function(data) {

					data = data.match(/sharedData = {(.*?)};/g);
					data = data[0].match(/"entry_data":{"(.*?)":/g);
					data = data[0].replace(/"entry_data":{"(.*?)":/g, '$1');

					if (data == 'LandingPage') {

						$('.collection').append(
							'<li class="collection-item avatar">'+
								'<img draggable="false" src="img/default_profile_300.png" alt="" class="circle">'+
								'<span class="title">Você não esta logado em sua conta.</span>'+
								'<p class="grey-text">Primeiro faça login em sua conta.<br><a href="'+uri+'/accounts/login/" target="_blank" class="deep-orange-text">Fazer login</a></p>'+
							'</li>'
						);

					}else {

						for (var i = 0; i < result.my_location.length; i++) {

							$.get(uri+result.my_location[i].url, function(data) {

								img = data;
								title = data;
								lg = data;
								lt = data;
								id = data;
								slug = data;

								img = img.match(/"profile_pic_url":"(.*?)",/g);
								title = title.match(/","name":"(.*?)",/g);
								lt = lt.match(/"lat":(.*?),"/g);
								lg = lg.match(/lng":(.*?),"/g);
								id = id.match(/{"location":{"id":"(.*?)",/g);
								slug = slug.match(/"slug":"(.*?)",/g);

								img = decodeURIComponent(JSON.parse('"'+img[1].replace(/"profile_pic_url":"(.*?)",/g, '$1')+'"'));
								title = title[0].replace(/","name":"(.*?)",/g, '$1');
								lt = lt[0].replace(/"lat":(.*?),"/g, '$1');
								lg = lg[0].replace(/lng":(.*?),"/g, '$1');
								id = id[0].replace(/{"location":{"id":"(.*?)",/g, '$1');
								slug = slug[0].replace(/"slug":"(.*?)",/g, '$1');

								$('.collection').append(
									'<li class="collection-item avatar">'+
										'<img draggable="false" src="'+img+'" alt="" class="circle">'+
										'<span class="title">'+jQuery.parseJSON('"'+title+'"')+'</span>'+
										'<p class="grey-text"><a href="'+uri_locations+id+'/'+slug+'" target="_blank" class="deep-orange-text">'+id+'/'+slug+'</a><br>Latitude: '+lt+' Longitude: '+lg+'</p>'+
									'</li>'
								);

							});

						}

					}

				});
			}
		});

	}
};

