// If switch is set to enabled remove ads on refresh 
chrome.storage.sync.get('enabled', function(result) {
    if (result.enabled) {
        RemoveAdSearchResults();
    }
  });


function RemoveAdSearchResults() {
    var bodyAds = document.getElementsByClassName('qGXjvb');
    var sideAds = document.getElementsByClassName('ptJHdc commercial-unit-desktop-rhs VjDLd');
    var bottomAds = document.getElementById('bottomads');
    var longscrollAds = document.getElementsByClassName('uEierd');
        
    // remove all body ads while greater than 0
    while (bodyAds.length > 0) {
        bodyAds[0].parentNode.removeChild(bodyAds[0]);
    }
    while (longscrollAds.length > 0) {
        longscrollAds[0].parentNode.removeChild(longscrollAds[0]);
    }
    bottomAds.remove();
    //bodyAds[0].parentNode.removeChild(bodyAds[0]);
    sideAds[0].parentNode.removeChild(sideAds[0]);

  }