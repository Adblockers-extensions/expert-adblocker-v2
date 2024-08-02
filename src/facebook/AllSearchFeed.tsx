import observeMutations from "../utils/Observer";

//GET THE CURRENT URL AND RUN THE FUNCTION ACCODINGLY
const CURRENT_URL = window.location.href;
export async function SearchFeed() {
  switch (true) {
    case CURRENT_URL.startsWith("https://www.google.com"):
      const processFeedSponsor = () => {
        const spans = document.querySelectorAll("span");
        spans.forEach((span) => {
          if (span.textContent.includes("Sponsored")) {
            const parentElement = span.parentNode;
            if (parentElement && parentElement instanceof HTMLElement) {
              console.log(parentElement);
              parentElement.remove();
            }
          }
        });
      };
      observeMutations(processFeedSponsor);

      break;
    case CURRENT_URL.startsWith("https://www.bing.com"):
      const bingAdsDiv = document.querySelectorAll(".b_adTop ,.b_adLastChild");
      bingAdsDiv.forEach((div) => {
        if (div instanceof HTMLElement) {
          div.remove();
        }
      });
      const bingFeedAdsDiv = document.querySelectorAll(".b_algo");
      const resultDivs = [];
      bingFeedAdsDiv.forEach((div) => {
        const targetADSSpan = div.querySelector("span.algoSlug_icon");
        if (!targetADSSpan) {
          resultDivs.push(div);
          resultDivs.forEach((div) => {
            if (div && div instanceof HTMLElement) {
              div.remove();
              console.log(div, "removed");
            }
          });
        }
      });
      // console.log(resultDivs);
      break;
    case CURRENT_URL.startsWith("https://www.yahoo.com") ||
      CURRENT_URL.startsWith("https://search.yahoo.com"):
      const ADSDIV = document.querySelectorAll(
        '[data-content="Advertisement"], [class*=stream-ad], [class^=stream-ad], .searchCenterBottomAds, .searchCenterTopAds'
      );

      const YahooFeedAds = () => {
        ADSDIV.forEach((div) => {
          console.log(div);
          if (div instanceof HTMLElement) {
            div.remove();
          }
        });
      };
      observeMutations(YahooFeedAds);
      break;
    default:
      console.log("URL not handled.");
      break;
  }
}
