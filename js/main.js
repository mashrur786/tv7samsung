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
			setLocalizedText('toolbarText', locale, 'toolbarText', localeData);
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
			// LEFT arrow
			if (!modalVisible) {
				var columnNbr = Number(split[2]) - 1;
				if (columnNbr > 0) {
					newId = split[0] + '_' + split[1] + '_' + columnNbr;
				}
				else if (columnNbr === 0) {
					newId = 'r_1_0';
					settingsMenuOpen = true;
				}
			}
			else {
				if (contentId === 'exitCancelButton') {
					newId = 'exitYesButton';
				}
			}
		}
		else if (keyCode === UP && split) {
			// UP arrow - activate content item
			if (!modalVisible && !settingsMenuOpen) {
				var rowNbr = Number(split[1]) - 1;
				if (rowNbr > 0) {
					newId = split[0] + '_' + rowNbr + '_' + split[2];
				}
			}
		}
		else if (keyCode === RIGHT && split) {
			// RIGHT arrow
			if (!modalVisible) {
				var columnNbr = Number(split[2]) + 1;
				if (columnNbr < 3) {
					newId = split[0] + '_' + split[1] + '_' + columnNbr;
				}
			}
			else {
				if (contentId === 'exitYesButton') {
					newId = 'exitCancelButton';
				}
			}
		}
		else if (keyCode === DOWN && split) {
			// DOWN arrow - activate content item
			if (!modalVisible && !settingsMenuOpen) {
				var rowNbr = Number(split[1]) + 1;
				if (rowNbr < 3) {
					newId = split[0] + '_' + rowNbr + '_' + split[2];
				}
			}
		}
		else if (keyCode === OK) {
			// OK button
			if (!modalVisible) {
				var id = document.activeElement.id;

				if (!id) {
					activateContentElement();
					return;
				}

				if (id === 'r_1_0') {
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

				if (document.activeElement.id === 'exitYesButton') {
					// exit from application
					if (tizen) {
						tizen.application.getCurrentApplication().exit();
					}
				}
				else if (document.activeElement.id === 'exitCancelButton') {
					// cancel => to main view
					activateContentElement();
				}
			}
		}
		else if (keyCode === RETURN || keyCode === ESC) {
			// RETURN button
			if(settingsMenuOpen) {
				settingsMenuOpen = false;
				activateContentElement();
			}
			else if (!modalVisible) {
				showExitModal();
			}
			else if (modalVisible) {
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
		if (!activeId || activeId === 'r_1_0') {
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
		setLocalizedText('settingsText', locale, 'settingsText', localeData);
	}

	if (element) {
		element.classList.add('settingsMenuFadeIn');
	}
}

function focusOutFromSettings(element) {
	var settingsText = document.getElementById('settingsText');
	if (settingsText) {
		settingsText.style.display = 'none';
	}

	if (element) {
		element.classList.remove('settingsMenuFadeIn');
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
			setLocalizedText('modalQuestionText', locale, 'modalQuestionText', localeData);
			setLocalizedText('exitYesButton', locale, 'exitYesButton', localeData);
			setLocalizedText('exitCancelButton', locale, 'exitCancelButton', localeData);
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

