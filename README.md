# RSSFF

THIS IS A WIP!! It isn't complete, Some items are incomplete.
There are a lot of moving parts that have to work together nicely. If you encounter a problem. Use this github page and submit a bug.

## What it Does
Its primary usage is to locally host your movies or TV shows to stream to other devices.
This includes anything you can cast to or anything with a web browser. EG Chromecast, Smart TV's, Smartphone, PC's and more.

Designed to be lightweight, load times is guaranteed to surpass your standard streaming services.

As well as handling streaming, It will manage your ingest of films too. Simply add the film file to the site, It will do the rest including:

    - Reformatting
    
    - Sourcing poster images
    
    - Collecting metadata like:
    
        - File size
        
        - Runtime
        
        - Resolution
        
        - IMDB link
        
    - Managing TV Shows
    
    - Deleting Double ups
    
    - And more!

Need to take the film with you? Each film can be individually downloaded to your current machine for offline watching.

The site includes an admin page to have finer control over what goes on. Including...

    - Hide films from the site
    
    - Adding custom keywords to films for easier search's or custom search results.
    
    - Edit film information EG Descriptions, Title and genres
    
    - File management to easily save space and delete films.
    
    - Extensive log reports allow you to see how many times a show has been watched, What users searched and more.
    

## Automatic Sourcing
While all that are good thing to have. What if you want EVERYTHING to be easy and intuitive to use... Including sourcing your movies.
From the admin page, You can enable an RSS feed. This allows you to have easy access to 14,000 high quality movies to download for your collection.

When you search for a movie with RSS enabled, it will show results from your local server and potential downloads too.
With one click, If you don't already have the film, The download will start. Depending on your internet speed, The film could be ready to stream by the time you've made popcorn.

In the admin page, You can disable automatic downloads and use a request system. Instead of downloading films instantly, it will send a prompt to the admin page for the admin user to either accept or decline the request. If accepted, It will then proceed and download the film

### Word of the wise..
** Please note that automatic sourcing is illegal. It torrents inappropriately sourced films. But as this project is centered around managing movies, We wanted to make every aspect of it easy, even if only for the notorious users.
By default it is off. We do not condone, nor promote the usage of it. Use at your own risk.


## How to Install
You'll need

    - Nodejs
    
    - Webhost with PHP (apache2, wamp or xampp work fine)
    

(1): Clone this repository to the location of your webserver. EG: '/var/www/'

(2): Add your movies to the 'files' directory

(3): Start the webserver

(4): Open 2 terminals in the location of the repository

(5): run 'node ./index.js' and in the other terminal 'node ./format.js'
