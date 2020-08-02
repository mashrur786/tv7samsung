function setLocalizedText(item, locale, elementId, localeData) {
	setTimeout(function() {
		var localizedText = '';

		for(var i = 0; i < localeData.length; i++) {
			var ld = localeData[i];
			if (ld && ld.item === item) {
				for(var j = 0; j < ld.locales.length; j++) {
					var ldl = ld.locales[j];

					if (ldl && ldl.locale === locale) {
						localizedText = ldl.text;
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
	});
}
