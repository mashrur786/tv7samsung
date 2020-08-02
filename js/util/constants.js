var urls = [
	{element: 'r_1_1', url: 'https://vod.tv7.fi:443/tv7-fi/_definst_/smil:tv7-fi.smil/playlist.m3u8', type: 'fi'},
	{element: 'r_1_2', url: 'https://vod.tv7.fi:443/tv7-ee/_definst_/smil:tv7-ee.smil/playlist.m3u8', type: 'ee'},
	{element: 'r_2_1', url: 'https://vod.tv7.fi:443/tv7-se/_definst_/smil:tv7-se.smil/playlist.m3u8', type: 'se'},
	{element: 'r_2_2', url: 'https://vod.tv7.fi:443/tv7-ru/_definst_/smil:tv7-ru.smil/playlist.m3u8', type: 'ru'}
];

var _self = '_self';

var mainPage = '../html/main.html';
var playerPage = '../html/player.html';
var localizationPage = '../html/localization.html';

var localizationKey = 'tv7Localization';
var localeEn = 'menuItem_0';
var localeFi = 'menuItem_1';
var localeEe = 'menuItem_2';
var localeSe = 'menuItem_3';
var localeRu = 'menuItem_4';

var en = 'en';
var fi = 'fi';
var ee = 'ee';
var se = 'se';
var ru = 'ru';

var localizationKey = 'tv7Localization';

var playIcon = '../images/play_circle_black.svg';
var pauseIcon = '../images/pause_circle_black.svg';

var fromPage = 'fromPage';

// keycodes
var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;
var OK = 13;
var RETURN = 10009;
var ESC = 27;


var settingsMenuId = 'r_1_0';
var taivasContentId = 'r_1_1';
var exitYesButton = 'exitYesButton';
var exitCancelButton = 'exitCancelButton';
var mainActiveElementId = 'mainActiveElementId';

var streamType = 'application/x-mpegURL';
