export default async function adsCount(AdsPath: string, resultPromise: Promise<number>) {
    try {
        const response = await resultPromise;

        // Initialize the default count data
        const defaultCountData = [
            {
                name: 'SonyLiv',
                count: 0
            },
            {
                name: 'HboMax',
                count: 0
            },
            {
                name: 'YouTube',
                count: 0
            },
            {
                name: 'Facebook',
                count: 0
            },
            {
                name: 'Instagram',
                count: 0
            },
            {
                name: 'Hulu',
                count: 0
            },
            {
                name: 'Jio Cinema',
                count: 0
            },
            {
                name: 'Peacock',
                count: 0
            },
            {
                name: 'Crunchy Roll',
                count: 0
            },
            {
                name: 'Spotify',
                count: 0
            },
            {
                name:"Disney+Hotstar",
                count:0
            }
        ];

        // First, ensure AdsData is initialized if not already present
        chrome.storage.local.get(['AdsData'], function (result) {
            if (!result.AdsData) {
                chrome.storage.local.set({ AdsData: JSON.stringify(defaultCountData) }, function () {
                });
            }
        });

        // Update the blockedAds count
        chrome.storage.local.get("blockedAds", function (result) {
            const prevBlocked = result.blockedAds || 0;
            const newBlocked = prevBlocked + response;
            chrome.storage.local.set({ blockedAds: newBlocked }, function () {
                // Update AdsData with the newBlocked value
                chrome.storage.local.get(['AdsData'], function (result) {
                    let parsedData = defaultCountData;
                    if (result.AdsData) {
                        parsedData = JSON.parse(result.AdsData);
                    }

                    // Find the index of the service and update its count
                    const serviceIndex = parsedData.findIndex(item => item.name === AdsPath);
                    if (serviceIndex !== -1) {
                        parsedData[serviceIndex].count += response;
                    } else {
                        // If the service is not found, add it to the list
                        parsedData.push({ name: AdsPath, count: newBlocked });
                    }

                    // Save the updated data
                    chrome.storage.local.set({ AdsData: JSON.stringify(parsedData) }, function () {
                    });
                });
            });
        });
    } catch (error) {
        console.error("Error updating ad counts:", error);
    }
}
