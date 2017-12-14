# Top Drunks!

This uses a barebones WordPress installation and the v2 API to serve data via advanced custom fields to a React application.

The WordPress installation is set up from this framework:

https://github.com/asha23/arlo-framework

It's very much a work in progress, and there may well be the odd glitch. The React component was built using create-react-app as a starting point and has a Bootstrap 4 Sass library.

The Trump cards are managed in WordPress using the custom post type "Trumps" - There is a page per card. 

## TODOS

Create a plugin so that the game can run via a shortcode anywhere in a theme. I have made a start on this.      
Refactor the code using strict ES6 - At present it's a bit of a mish-mash.   
Add a Redux store, rather than using localstorage. Whilst this works, it's probably not very good practice.    
Refactor everything, creating more organised React components - At present everything is in a single app/app.js file.   
Perhaps use an Atomic pattern methodology.   
Cache the images - Currently they load a little slowly - Perhaps use offline cacheing to store these in some way.  
Look at a method of making the game available offline.   
Perhaps grab all the data on first load and store it.       

To see a demo, visit

http://prtbl.net/dev/trumps/trumps-frontend 

