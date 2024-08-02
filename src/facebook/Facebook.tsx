import adsCount from "../utils/AdsCount";
import observeMutations from "../utils/Observer";

// GET THE CURRENT URL AND RUN THE FUNCTION ACCORDINGLY
const CURRENT_URL = window.location.href;
const postParentDivs = document.querySelectorAll(".x1hc1fzr.x1unhpq9.x6o7n8i");
const feedPostType = document.querySelectorAll('div[role="main"]');
const sponsoredDivs = document.querySelectorAll('[role="complementary"]');

const POST = new Set();
const IMAGE = new Set();
const HEADING = new Set();
export async function FacebookFeedSponser() {
  //
  if (sponsoredDivs) {
    sponsoredDivs.forEach((div) => {
      if (!(div instanceof HTMLElement)) return;
      if (!div.dataset.processed) {
        const targetDiv = div.querySelector(".x1y1aw1k");
        if (targetDiv) {
          const sideSponsorDiv = div.querySelector("span");
          if (sideSponsorDiv) {
            sideSponsorDiv.style.display = "none";
          } else {
            console.log("No span found within targetDiv.");
          }
        } else {
          console.log(
            "No div with class name x1y1aw1k found within sponsoredDivs."
          );
        }
        div.dataset.processed = "true";
      }
    });
  }
  //
  if (!CURRENT_URL.startsWith("https://www.facebook.com")) return;
  const processFeedSponsor = () => {
    feedPostType.forEach((feed) => {
      if (feed && feed instanceof HTMLElement) {
        postParentDivs.forEach((post) => {
          if (!(post instanceof HTMLElement)) return;
          if (post.classList.length === 3) {
            // post.dataset.processed = "true";
            postDiv(post);
          }
        });
      } else {
        console.log("NO FEED AVAILABLE NOW");
      }
    });
  };

  observeMutations(processFeedSponsor);
}

function postDiv(post) {
  const EachPostDiv = post.querySelectorAll(".x1lliihq");
  EachPostDiv.forEach((element) => {
    if (
      element &&
      element instanceof HTMLElement &&
      element.classList.length === 1
    ) {
      POST.add(element);
    }
  });

  compare();
  getAllPostSpan();
  sponsoredVideos();
}

function getAllPostSpan() {
  const texts = [];
  POST.forEach((post: HTMLElement) => {
    const siblingSpans = Array.from(
      (post as HTMLElement).querySelectorAll(
        ".html-div.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x6ikm8r.x10wlt62"
      ) || []
    );
    siblingSpans.forEach((span) => {
      if (span && span instanceof HTMLElement && span.classList.length === 12) {
        // console.log((span as HTMLElement).innerText.trim());
        const text = span.innerText.trim();
        texts.push(text);
      }
    });
  });
  return texts;
}

function sponsoredVideos(){
 
  POST.forEach((div) => {
    if (!(div instanceof HTMLElement)) return;

    let shouldHide = false;

    if (!div.dataset.processed) {
        const videos = div.querySelectorAll('video.x1lliihq.x5yr21d.xh8yej3');
        videos.forEach((video) => {
            if (isExactClasses(video, ['x1lliihq', 'x5yr21d', 'xh8yej3'])) {
              console.log(video);
                shouldHide = true;
            }
        });
    }

    if (shouldHide) {
        div.style.display = "none";
        adsCount("Facebook", Promise.resolve(1));
        div.dataset.processed = "true";
    }
});

function isExactClasses(element, classes) {
    const classList = Array.from(element.classList);
    return classList.length === classes.length && classes.every(className => classList.includes(className));
}

}

function compare() {
  POST.forEach((div) => {
    if (!(div instanceof HTMLElement)) return;
    if (!div.dataset.processed) {
      const headingElementsInDiv =
        div.querySelectorAll<HTMLElement>("span strong");
      const imagesInDiv = div.querySelectorAll<HTMLImageElement>("img");
      let shouldHide = false;
      // Check each heading in the post div
      headingElementsInDiv.forEach((heading) => {
        const headingText = heading.innerText || heading.textContent;
        const normalizedHeadingText = headingText
          .replace(/[^\w\s]/gi, "")
          .toLowerCase();
        const otherSpansText = getAllPostSpan().map((text) =>
          text.replace(/[^\w\s]/gi, "").toLowerCase()
        );
        imagesInDiv.forEach((image) => {
          if (image.naturalWidth > 300 && image.naturalHeight > 300) {
            const imageAlt = image.getAttribute("alt");
            if (
              imageAlt &&
              normalizedHeadingText.includes(
                imageAlt
                  .trim()
                  .replace(/[^\w\s]/gi, "")
                  .toLowerCase()
              )
            ) {
              shouldHide = true;
              return;
            } else if (
              imageAlt &&
              otherSpansText.some((text) =>
                text.includes(imageAlt.replace(/[^\w\s]/gi, "").toLowerCase())
              )
            ) {
              shouldHide = true;
              return;
            } else if (imageAlt === "Image") {
              shouldHide = true;
              return;
            }
          }
        });
      });
      // If any image alt text is found in the heading, hide the post div
      if (shouldHide) {
        div.style.display = "none";
        adsCount("Facebook",Promise.resolve(1))
        // Mark the div as processed to avoid reprocessing
        console.log(div, "HIDDEN");
        div.dataset.processed = "true";
      }
    }
  });
}

export default FacebookFeedSponser;