// Initialize butotn with users's prefered color
let changeColor = document.getElementById("changeColor");
//let changeColor = "#3D3D3D";
//console.log('ElementById', document.getElementById());
chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  /*chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });*/
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: RemoveAdSearchResults,
  });
});

// The body of this function will be execuetd as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
    //document.defaultView. = "#7B7B7B";
  });
}

function RemoveAdSearchResults() {
  console.log(document.getElementsByClassName('qGXjvb'));
  var bodyAds = document.getElementsByClassName('qGXjvb');
  console.log(bodyAds.length);
  //var sideAds = document.getElementsByClassName('TQc1id hSOk2e rhstc4')
  var sideAds = document.getElementsByClassName('ptJHdc commercial-unit-desktop-rhs VjDLd');
  var bottomAds = document.getElementById('bottomads');
  //var bottomAds = document.getElementById('ptJHdc commercial-unit-desktop-top');
  //var tads = document.getElementById('tadsb');
  
  // remove all body ads while greater than 0
  while (bodyAds.length > 0) {
    bodyAds[0].parentNode.removeChild(bodyAds[0]);
  }
  bottomAds.remove();
  //bodyAds[0].parentNode.removeChild(bodyAds[0]);
  sideAds[0].parentNode.removeChild(sideAds[0]);
  
  
  //tads.remove();
}