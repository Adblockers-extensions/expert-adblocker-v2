chrome.storage.local.get("ExtensionState", function (data) {
  const local = data.ExtensionState;
  doSomethingWithLocal(local);
});
  ////////receiving message from popup.js////////
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.message == true) {
      chrome.storage.local.set({ isInstalled: true }, () => {
        console.log("Value is set true");
      });
      window.location.reload();
    } else if (request.message == false) {
      chrome.storage.local.set({ isInstalled: false }, () => {
        console.log("Value is set to false");
      });
      window.location.reload();
    } else {
      return;
    }
    sendResponse({ farewell: "Response from background script" });
  });
function doSomethingWithLocal(local){
  if(local === true){
    const injectScript = function (filename) {
      const s = document.createElement("script");
      s.src = chrome.runtime.getURL(filename);
      s.onload = function () {
        this.remove();
      };
      (document.head || document.documentElement).appendChild(s);
    };
    
    ["adswsHooksSpotify.js", "adsAdsRemoveSpotify.js", "adsSweetalertSpotify.js"].forEach(injectScript);
    
  }else{
    return
  }
}
