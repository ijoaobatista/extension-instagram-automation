function setDefaultConfig() {
	chrome.storage.local.get('installed', function(result) {
		if (result.installed === undefined || result.installed === null) {
			chrome.storage.local.set(DEFAULT);
			console.log('Configurado com sucesso');
		}else {
			console.log('Utilizando as configurações gravadas');
		}
	});
};

