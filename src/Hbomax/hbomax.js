import adsCount from "../utils/AdsCount";
import observeMutations from "../utils/Observer";
let fast = false;
let normal = false;
let adtext = false;
const HBOMAX = () => {
  const FORWARD = 5.5;
  const ad = document.querySelector('[data-testid="ad"]');
  const player = document.querySelectorAll("video");
  if (ad) {
    if (ad.style.visibility === "visible") {
      adtext = true;
    } else if (ad.style.visibility === "hidden") {
      adtext = false;
    }
  }

  if (player && adtext === true) {
    player.forEach(fastForward);
  } else {
    player.forEach(backToNormal);
  }

  function fastForward(player) {
    player.playbackRate = FORWARD;
    player.muted = true;
    if (!fast) {
      fast = true;
      normal = false;
      adsCount("HboMax", Promise.resolve(1));
    }
  }
  function backToNormal(player) {
    player.playbackRate = 1.0;
    player.muted = false;
    if (!normal) {
      fast = false;
      normal = true;
    }
  }
};

observeMutations(HBOMAX);
