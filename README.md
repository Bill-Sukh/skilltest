# WHCC Developer Demo
Please create a private fork from this repo. 
Please add your WHCC contact to the repo as a collaborator when you're done.

# Description
Complete this web-based news reader that leverages the Hacker News API.
Some work has already been done in the index.html file.
Please do not use a framework, just vanilla javascript or typescript.
You may use webpack, babel, or any other compiler you're comfortable with.
You may also use ES6, do not worry about supporting ES5.
Try to timebox your work to approximately 1-2 hours.

# Requirements
1. The app should initially display a list of the 15 most recent Hacker News stories in descending order.
1. Each story list item should show the title, the author's name, and the time it was posted.
1. The users are very impatient so please display each story as soon as it is fetched.
1. The app should support infinite scrolling. When a user reaches the bottom of the page it should load more stories.
1. The app should be appealing to users on both desktop and mobile, please style it to the best of your ability.

# Core Values of Design
1. Polished simplicity in the user experience and aesthetic.
1. Focus on empathy for the user’s experience.

# Resources
1. Hacker News API: https://github.com/HackerNews/Api
1. Hacker News: https://news.ycombinator.com/news

# Discussion Notes
1. What decisions did you make before you began development?
    - Design(UI) decisions: 
        1. Added navigation bar.
        2. Added, modified WHCC logo.
        3. Made the app responsive to small viewports. 
        4. Colored elements with monochromatic color. 
        5. To emphasize news that client is currently focused on, I added hover animation. 
    - API call and data display decision    
        1. After getting all news IDs from first API call, I filtered the initial 15 news. And as the user scroll down, app fetches next 15 news if following two conditions is met:
           if client scrolled to the bottom of the page and total number of currently rendered news are divisible by 15.  
        2. API calls to fetch the news are sent parralel instead of sequential. That way, it loads more faster. 
2. How did you decide what to work on in order to meet the time constraint?
    - Time boxed my work in 1 hour a day. 
3. What was your decision making process for your code organization?
    - For simplicity, I bundled all scripts into one file. 
4. If you had more time, what would you have implemented?
    - I would have added comment section to it. 
