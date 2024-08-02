export default function observeMutations(callback) {
  const handleMutation = (mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList" || mutation.type === "attributes") {
        callback(mutation);
      }
    
    }
  };
  const observer = new MutationObserver(handleMutation);
  observer.observe(document, {
    childList: true,
    subtree: true,
    attributes: true,
  });

  return observer;
}
