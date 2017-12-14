# Top Drunks!

This uses a barebones WordPress installation and the v2 API to serve data via advanced custom fields to a React application.

The WordPress installation is set up from this framework:

https://github.com/asha23/arlo-framework

It's very much a work in progress, and there may well be the odd glitch. The React component was built using create-react-app as a starting point and has a Bootstrap 4 Sass library.

The Trump cards are managed in WordPress using the custom post type "Trumps" - There is a page per card.

The React part is in the folder ```/trumps-frontend``` - See the readme here for Todos for the React component.

There is also a WordPress plugin which supplies the application as a shortcode "[trumps]" so this can be integrated directly into your WordPress installation. This plugin is located in ```trumps-frontend/trumps_plugin``` - It's not in the repo as I don't track plugins - See the composer file in the root for details of what plugins are installed.

This was tested to work in Google Chrome only for now.

## TODOS

* Set up a redirect to the game so that when people hit the root, they go straight to it.
* Cross-Browser testing

To see a demo, visit

http://prtbl.net/dev/trumps
