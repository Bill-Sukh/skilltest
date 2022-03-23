const container = document.querySelector('.articles');
const baseUrl = 'https://hacker-news.firebaseio.com/v0/';
const MAX_STORIES = 500;
const STORY_INCREMENT = 15;
let storiesID = [];
let count = 0;
let currentID = 0;


async function getNewStoriesID() {
  // URL Format: 'https://hacker-news.firebaseio.com/v0/item/30749747.json';
  let url = baseUrl + 'newstories.json';
  try {
      let res = await fetch(url);
      return await res.json();
  } catch (error) {
      console.log(error);
  }
}

async function getStory(id){
  let url = baseUrl + 'item/' + String(id) + '.json';
  try {
      let res = await fetch(url);
      console.log('story fetched');
      return await res.json();
  } catch (error) {
      console.log(error);
  }

}

const renderStory = (story) => {
  return  `<div class="right"> 
              <div class="article-details">
                  <p class="article-title"><a href="${story.url}">${story.title}</a> </p>
                  <div class="article-date-author">
                      <p class="date"> <span><i class="fa-solid fa-calendar-days"></i></span> ${time_ago(convertUnixTime(story.time))}</p>
                      <p class="author"> <span><i class="fa-solid fa-user"></i></span>${story.by}</p>
                  </div>
              </div>  
      </div>`;
}

//Async function that sends requests to passed array of IDS
async function getStories(stories){
  let filteredStories = await stories;
  console.log(filteredStories);
  try {
      await Promise.all(filteredStories.map(async (story) => {
          try{
              let storyItem = await getStory(story);
              console.log("story id " + story);
              let li = document.createElement("li");
              li.className = 'article-item';
              li.innerHTML = renderStory(storyItem);
              container.appendChild(li);
              count++;
              console.log(count);
          }
          catch (error) {
              console.log(error);
          }
      }));
  } catch (error) {
      console.log(error);
  }
}

async function sliceStoriesID(stories){
  if(stories.length > 20){
    console.log("sliceStoriesID function just received ALL IDS")
  }

  let slicedStoriesID = [];
  for (let i = 0; i < STORY_INCREMENT; i++) {
    slicedStoriesID.push(stories[currentID]);
    currentID++;
  }
  console.log("running");
  return slicedStoriesID;
}

function time_ago(time) {

    switch (typeof time) {
      case 'number':
        break;
      case 'string':
        time = +new Date(time);
        break;
      case 'object':
        if (time.constructor === Date) time = time.getTime();
        break;
      default:
        time = +new Date();
    }
    let time_formats = [
      [60, 'seconds', 1], // 60
      [120, '1 minute ago', '1 minute from now'], // 60*2
      [3600, 'minutes', 60], // 60*60, 60
      [7200, '1 hour ago', '1 hour from now'], // 60*60*2
      [86400, 'hours', 3600], // 60*60*24, 60*60
      [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
      [604800, 'days', 86400], // 60*60*24*7, 60*60*24
      [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
      [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
      [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
      [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
      [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
      [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
      [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
      [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ];
    let seconds = (+new Date() - time) / 1000,
      token = 'ago',
      list_choice = 1;
  
    if (seconds == 0) {
      return 'Just now'
    }
    if (seconds < 0) {
      seconds = Math.abs(seconds);
      token = 'from now';
      list_choice = 2;
    }
    let i = 0,
      format;
    while (format = time_formats[i++])
      if (seconds < format[0]) {
        if (typeof format[2] == 'string')
          return format[list_choice];
        else
          return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
      }
    return time;
}
  
function convertUnixTime(unixTime){
    let convertedDate = new Date(unixTime*1000);

    return convertedDate;
}


window.addEventListener('scroll',()=>{

});


window.onload = async function() {
    storiesID = await getNewStoriesID();
    getStories(await sliceStoriesID(await storiesID));
};

window.addEventListener('scroll', async () => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5 && (currentID % 15) == 0) {
        getStories(await sliceStoriesID(storiesID));
    }
  }, 
  {
    passive: true
});