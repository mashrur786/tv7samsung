var localization = [
	{
		item: 'toolbarText', locales: [
			{locale: 'fi', text: 'Kun sisältö ratkaisee'},
			{locale: 'ee', text: 'Kui sisu on oluline'},
			{locale: 'se', text: 'When the content matter'},
			{locale: 'ru', text: 'When the content matter'}
		]
	},
	{
		item: 'modalQuestionText', locales: [
			{locale: 'fi', text: 'Sulje TV7 sovellus?'},
			{locale: 'ee', text: 'Close TV7 application?'},
			{locale: 'se', text: 'Close TV7 application?'},
			{locale: 'ru', text: 'Close TV7 application?'}
		]
	},
	{
		item: 'yesButton_1', locales: [
			{locale: 'fi', text: 'Kyllä'},
			{locale: 'ee', text: 'Yes'},
			{locale: 'se', text: 'Yes'},
			{locale: 'ru', text: 'Yes'}
		]
	},
	{
		item: 'cancelButton_2', locales: [
			{locale: 'fi', text: 'Peruuta'},
			{locale: 'ee', text: 'Cancel'},
			{locale: 'se', text: 'Cancel'},
			{locale: 'ru', text: 'Cancel'}
		]
	},
	{
		item: 'settingsText', locales: [
			{locale: 'fi', text: 'Asetukset'},
			{locale: 'ee', text: 'Settings'},
			{locale: 'se', text: 'Settings'},
			{locale: 'ru', text: 'Settings'}
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

