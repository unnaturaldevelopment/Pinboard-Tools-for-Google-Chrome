var pinboardUrl = "http://pinboard.in/add?";
var url;
var title;
function add_bookmark() {
	chrome.tabs.getSelected( null , function(tab) {
		url = (tab.url);
		title = (tab.title);
		open_url(tab,pinboardUrl + 'url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title) + ' ','Pinboard','toolbar=no,width=700,height=350');
	});
}

function add_later() {
	chrome.tabs.getSelected( null , function(tab) {
		url = (tab.url);
		title = (tab.title);
		open_url(tab,pinboardUrl + 'later=yes&noui=yes&jump=close&url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title) + ' ','Pinboard','toolbar=no,width=100,height=100');
	});
}

function open_url(tab, addUrl, title, options) {
	switch (localStorage['open_in']) {
	case 'current_tab':
		chrome.tabs.update(tab.id,{url: addUrl});
		break;
	case 'new_tab':
		chrome.tabs.create({url: addUrl, index: tab.index});
		break;
	case 'popup': default:
		window.open(addUrl, title, option);
		break;
	}
}
