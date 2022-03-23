let baseUrl = 'https://hacker-news.firebaseio.com/v0/';
let storyIDs = [];
let story = {};
let stories = [];

async function init(){
    storyIDs = await getNewStoriesID();
    stories = await getStories();

    console.log(JSON.stringify(storyIDs));
    console.log(JSON.stringify(stories));
    renderStories(stories);

}

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
    let url = baseUrl + 'item/' + id + '.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }

}

async function getStories(){

    try {
        await Promise.all(storyIDs.map(async (story) => {
            try{
                let item = await getStory(story);
                stories.push(item);
            }
            catch (error) {
                console.log(error);
            }
        }));
        return stories;

    } catch (error) {
        console.log(error);
    }

   
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

function renderStories(stories) {
    let html = '';
    try {
        for (story of stories) {
            let htmlComponent = `<div class="right"> 
                    <div class="article-details">
                        <h1 class="article-title"> <a href="${story.url}">${story.title}</a> </h1>
                        <div class="article-date-author">
                            <p class="date"> <span><i class="fa-solid fa-calendar-days"></i></span> ${time_ago(convertUnixTime(story.time))}</p>
                            <p class="author"> <span><i class="fa-solid fa-user"></i></span>${story.by}</p>
                        </div>
                    </div>  
            </div>`;
    
            html += htmlComponent;
        }
    } catch (error) {
        console.log(error);
    }
    let container = document.querySelector('.articles');
    container.innerHTML = html;
   
}

document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        init();
    }   
});


