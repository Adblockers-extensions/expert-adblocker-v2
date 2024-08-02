import adsCount from "../utils/AdsCount";
import observeMutations from "../utils/Observer";
let fast = false;
let normal = false;
const TWITCH = () => {
  const adtext = document.querySelector(".kxfEVZ");
  const FORWARD = 4.5;
  const player = document.querySelectorAll("video")[0];
  console.log('STEP:1')
  if (player && player.buffered.length >= 1) {
  console.log('STEP:2')
    if (adtext?.textContent === "Ad ") {
  console.log('STEP:3')
      fastForward(player);
      return;
    } else {
      backToNormal(player);
    }
  }
  function fastForward(player) {
    if (!fast) {
      player.playbackRate = FORWARD;
      player.muted = true;
      // fast = true;
      // normal = false;
      // adsCount(Promise.resolve(1));
    }
  }
  function backToNormal(player) {
    if (!normal) {
      player.playbackRate = 1.0;
      player.muted = false;
      // fast = false;
      // normal = true;
    }
  }
};
observeMutations(TWITCH);
