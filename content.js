let captionEvents = [];
let isLoadingCaptions = false;

function getVideoId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('v');
}

async function fetchCaptions(videoId) {
  if (isLoadingCaptions) return;
  isLoadingCaptions = true;
  
  try {
    console.log(`Content: Requesting captions for video: ${videoId}`);
    
    // Send message to background script to fetch captions
    const response = await chrome.runtime.sendMessage({
      action: 'fetchCaptions',
      videoId: videoId
    });
    
    if (response.success) {
      captionEvents = response.data || [];
      console.log(`Content: Loaded ${captionEvents.length} caption events`);
    } else {
      console.error('Content: Failed to fetch captions:', response.error);
      captionEvents = [];
    }
  } catch (error) {
    console.error('Content: Error communicating with background script:', error);
    captionEvents = [];
  } finally {
    isLoadingCaptions = false;
  }
}

let currentVideoId = null;
let captionElement = null;
let currentCaptionEvent = null;

function createCaptionElement(videoContainer) {
  if (captionElement) {
    captionElement.remove();
  }
  
  captionElement = document.createElement('div');
  Object.assign(captionElement.style, {
    position: 'absolute',
    zIndex: '1000',
    bottom: '60px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontFamily: "'YouTube Noto', Roboto, Arial, Helvetica, sans-serif",
    fontSize: '20px',
    color: 'white',
    background: 'rgba(0, 0, 0, 0.8)',
    lineHeight: '1.3',
    borderRadius: '4px',
    padding: '8px 12px',
    display: 'none',
    width: '80%',
    textAlign: 'center',
    whiteSpace: 'pre-wrap'
  });
  
  videoContainer.appendChild(captionElement);
}

function showLoadingMessage() {
  if (captionElement) {
    captionElement.textContent = 'Loading captions...';
    captionElement.style.display = 'block';
    captionElement.style.opacity = '0.7';
  }
}

function hideLoadingMessage() {
  if (captionElement) {
    captionElement.style.opacity = '1';
  }
}

async function handleVideoChange() {
  const videoId = getVideoId();
  
  if (videoId && videoId !== currentVideoId) {
    console.log(`Video changed from ${currentVideoId} to ${videoId}`);
    currentVideoId = videoId;
    currentCaptionEvent = null;
    
    if (captionElement) {
      showLoadingMessage();
    }
    
    await fetchCaptions(videoId);
    hideLoadingMessage();
    
    if (captionEvents.length === 0 && captionElement) {
      captionElement.textContent = 'No captions available for this video';
      captionElement.style.display = 'block';
      setTimeout(() => {
        if (captionElement) {
          captionElement.style.display = 'none';
        }
      }, 3000);
    }
  }
}

function startTimeMonitor() {
  const player = document.getElementsByClassName('video-stream html5-main-video')[0];
  const videoContainer = document.getElementById('movie_player');
  
  if (!player || !videoContainer) {
    console.error('fail to find video player or container, try after 1 seconds');
    setTimeout(startTimeMonitor, 1000);
    return;
  }
  
  createCaptionElement(videoContainer);
  handleVideoChange();
  
  player.addEventListener('timeupdate', () => {
    if (captionEvents.length === 0) return;
    
    const pt = player.currentTime;
    if (!currentCaptionEvent || pt < currentCaptionEvent.start || pt >= currentCaptionEvent.end) {
      currentCaptionEvent = null;
      captionElement.style.display = 'none';
      
      for (const e of captionEvents) {
        if (e.start <= pt && pt < e.end) {
          captionElement.textContent = e.text;
          captionElement.style.display = 'block';
          currentCaptionEvent = e;
          break;
        }
      }
    }
  });
  
  // Monitor URL changes for video switching
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      setTimeout(handleVideoChange, 1000); // Delay to ensure page is loaded
    }
  }).observe(document, { subtree: true, childList: true });
}

// Initialize when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startTimeMonitor);
} else {
  startTimeMonitor();
}