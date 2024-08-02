import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./popup.css";

const App: React.FC<{}> = () => {
  const [blockedCount, setBlockedCount] = useState([]);

  useEffect(() => {
    chrome.storage.local.get(["AdsData"], function (result) {
      if (result.AdsData) {
        const parsedData = JSON.parse(result.AdsData);
        setBlockedCount(parsedData);
        console.log(parsedData);
      }
    });
  }, []);

  return (
    <>
      <Loader blockedCount={blockedCount} />
    </>
  );
};

const Loader = ({ blockedCount }) => {
  const [isActiveYoutube, setIsActiveYoutube] = useState(true);
  const [currentURL, setCurrentURL] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const [isConnecting, setisConnecting] = useState(false);
  const [onThisPage, setOnThisPage] = useState(0);
  const [totalAds, setTotalAds] = useState(0);
  let total = 0;

  useEffect(() => {
    chrome.tabs.query(
      { active: true, lastFocusedWindow: true },
      function (tabs) {
        const currentTab = tabs[0];
        const currentUrl = currentTab.url;
        const url = new URL(currentUrl);
        setCurrentURL(url.hostname.split(".")[1]);
        setCurrentPage(url.pathname);
      }
    );
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("appData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setIsActiveYoutube(parsedData.isActiveYoutube);
    }
  }, []);

  useEffect(() => {
    const dataToStore = { isActiveYoutube };
    localStorage.setItem("appData", JSON.stringify(dataToStore));
  }, [isActiveYoutube]);

  useEffect(() => {
    let totalAds = 0;
    for (let i = 0; i < blockedCount.length; i++) {
      if (!isNaN(i)) {
        totalAds += blockedCount[i].count;
      }
    }
    setTotalAds(totalAds);

    switch (currentURL) {
      case "sonyliv":
        setOnThisPage(blockedCount[0]?.count);
        break;
      case "max":
        setOnThisPage(blockedCount[1]?.count);
        break;
      case "youtube":
        setOnThisPage(blockedCount[2]?.count);
        break;
      case "facebook":
        setOnThisPage(blockedCount[3]?.count);
        break;
      case "instagram":
        setOnThisPage(blockedCount[4]?.count);
        break;
      case "hulu":
        setOnThisPage(blockedCount[5]?.count);
        break;
      case "jiocinema":
        setOnThisPage(blockedCount[6]?.count);
        break;
      case "peacocktv":
        setOnThisPage(blockedCount[7]?.count);
        break;
      case "crunchyroll":
        setOnThisPage(blockedCount[8]?.count);
        break;
      case "spotify":
        setOnThisPage(blockedCount[9]?.count);
        break;
      case "hotstar":
        setOnThisPage(blockedCount[10]?.count);
        break;
    }
  }, [currentURL, blockedCount]);

  const onAdBlocker = () => {
    setIsActiveYoutube(!isActiveYoutube);
    setisConnecting(true);
    setTimeout(() => {
      setisConnecting(false);
      // Code to handle turning on ad blocking
    }, 2000);
    const message = { message: true };
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab) {
        chrome.tabs.sendMessage(activeTab.id!, message, (response) => {
          if (response && response.farewell) {
            console.log(response.farewell, "response");
          }
        });
      }
    });
  };

  const offAdBlocker = () => {
    setIsActiveYoutube(!isActiveYoutube);
    setisConnecting(false);
    const message = { message: false };
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab) {
        chrome.tabs.sendMessage(activeTab.id!, message, (response) => {
          if (response && response.farewell) {
            console.log(response.farewell, "response");
          }
        });
      }
    });
  };

  //POP UP UI
  return (
    <>
      <div className="expert-adblocker-popoup__container">
        <h2>EXPERT</h2>
        <div className="top">
          <div className="logo">
            <div className="logo-container">
              <h1>Expert</h1>
              <span>Adblocker</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="182"
              height="9"
              viewBox="0 0 182 9"
              fill="none"
            >
              <g filter="url(#filter0_f_584_2025)">
                <ellipse
                  cx="91.0769"
                  cy="4.6314"
                  rx="87.8718"
                  ry="0.955128"
                  fill="#212121"
                />
              </g>
              <defs>
                <filter
                  id="filter0_f_584_2025"
                  x="0.339755"
                  y="0.810885"
                  width="181.474"
                  height="7.64105"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="1.43269"
                    result="effect1_foregroundBlur_584_2025"
                  />
                </filter>
              </defs>
            </svg>
          </div>
          <div className="expert-adblocker-adCount-container">
            {currentURL && <div className="website-name">{currentURL}</div>}
            <p className="text">NUMBERS OF ADS BLOCKED</p>
            <div className="adCount-container">
              <div className="on-this-page">
                <p>On this page</p>
                <p>{onThisPage}</p>
              </div>
              <div className="in-total">
                <p>In Total</p>
                <p>{totalAds}</p>
              </div>
            </div>
            <div className="toggle-switch">
              <button
                onClick={isActiveYoutube ? offAdBlocker : onAdBlocker}
                className="connected-btn"
              >
                {isActiveYoutube ? <span>OFF</span> : <span>ON</span>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const root = document.createElement("div");
root.classList.add("expert-adblocker-popoup");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
