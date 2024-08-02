import adsCount from "../utils/AdsCount";
import observeMutations from "../utils/Observer";

let lowclicked = false;
let highclicked = false;
const Hulu = () => {
  const FORWARD = 6;
  let playerDiv = document.querySelector("#web-player-app");
  if (playerDiv) {
    let adtext = playerDiv.querySelector("div.AdUnitView");
    let player = playerDiv.querySelectorAll("video");
    if (adtext && player) {
      player.forEach(fastForward);
    } else {
      player.forEach(backToNormal);
    }
  }

  function fastForward(player) {
    player.playbackRate = FORWARD;
    player.muted = true;
    const qualityContainer = document.querySelector(
      ".controls__setting-quality.controls__setting--navigable"
    );
    if (qualityContainer && !lowclicked) {
      qualityContainer.click();
      const lowQuality = document.querySelector(
        '.controls__setting-option[data-val="2150400"]'
      );
      if (lowQuality) {
        adsCount("Hulu",Promise.resolve(1));
        lowclicked = true;
        highclicked = false;
        lowQuality.click();
      }
    }
  }

  function backToNormal(player) {
    player.playbackRate = 1.0;
    player.muted = false;
    const qualityContainer = document.querySelector(
      ".controls__setting-quality.controls__setting--navigable"
    );
    if (qualityContainer && !highclicked) {
      qualityContainer.click();
      const highQuality = document.querySelector(
        '.controls__setting-option[data-val="Infinity"]'
      );
      if (highQuality) {
        highclicked = true;
        lowclicked = false;
        highQuality.click();
      }
    }
  }
};

observeMutations(Hulu);
