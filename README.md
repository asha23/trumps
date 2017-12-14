# trumps

This uses a barebones WordPress installation and the v2 API to serve data via advanced custom fields to a React application.

It's very much a work in progress, and there may well be bugs.

#TODOS

Create a plugin so that the game can run via a shortcode anywhere in a theme.
Refactor the code using strict ES6 - At present it's a bit of a mish-mash
Add a Redux store, rather than using localstorage. Whilst this works, it's probably not very good practice
Refactor everything, creating components. Perhaps use an Atomic pattern to achieve this
Cache the images - Currently they load a little slowly.
Perhaps grab all the data on first load and store it. Cut down on requests.

To see a demo, visit

http://prtbl.net/dev/trumps/trumps-frontend 

