// initalize switch toggle
chrome.storage.sync.get('enabled', function(result) {
  //alert('Value currently is ' + result.enabled);
  document.getElementById("switch1").checked = result.enabled;
  if (result.enabled) {
    document.getElementById("switchText").innerHTML = "Enabled";
  }
  else {
    document.getElementById("switchText").innerHTML = "Disabled";
  }
});


let switch1 = document.getElementById("switch1");
//let switch1 = document.querySelector("input[name=switch1]");

// When switch is toggled change text to enabled / disabled, and change chrome enabled variable to true / false
switch1.addEventListener("change", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (switch1.checked) {
    document.getElementById("switchText").innerHTML = "Enabled";
    chrome.storage.sync.set({enabled: true}, function() {
    });
    // Remove ads from page before refresh
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: RemoveAdSearchResults,
    });
  }
  else {
    document.getElementById("switchText").innerHTML = "Disabled";
    chrome.storage.sync.set({enabled: false}, function() {
    });
    // Reload page with ads
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: ReloadAds,
    });
  }
  
});


function RemoveAdSearchResults() {
  console.log(document.getElementsByClassName('qGXjvb'));
  var bodyAds = document.getElementsByClassName('qGXjvb');
  console.log(bodyAds.length);
  //var sideAds = document.getElementsByClassName('TQc1id hSOk2e rhstc4')
  var sideAds = document.getElementsByClassName('ptJHdc commercial-unit-desktop-rhs VjDLd');
  var bottomAds = document.getElementById('bottomads');
  var longscrollAds = document.getElementsByClassName('uEierd');
  //var bottomAds = document.getElementById('ptJHdc commercial-unit-desktop-top');
  //var tads = document.getElementById('tadsb');
  
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

function ReloadAds() {
  window.location.reload();
}