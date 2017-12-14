# Top Drunks!

This uses a barebones WordPress installation and the v2 API to serve data via advanced custom fields to a React application.

The WordPress installation is set up from this framework:

https://github.com/asha23/arlo-framework

It's very much a work in progress, and there may well be the odd glitch. The React component was built using create-react-app as a starting point and has a Bootstrap 4 Sass library.

The Trump cards are managed in WordPress using the custom post type "Trumps" - There is a page per card. 

The React part is in the folder /trumps-frontend - See the readme here for Todos for the React component.

This was tested to work in Google Chrome only.

## TODOS

* Create a WordPress plugin so that the game can run via a shortcode anywhere in a theme. I have made a start on this. 
* Set up a redirect to the game so that when people hit the root, they go straight to it.
* Cross-Browser testing

To see a demo, visit

http://prtbl.net/dev/trumps/trumps-frontend 

