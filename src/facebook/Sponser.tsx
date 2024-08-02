import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { FacebookFeedSponser } from "./Facebook";
import { InstagramFeedSponser } from "./Instagram";
import { SearchFeed } from "./AllSearchFeed";
const App: React.FC<{}> = () => {
  const [DOM, setDOM] = useState(false);
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "DOMLOADED") {
      console.log("Message received:", message);
    }
  });
  useEffect(() => {

        facebookBlocker();

  }, []);

  async function facebookBlocker() {
    FacebookFeedSponser();
    SearchFeed();
    InstagramFeedSponser();
  }

  return <></>;
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
