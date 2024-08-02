import observeMutations from "../utils/Observer";
import adsCount from "../utils/AdsCount";

const jioCinema = (mutation) => {
  if (mutation.type === "childList") {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "VIDEO") {
        if (node.getAttribute("title") === "Advertisement") {
          node.addEventListener("loadedmetadata", () => {
            const controls = document.querySelector(
              ".mui-style-esv9wg-hideControls"
            );

            const skipButton = document.querySelector(
              ".videoAdUi.trueview.videoAdUiInstreamUxRefresh.ima-action-ad"
            );

            if (controls) {
              controls.style.display = "none";
            }

            if (skipButton) {
              skipButton.style.display = "none !important";
            }

            node.muted = true;
            node.style.display = "none";
            if (!isNaN(node.duration) && isFinite(node.duration)) {
              node.currentTime = node.duration;
              adsCount("Jio Cinema",Promise.resolve(1));
            }
            controls.style.display = "block";
          });
        }
      }
    });
  }
};

observeMutations(jioCinema);
