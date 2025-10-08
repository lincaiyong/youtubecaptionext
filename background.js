// Background script to handle API calls and avoid CORS issues

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fetchCaptions') {
    fetchCaptions(request.videoId)
      .then(data => sendResponse({ success: true, data }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true; // Keep message channel open for async response
  }
});

async function fetchCaptions(videoId) {
  console.log(`Background: Fetching captions for video: ${videoId}`);
  
  try {
    const response = await fetch(`https://goodfun.cc/youtube/caption/${videoId}?fmt=refine`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; YouTube Caption Extension)'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data && Array.isArray(data)) {
      console.log(`Background: Successfully loaded ${data.length} caption events`);
      return data;
    } else {
      console.warn('Background: API returned invalid data format');
      return [];
    }
  } catch (error) {
    console.error('Background: Failed to fetch captions:', error.message);
    throw error;
  }
}