/**
 * Show localization selection.
 */

var locale = null;

window.onload = function() {
	init();
}

function init() {
	setTimeout(function() {
		locale = localStorage.getItem(localizationKey);
		if (!locale) {
			locale = fi;
		}

		setLocalizedText('selectLocalizationText', locale, 'selectLocalizationText');
		
		// set default focus
		addOpenFocusToElement();

		document.addEventListener('keydown', function(e) {
			var keyCode = e.keyCode;
			var menuId = e.target.id;
			var newId = null;
	
			console.log('Key code : ', keyCode);

			var split = menuId.split('_');

			var newId = null;
			if (keyCode === 38 && split) {
				//UP arrow
				newId = split[0] + '_' + (Number(split[1]) - 1);
				addFocusToElement(newId);
			}
			else if (keyCode === 40 && split) {
				//DOWN arrow
				newId = split[0] + '_' + (Number(split[1]) + 1);
				addFocusToElement(newId);
			}
			else if (keyCode === 13 && split) {
				//OK button
				var locale = null;

				var id = document.activeElement.id;
				if (id) {
					if (id == localeFi) {
						locale = fi;
					}
					else if (id == localeEe) {
						locale = ee;
					}
					else if (id == localeSe) {
						locale = se;
					}
					else if (id == localeRu) {
						locale = ru;
					}

					console.log('Selected locale: ', locale);

					// save user selection to local storage
					localStorage.setItem(localizationKey, locale);
					
					toMainPage();
				}
			}
			else if (keyCode === 10009 || keyCode === 27) {
				// RETURN button
				var fromPage = sessionStorage.getItem('fromPage');
				if (fromPage) {
					if (fromPage === 'indexPage' && tizen) {
						// exit from application
						tizen.application.getCurrentApplication().exit();
					}
					else {
						// to main page
						toMainPage();
					}
				}
			}
		});
	}, 0);
}

function addOpenFocusToElement() {
	var id = localeFi;

	var locale = localStorage.getItem(localizationKey);
	if (locale) {
		if (locale === ee) {
			id = localeEe;
		}
		else if (locale === se) {
			id = localeSe;
		}
		else if (locale === ru) {
			id = localeRu;
		}
	}

	addFocusToElement(id);
}

function addFocusToElement(id) {
	var element = document.getElementById(id);
	if(element) {
		element.focus();
	}
}

function toMainPage() {
	window.open(mainPage, _self);
}