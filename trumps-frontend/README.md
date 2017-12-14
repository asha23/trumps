# Trumps Frontend

Created using create-react-app

Currently this is all contained within the app.js - There are lots of todos!

This calls a json API from the WordPress installation.

The main app is in /src/app/app.js

## TODOS

* Make the WordPress posts per_page value dynamic in the API Url. Currently it's set to 100.  
* Wite some unit tests for everything.   
* Make the whole thing 100% ES6 - Currently it's a bit of a hotchpotch.   
* Learn more React!!! (Obviously)    
* Sort out the issue when a value is 10 - The other player wins - Odd   
* DON'T USE LOCALSTORAGE! - Whilst this works and made tracking the card logic pretty straightforward and quick to achieve, it would probably be better to use Redux.   
* Add a Star Trump card. (FYI - It's Shane McGowan!)    
* Lots of refactoring to make this all far more streamlined. 
* Break it down into more organised React components.   
* Improve the AI. At present it essentially just takes the highest value attribute for each card - Essentially it plays the game like a child, not especially strategically. Create a way for the AI to allow decisions to be made based on knowledge it gains from previous rounds.    
* Preload everything a little more elegantly.   
* Create some nice transitions between rounds.   
* Improve the styling.   
* Make the game playable whilst offline.    
* Once the computer has had it's turn, jump to player 1's turn immediately - Having to click "Next Round" feels a little bit clunky.
