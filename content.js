const captionEvents = [
  {
    "start": 3.92,
    "end": 5.339,
    "text": "Welcome to machine learning."
  },
  {
    "start": 6.48,
    "end": 11.4,
    "text": "What is machine learning? You probably use it many times a day without even knowing it."
  },
  {
    "start": 11.66,
    "end": 15.78,
    "text": "Anytime you want to find out something, like how do I make a sushi roll,"
  },
  {
    "start": 15.96,
    "end": 20.18,
    "text": "you can do a web search on Google, Bing, Baidu to find out."
  },
  {
    "start": 21.18,
    "end": 26.1,
    "text": "That works so well because machine learning software has figured out how to rank web pages."
  },
  {
    "start": 26.1,
    "end": 31.32,
    "text": "Or when you upload pictures to Instagram or Snapchat and think to yourself,"
  },
  {
    "start": 31.5,
    "end": 34.64,
    "text": "\"I want to tag my friends so they can see their pictures,\""
  },
  {
    "start": 35.64,
    "end": 39.66,
    "text": "these apps can recognize your friends in your pictures and label them as well."
  },
  {
    "start": 39.78,
    "end": 41.399,
    "text": "That's also machine learning."
  },
  {
    "start": 41.399,
    "end": 47.1,
    "text": "Or if you've just finished watching a Star Wars movie on a video streaming service,"
  },
  {
    "start": 47.28,
    "end": 50.18,
    "text": "and you think, \"What are the similar movies I could watch?\""
  },
  {
    "start": 51.18,
    "end": 55.739,
    "text": "The streaming service will likely use machine learning to recommend something you might like."
  },
  {
    "start": 55.739,
    "end": 59.94,
    "text": "Each time you use voice to text on your phone to write a text message,"
  },
  {
    "start": 59.94,
    "end": 61.86,
    "text": "like \"Hey Andrew, how's it going?\""
  },
  {
    "start": 62.039,
    "end": 65.339,
    "text": "or tell your phone, \"Hey Siri, play a song by Rihanna,\""
  },
  {
    "start": 65.519,
    "end": 70.26,
    "text": "or ask your phone, \"Okay Google, show me Indian restaurants near me,\""
  },
  {
    "start": 71.52,
    "end": 73.02,
    "text": "that's also machine learning."
  },
  {
    "start": 73.02,
    "end": 75.42,
    "text": "Each time you receive an email titled,"
  },
  {
    "start": 76.08,
    "end": 80.1,
    "text": "\"Congratulations, you've won a million dollars,\""
  },
  {
    "start": 80.7,
    "end": 85.14,
    "text": "or more likely, your email service will probably flag it as spam."
  },
  {
    "start": 85.5,
    "end": 88.5,
    "text": "That too is an application of machine learning."
  },
  {
    "start": 88.5,
    "end": 92.1,
    "text": "Beyond consumer applications that you might use,"
  },
  {
    "start": 92.34,
    "end": 97.259,
    "text": "AI is also rapidly making its way into big companies and industrial applications."
  },
  {
    "start": 97.259,
    "end": 102,
    "text": "For example, I'm deeply concerned about climate change,"
  },
  {
    "start": 102.119,
    "end": 108.78,
    "text": "and I'm glad to see that machine learning is already helping to optimize wind turbine power generation."
  },
  {
    "start": 108.78,
    "end": 115.979,
    "text": "Or in healthcare, it is starting to make its way into hospitals to help doctors make accurate diagnoses."
  },
  {
    "start": 117.36,
    "end": 122.52,
    "text": "Recently at Landing AI, I've been doing a lot of work putting computer vision into factories"
  },
  {
    "start": 123.119,
    "end": 127.68,
    "text": "to help inspect if something coming off the assembly line has any defects."
  },
  {
    "start": 127.68,
    "end": 130.319,
    "text": "That's machine learning."
  },
  {
    "start": 131.039,
    "end": 135.36,
    "text": "It's a science of getting computers to learn without being explicitly programmed."
  },
  {
    "start": 135.36,
    "end": 139.44,
    "text": "In this class, you learn about machine learning"
  },
  {
    "start": 139.92,
    "end": 142.5,
    "text": "and get to implement machine learning in code yourself."
  },
  {
    "start": 142.5,
    "end": 147.12,
    "text": "Millions of others have taken the earlier version of this course,"
  },
  {
    "start": 147.3,
    "end": 149.52,
    "text": "which is a course that led to the founding of Coursera."
  },
  {
    "start": 150.18,
    "end": 153.9,
    "text": "Many learners ended up building exciting machine learning systems"
  },
  {
    "start": 154.319,
    "end": 157.379,
    "text": "or even pursuing very successful careers in AI."
  },
  {
    "start": 157.379,
    "end": 160.5,
    "text": "I'm excited that you're on this journey with me."
  },
  {
    "start": 160.68,
    "end": 162.48,
    "text": "Welcome, and let's get started."
  }
];

function startTimeMonitor() {
  const player = document.getElementsByClassName('video-stream html5-main-video')[0];
  const videoContainer = document.getElementById('movie_player');
  if (!player || !videoContainer) {
    console.error('fail to find video player or container, try after 1 seconds');
    setTimeout(startTimeMonitor, 1000);
  } else {
    const captionElement = document.createElement('div');
    Object.assign(captionElement.style, {
      position: 'absolute',
      zIndex: '1000',
      bottom: '60px',
      left: '50%',
      transform: 'translateX(-50%)',
      fontFamily: "'YouTube Noto', Roboto, Arial, Helvetica, sans-serif",
      fontSize: '18px',
      color: 'white',
      background: 'rgba(0, 0, 0, 0.8)',
      lineHeight: '1.3',
      borderRadius: '4px',
      padding: '8px 12px',
    });

    videoContainer.appendChild(captionElement);

    let currentCaptionEvent = null;
    player.addEventListener('timeupdate', () => {
      const pt = player.currentTime;
      if (!currentCaptionEvent || pt < currentCaptionEvent.start || pt >= currentCaptionEvent.end) {
        currentCaptionEvent = null;
        captionElement.style.display = 'none';
        for (const e of captionEvents) {
          if (e.start <= pt && pt < e.end) {
            console.log(pt, e.text);
            captionElement.textContent = e.text;
            captionElement.style.display = 'block';
            currentCaptionEvent = e;
            break;
          }
        }
      }
    });
  }
}

startTimeMonitor();