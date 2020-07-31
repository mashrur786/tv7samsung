var locale = null;
var modalVisible = false;
var settingsMenuOpen = false;

window.onload = function() {
	init();
}

function init() {
	// set content row height
	var height = getWindowHeight();

	height = (height - 180) / 2;
	height = height + 'px';
	
	setTimeout(function() {
		locale = localStorage.getItem(localizationKey);
		console.log('Locale: ', locale);

		if (locale) {
			// add localized toolbar text
			setLocalizedText('toolbarText', locale, 'toolbarText');
		}

		// set content rows height
		var rows = document.querySelectorAll('.contentRow');
		if (rows) {
			for (var i = 0; i < rows.length; i++) {
				rows[i].style.height = height;
			}
		}

		activateContentElement();
	}, 0);

	// add eventListener for keydown
	document.addEventListener('keydown', function(e) {
		var keyCode = e.keyCode;
		var contentId = e.target.id;
		var newId = null;

		console.log('Key code : ', keyCode);

		var split = null;
		if (contentId) {
			split = contentId.split('_');
		}

		if (keyCode === LEFT && split) {
			//LEFT arrow
			if (contentId === 'r_1_1' || contentId === 'r_2_1') {
				// Activate settings menu
				settingsMenuOpen = true;
				newId = 'r_0_0';
			}
			else if (modalVisible) {
				// exit modal yes button
				newId = 'yesButton_' + (Number(split[1]) - 1);
			}
			else if (!settingsMenuOpen) {
				// activate content item
				newId = split[0] + '_' + split[1] + '_' + (Number(split[2]) - 1);
			}
		}
		else if (keyCode === UP && split) {
			//UP arrow - activate content item
			if (!settingsMenuOpen && !modalVisible) {
				newId = split[0] + '_' + (Number(split[1]) - 1) + '_' + split[2];
			}
		}
		else if (keyCode === RIGHT && split) {
			//RIGHT arrow
			if (contentId === 'r_0_0') {
				// from settings menu - activate content item
				settingsMenuOpen = false;
				newId = 'r_1_1';
			}
			else if (modalVisible) {
				// exit modal cancel button
				newId = 'cancelButton_' + (Number(split[1]) + 1);
			}
			else {
				// from content item - activate content item
				newId = split[0] + '_' + split[1] + '_' + (Number(split[2]) + 1);
			}
		}
		else if (keyCode === DOWN && split) {
			//DOWN arrow - activate content item
			if (!settingsMenuOpen && !modalVisible) {
				newId = split[0] + '_' + (Number(split[1]) + 1) + '_' + split[2];
			}
		}
		else if (keyCode === OK) {
			//OK button
			if (!modalVisible) {
				var id = document.activeElement.id;

				if (!id) {
					activateContentElement();
					return;
				}

				if (id === 'r_0_0') {
					// open settings page - localization
					sessionStorage.setItem(fromPage, 'mainPage');
					window.open(localizationPage, _self);
				}
				else {
					// open video page
					var value = getUrlAndTypeById(id);

					sessionStorage.setItem('urlToPlay', value.url);
					sessionStorage.setItem('urlType', value.type);
	
					window.open(playerPage, _self);
				}
			}
			else {
				hideExitModal();

				if (document.activeElement.id === 'yesButton_1') {
					// exit from application
					if (tizen) {
						tizen.application.getCurrentApplication().exit();
					}
				}
				else if (document.activeElement.id === 'cancelButton_2') {
					// cancel => to main view
					activateContentElement();
				}
			}
		}
		else if (keyCode === RETURN || keyCode === ESC) {
			//RETURN button
			if(settingsMenuOpen) {
				settingsMenuOpen = false;
				activateContentElement();
			}
			else if (!modalVisible) {
				showExitModal();
			}
			else {
				// to main view
				hideExitModal();
				activateContentElement();
			}
		}

		// Set focus to content element
		console.log('newId: ', newId);
		if (newId) {
			var elem = getElementById(newId);
			if (elem) {
				elem.focus();
			}

			if (newId.startsWith('r_')) {
				// save only content element id
				sessionStorage.setItem('mainActiveId', newId);
			}
		}
	});
}

function activateContentElement() {
	setTimeout(function() {
		var activeId = sessionStorage.getItem('mainActiveId');
		if (!activeId || activeId === 'r_0_0') {
			activeId = 'r_1_1';
		}

		activeId = getElementById(activeId);
		if (activeId) {
			activeId.focus();
		}
	}, 100);
}

function focusInToSettings(element) {
	var settingsText = document.getElementById('settingsText');
	if (settingsText) {
		settingsText.style.display = 'block';
		setLocalizedText('settingsText', locale, 'settingsText');
	}
}

function focusOutFromSettings(element) {
	var settingsText = document.getElementById('settingsText');
	if (settingsText) {
		settingsText.style.display = 'none';
	}
}

function getElementByClass(className) {
	return document.querySelector('.' + className);
}

function getElementById(id) {
	return document.getElementById(id);
}

function getWindowWidth() {
	return window.document.documentElement.clientWidth;
}

function getWindowHeight() {
	return window.document.documentElement.clientHeight;
}

function getUrlAndTypeById(id) {
	var value = null;
	if (id) {
		for(var u of urls) {
			if (u.element === String(id)) {
				value = {url: u.url, type: u.type};
				break;
			}
		}
	}
	return value;
}

function showExitModal() {
	var modal = getElementByClass('exitModal');
	if (modal) {
		modalVisible = true;

		var width = getWindowWidth();
		var height = getWindowHeight();

		modal.style.width = width + 'px';
		modal.style.height = height + 'px';

		modal.style.display = 'block';

		console.log('width: ', width);
		console.log('height: ', height);

		if (locale) {
			// add localized texts to exit modal
			setLocalizedText('modalQuestionText', locale, 'modalQuestionText');
			setLocalizedText('yesButton_1', locale, 'yesButton_1');
			setLocalizedText('cancelButton_2', locale, 'cancelButton_2');
		}

		var okButton = getElementByClass('okButton');
		if (okButton) {
			okButton.focus();
		}
	}
}

function hideExitModal() {
	var modal = getElementByClass('exitModal');
	if (modal) {
		modal.style.display = 'none';
		modalVisible = false;
	}
}

