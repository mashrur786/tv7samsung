/*
 * Open main view.
 */
window.onload = function() {
	init();
}

function init() {
	setTimeout(function() {
		var key = localStorage.getItem(localizationKey);
		if (key) {
			// if locale key found => main page
			window.open(mainPage, _self);
		}
		else {
			// if locale key not found => locale selection page
			sessionStorage.setItem(fromPage, 'indexPage');
			window.open(localizationPage, _self);
		}
	}, 1600);	
}

function deleteLocalizationKey() {
	localStorage.removeItem(localizationKey);
}