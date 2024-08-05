import adsCount from "../utils/AdsCount";
import observeMutations from "../utils/Observer";

const TWITCH = () => {
  const player = document.querySelector("#amazon-video-ads-iframe");
  const videoElement = player?.contentWindow.document.querySelector('video');
  if (videoElement) {
    console.log(videoElement,"Video Element")
    let randomNumber = Math.random() * (0.5 - 0.1) + 0.1;
    videoElement.currentTime = videoElement.duration + randomNumber || 0;
    // Check if the currentTime of the videoElement is equal to its duration
    if (videoElement.currentTime === videoElement.duration) {
      console.log("Twitch Ad Blocked");
      adsCount("Twitch", Promise.resolve(1)); // Call adsCount only once under this condition
    }
  }
};

observeMutations(TWITCH);