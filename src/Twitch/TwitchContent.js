import adsCount from "../utils/AdsCount";
import observeMutations from "../utils/Observer";
const TWITCH = () => {
  const player = document.querySelector("#amazon-video-ads-iframe");
  const videoElement = player?.contentWindow.document.querySelector('video');
  if (videoElement) {
    let randomNumber = Math.random() * (0.5 - 0.1) + 0.1;
    videoElement.currentTime = videoElement.duration + randomNumber || 0;
    adsCount("Twitch",Promise.resolve(1));
  }
};
observeMutations(TWITCH);
