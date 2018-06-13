var pinboardUrl = "http://pinboard.in/add?";
var url;
var title;
function add_bookmark() {
	chrome.tabs.query( {active: true, currentWindow: true} , function(tab) {
		url = tab[0].url;
		title = tab[0].title;
		open_url(tab[0],pinboardUrl + 'url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title) + ' ','Pinboard','toolbar=no,width=700,height=350');
	});
}

function add_later() {
    chrome.tabs.query( {active: true, currentWindow: true} , function(tab) {
        url = tab[0].url;
        title = tab[0].title;
		open_url(tab,pinboardUrl + 'later=yes&noui=yes&jump=close&url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title) + ' ','Pinboard','toolbar=no,width=100,height=100');
	});
}

function open_url(tab,url) {
	switch (localStorage['open_in']) {
	case 'current_tab':
		chrome.tabs.update(tab.id,{url: url});
		break;
	case 'new_tab':
		chrome.tabs.create({url: url, index: tab.index});
		break;
	case 'popup': default:
		chrome.windows.create({url: url});
		break;
	}
}

function get_active_tab() {
    chrome.tabs.query({ currentWindow: true, active: true }, function(tabs){});
}

document.addEventListener('DOMContentLoaded', function() {
	document.querySelector('div#save').addEventListener('click',add_bookmark);
	document.querySelector('div#later').addEventListener('click',add_later);
    document.querySelector('div#unread').addEventListener('click',() => {
    	open_url(get_active_tab,'https://pinboard.in/toread/')});
	document.querySelector('div#go_home').addEventListener('click',() => {
		open_url(get_active_tab,'http://pinboard.in/')});
	document.querySelector('div#go_network').addEventListener('click', () => {
		open_url(get_active_tab,'https://pinboard.in/network/')})
});
