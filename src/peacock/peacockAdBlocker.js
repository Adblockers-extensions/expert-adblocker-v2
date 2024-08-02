import adsCount from "../utils/AdsCount";
import observeMutations from "../utils/Observer";

let remainingTimeSet = false;

const checkForAdCountdown = () => {
  const adCountdownGuide = document.querySelector(".ad-countdown__guide");
  const adVideoElement = document.getElementById("core-video-shaka");

  if (adCountdownGuide && adVideoElement && !remainingTimeSet) {
    const remainingTimeDiv = document.querySelector(
      ".ad-countdown__remaining-time"
    );

    if (remainingTimeDiv) {
      const remainingTimeText = remainingTimeDiv.textContent;
      const remainingTimeInSeconds = parseInt(remainingTimeText, 10) + 1;
      adVideoElement.style.visibility = "hidden";
      adVideoElement.muted = true;
      adVideoElement.currentTime += remainingTimeInSeconds;
      adVideoElement.style.visibility = "visible";
      adVideoElement.muted = false;
      remainingTimeSet = true;
      adsCount("Peacock", Promise.resolve(1));
    }
  } else if (!adCountdownGuide || !adVideoElement) {
    remainingTimeSet = false;
  }
};

observeMutations(checkForAdCountdown);
