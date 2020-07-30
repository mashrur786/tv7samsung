var localization = [
	{
		item: 'selectLocalizationText', locales: [
			{locale: 'fi', text: 'Valitse kieli'},
			{locale: 'ee', text: 'Select language'},
			{locale: 'se', text: 'Select language'},
			{locale: 'ru', text: 'Select language'}
		]
	}
];

function setLocalizedText(item, locale, elementId) {
	var localizedText = '';

	for(var i = 0; i < localization.length; i++) {
		var lzn = localization[i];
		if (lzn && lzn.item === item) {
			for(var j = 0; j < lzn.locales.length; j++) {
				var lls = lzn.locales[j];

				if (lls && lls.locale === locale) {
					localizedText = lls.text;
					break;
				}
			}
		}

		if(localizedText.length) {
			break;
		}
	}

	var elem = document.getElementById(elementId);
	if (elem) {
		elem.innerHTML = localizedText;
	}
}

