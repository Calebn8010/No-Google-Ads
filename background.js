let color = '#212121';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cblack', `color: ${color}`);
  console.log(chrome.storage.sync.get());
});

// set extension to enabled when first installed
chrome.storage.sync.set({enabled: true}, function() {
});
