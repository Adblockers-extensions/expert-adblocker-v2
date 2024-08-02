chrome.runtime.onInstalled.addListener((details) => {
  switch (details.reason) {
    case "install":
      console.info("EXTENSION INSTALLED");
      const urlPrefixes = [
        "https://www.youtube.com",
        "https://www.twitch.tv/",
        "https://open.spotify.com",
        "https://www.hulu.com",
      ];
      chrome.tabs.query({ active: false, currentWindow: false }, (tabs) => {
        if (tabs.length === 0) {
          console.log("No active tabs.");
        }
        tabs
          .filter((tab) =>
            urlPrefixes.some((prefix) => tab.url.startsWith(prefix))
          )
          .forEach(({ id }) => {
            console.log("TABS DETECTED:", id);
            chrome.tabs.reload(id);
          });
      });
      chrome.storage.local.set({ ExtensionState: true });

      chrome.tabs.create({ url: "https://www.expertadblocker.com/" });
      break;
    case "update":
      console.info("EXTENSION UPDATED");
      break;
    default:
      console.info("BROWSER UPDATED");
      break;
  }

});

chrome.runtime.onStartup.addListener(() => {
  const defaultCountData = [
    {
      name: 'SonyLiv',
      count: 0
    },
    {
      name: 'HboMax',
      count: 0
    },
    {
      name: 'YouTube',
      count: 0
    },
    {
      name: 'Facebook',
      count: 0
    },
    {
      name: 'Instagram',
      count: 0
    },
    {
      name: 'Hulu',
      count: 0
    },
    {
      name: 'Jio Cinema',
      count: 0
    },
    {
      name: 'Peacock',
      count: 0
    },
    {
      name: 'Crunchy Roll',
      count: 0
    },
    {
      name: 'Spotify',
      count: 0
    },
    {
      name: "Disney+Hotstar",
      count: 0
    }
  ]
  chrome.storage.local.set({ AdsData: JSON.stringify(defaultCountData) }).then(() => {
    console.log("Value is set");
  });
});
