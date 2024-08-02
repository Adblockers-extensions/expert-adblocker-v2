import adsCount from "../utils/AdsCount";
import observeMutations from "../utils/Observer";

const SONY_LIVE = () => {
  const AddContainer = document.querySelector(".ad-wrapper");
  if (AddContainer) {
    AddContainer.remove();
    adsCount("SonyLiv", Promise.resolve(1));
  }
  return;
};

observeMutations(SONY_LIVE);
