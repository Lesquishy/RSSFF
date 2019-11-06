# RSSFF

THIS IS A WIP
Expect Nothing great. There are a lot of moving parts that have to work together nicely.

Used to view and auto collect movies for torrent. Using customizeable RSS feeds from your favorite sites. With keywords to look out for, It'll auto save movies from their title and store them to collect later. Using a separate script it'll also show you all your previously downloaded films for a movie database all in one place.

Its main purpose is to view manage all my movies. It has the added benifit of being able to search for movies from external sites. It'll also manage episodic shows.

It's based on 2 stages (so far).
One to manage the inflow of movies. This includes checking their format and file name, Then it'll add the processed movies to the index.

The other stage is the site. It'll use the previously mentioned index to display all the local movies. While using exsisting API's or RSS feeds to find new movies.

Idealy, You could do the first stage from the site. Start a download, Rename and reformat the new movie, add it to the index to be displayed on the site

## To do for site
Tasks
- Settings menu with lock. (User? Just password defined?)
  - Whitelist filter for the desired stored movies.
  - Blacklist to hide movies from search list.
- More comments to make it easier to read XD.
- Design the settings menu.
- Fix search box result positioning.
- Json file read / write for found and stored movies.
- Search to search the Json for found movies.
- Save the poster images
- Add info to the json
  - add descriptions
  - add genres
  - add keyWords
  - add poster images?

In progress / known problems
- Movie tiles with info from searched results
- Change name banner
- Search filters improvements
- reload YTS tab on focus change
- Fix result limiter
- Script to add movies to database, rename files and refomat files

Done
- Search
  - Search box to search yts site
  - Added multiple tabs to search different areas.
- Movie tiles with displayed info from RSS
- Basic backend structure
- Basic Visual structure.


## To do for indexer
Tasks
- write to the json file (without replaceing everything on it)
- Easily changeable input and output directories
- Rename files
- Reformat files

In progress / known problems
- add more data to write to the index
  - formatting info

Done
- Collect information from metadata
  - Name
  - Run time
  - Size
  - Resolution
  - Ratio
  - Framerate
  - locallyStored
  - file Location
  - title (not name. the var name is the fileName)
  - Detect if its episodic and the proceeding info
- Process the metadata
  - Duration
  - Size
  - Resolution
  - Framerate
- Prepare metadata for output
- Read existing info from the index
- File filtering for
  - File blacklist
  - Extension blacklist
  - Existing files
