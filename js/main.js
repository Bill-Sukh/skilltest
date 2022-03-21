let baseUrl = 'https://hacker-news.firebaseio.com/v0/';

async function getNewStories() {
    // let url = 'https://hacker-news.firebaseio.com/v0/item/30749747.json';
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

// async function renderStories(){
//     let stories = await getNewStories();
//     console.log(stories);
//     let html = '';

//     // let storyItem = await getStory(stories[0]);

//     // let htmlComponent = `<div class="right"> 
//     //                         <div class="article-details">
//     //                                 <h1 class="article-title"> <a href="${storyItem.url}">${storyItem.title}</a> </h1>
//     //                                 <div class="article-date-author">
//     //                                     <p class="date"> <span><i class="fa-solid fa-calendar-days"></i></span> March 18,2022</p>
//     //                                     <p class="author"> <span><i class="fa-solid fa-user"></i></span>${storyItem.by}</p>
//     //                                 </div>
//     //                                 <p class="article-excerpt">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias, totam! Obcaecati autem repudiandae excepturi unde provident quae minus voluptatibus eius, rerum ipsa, aut odio placeat, explicabo repellat saepe. Tenetur, a?</p>
//     //                             </div>  
//     //                         </div>`;

//     stories.forEach(story => {
//         console.log(story);

//         let storyItem = await getStory(story);

//         let htmlComponent = `<div class="right"> 
//         <div class="article-details">
//                 <h1 class="article-title"> <a href="${storyItem.url}">${storyItem.title}</a> </h1>
//                 <div class="article-date-author">
//                     <p class="date"> <span><i class="fa-solid fa-calendar-days"></i></span> March 18,2022</p>
//                     <p class="author"> <span><i class="fa-solid fa-user"></i></span>${storyItem.by}</p>
//                 </div>
//                 <p class="article-excerpt">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias, totam! Obcaecati autem repudiandae excepturi unde provident quae minus voluptatibus eius, rerum ipsa, aut odio placeat, explicabo repellat saepe. Tenetur, a?</p>
//             </div>  
//         </div>`;

//         html += htmlComponent;
//     });

//     html += htmlComponent;

//     let container = document.querySelector('.articles');
//     container.innerHTML = html;
// }

async function loadNewStories(){
    let stories = await getNewStories();
    console.log(stories);
    let loadedStories = [];

    await Promise.all(stories.map(async (story) => {
        let item = await getStory(story);
        loadedStories.push(item);
      }));
    
    return loadedStories;
}


async function renderStories() {
    let stories = await loadNewStories();

    let html = '';

    for (story of stories) {
        let htmlComponent = `<div class="right"> 
                <div class="article-details">
                    <h1 class="article-title"> <a href="${story.url}">${story.title}</a> </h1>
                    <div class="article-date-author">
                        <p class="date"> <span><i class="fa-solid fa-calendar-days"></i></span> March 18,2022</p>
                        <p class="author"> <span><i class="fa-solid fa-user"></i></span>${story.by}</p>
                    </div>
                </div>  
        </div>`;

        html += htmlComponent;
    }

    let container = document.querySelector('.articles');
    container.innerHTML = html;
}

document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        renderStories();
    }
});

