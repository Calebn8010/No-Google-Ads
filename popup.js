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
  var topAds = document.getElementsByClassName('qGXjvb');
  var sideAds = document.getElementsByClassName('TQc1id hSOk2e rhstc4')
  var bottomAds = document.getElementById('bottomads');
  topAds[0].parentNode.removeChild(topAds[0]);
  sideAds[0].parentNode.removeChild(sideAds[0]);
  bottomAds.remove();
}