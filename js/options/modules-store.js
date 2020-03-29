function storedata(value) {
	chrome.storage.local.set(value, function() {
		Materialize.toast('Guardado', 4000);
	});
};

