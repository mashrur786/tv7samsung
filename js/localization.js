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
			locale = en;
		}

		setLocalizedText('selectLocalizationText', locale, 'selectLocalizationText', localeData);
		
		// set default focus
		addPageLoadFocus();

		document.addEventListener('keydown', function(e) {
			var keyCode = e.keyCode;
			var menuId = e.target.id;
			var newId = null;
	
			console.log('Key code : ', keyCode);

			var split = menuId.split('_');

			var newId = null;
			if (keyCode === UP && split) {
				// UP arrow
				newId = split[0] + '_' + (Number(split[1]) - 1);
				addFocusToElement(newId);
			}
			else if (keyCode === DOWN && split) {
				// DOWN arrow
				newId = split[0] + '_' + (Number(split[1]) + 1);
				addFocusToElement(newId);
			}
			else if (keyCode === OK && split) {
				// OK button
				var locale = null;

				var id = document.activeElement.id;
				if (id) {
					if (id == localeEn) {
						locale = en;
					}
					else if (id == localeFi) {
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
			else if (keyCode === RETURN || keyCode === ESC) {
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

function addPageLoadFocus() {
	var id = localeEn;

	var locale = localStorage.getItem(localizationKey);
	if (locale) {
		if (locale === fi) {
			id = localeFi;
		}
		else if (locale === ee) {
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
	var elem = document.getElementById(id);
	if(elem) {
		elem.focus();
	}
}

function toMainPage() {
	window.open(mainPage, _self);
}
