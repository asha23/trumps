/*
    Top Drunks Version 1.0

    TODO: make the per_page value dynamic - it could be
    TODO: write some proper tests for everything
    TODO: Make the whole thing 100% ES6
    TODO: Learn more React!!!
    TODO: Sort out the issue when a value is 10 - The other player wins - Odd
    TODO: DON'T USE LOCALSTORAGE - Learn Redux.
    TODO: Add a star trump
*/

import React, { Component } from 'react';
import '../css/App.css';

// Grab the json API from the WordPress installation
// TODO: Make this a little more dynamic

// const DATA = 'http://trumps.local/wp-json/wp/v2/trumps?per_page=100';
const DATA = 'http://prtbl.net/dev/trumps/wp-json/wp/v2/trumps?per_page=100';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
          deck1:null,
          deck2:null,
          list:null,
          player1CardsLeft: 0,
          player2CardsLeft: 0,
          drawPotSize:0,
          disabled:"disabled",
          star_trump:1,
          disableSelects:"",
          tookTheWinnings: "",
          count:1,
          result:"",
          index1:0,
          index2:1,
          index3:2,
          index4:3,
          showHide: "shown",
          showEndgame: "hidden",
          winText:"",
          removeButton:"shown",
          borderHighlightPlayer1:"card player1",
          borderHighlightPlayer2:"card",
        };

        this.callData = this.callData.bind(this);
        this.doDataState = this.doDataState.bind(this);
        this.shuffleCards = this.shuffleCards.bind(this);
        this.dealTwoSets = this.dealTwoSets.bind(this);
        this.dealAllCards = this.dealAllCards.bind(this);
        this.whoWon = this.whoWon.bind(this);
        this.endGame = this.endGame.bind(this);
        this.player1Wins = this.player1Wins.bind(this);
        this.player2Wins = this.player2Wins.bind(this);
        this.bothWin = this.bothWin.bind(this);
        this.player2Round = this.player2Round.bind(this);
    };

    // Call up the data when the app starts

    componentDidMount = () => {
      this.callData();
    };

    // Resets everything
    dealAllCards = (list) => {
        this.callData(list)

        this.setState({
            showHide: "shown",
            showEndgame: "hidden",
            removeButton:"shown",
            winText:""
        })
    };

    // Do the data - Returns "list" as an object/array
    callData = (data) => {
        fetch(`${DATA}`)
          .then(list => list.json())
          .then(list => this.doDataState(list))
          .catch(e => e); // TODO - Create a proper error checking system
    };

    // GAME LOGIC
    // =========================================================================

    // Setup local storage
    // We need this to keep the arrays of cards up to date
    // TODO - Set this up using a proper store method such as REDUX

    doDataState = (list) => {

        // Wipe local storage
        localStorage.removeItem('deck');
        localStorage.removeItem('deck1');
        localStorage.removeItem('deck2');
        localStorage.removeItem('deck3');
        localStorage.removeItem('player1Card');
        localStorage.removeItem('player2Card');

        // set local storage for all the data
        localStorage.setItem('deck', JSON.stringify(list));

        setTimeout(() => { // Weird. This only works with a delay - No idea why this is
            list = JSON.parse(localStorage.getItem('deck'));
        }, 50);

        this.shuffleCards(list);
    };

    // Shuffle the cards
    shuffleCards = (list) => {
        for (let i = list.length - 1; i > 0; i--) {
            let j = Math.floor( Math.random() * ( i + 1 ) );
            [ list[i], list[j] ] = [ list[j], list[i] ];
        }

        this.dealTwoSets(list);

    };

    // Deal 2 sets of cards
    dealTwoSets = (list) => {

        let deck1 = [];
        let deck2 = [];

        // Create 2 deck arrays
        // TODO: Create option for more than 2 players

        for(let i = 0; i <list.length; i ++) {
            if ( ( i + 2 ) % 2 === 0) {
                deck1.push(list[i]);
            } else {
                deck2.push(list[i]);
            }
        }

        // Store the decks initially
        localStorage.setItem('deck1', JSON.stringify(deck1));
        localStorage.setItem('deck2', JSON.stringify(deck2));
        localStorage.setItem('deck3', JSON.stringify([]));

        this.dealCard(deck1, deck2);

    };

    // Deal cards
    dealCard = (deck1, deck2, count) => {

        if (count === undefined) {
            count = 1;
        }

        this.setState({
            result:""
        })

        // Get the first card in the deck
        // Reset the local storage
        localStorage.removeItem('player1Card');
        localStorage.removeItem('player2Card');

        let player1Card = deck1[0];
        let player2Card = deck2[0];

        if (count%2 === 0) {

            this.player2Round(deck1, deck2);

            this.setState({
                disableSelects:"disabled",
                borderHighlightPlayer1:"card",
                borderHighlightPlayer2:"card player2"
            });

        } else {
            this.setState({
                disabled:"disabled",
                disableSelects:"",
                borderHighlightPlayer1:"card player1",
                borderHighlightPlayer2:"card"
            });
        }

        // Store the player's current cards
        localStorage.setItem('player1Card', JSON.stringify(player1Card));
        localStorage.setItem('player2Card', JSON.stringify(player2Card));

        if (player1Card === undefined || player2Card === undefined) {
            this.endGame();
            this.setState({
                disabled:"disabled",
                disableSelects:"disabled",
            });
            return;
        }

        // Show each player some cards
        this.setState({

            deck1:deck1,
            deck2:deck2,

            player1Card:player1Card,
            player2Card:player2Card,

            // Player 1
            p1ID: player1Card.id,
            p1Title: player1Card.title.rendered,
            p1Image: player1Card.acf.image,
            p1Val1: player1Card.acf.value_1,
            p1Val2: player1Card.acf.value_2,
            p1Val3: player1Card.acf.value_3,
            p1Val4: player1Card.acf.value_4,

            // Player 2
            p2ID: player2Card.id,
            p2Title: player2Card.title.rendered,
            p2Image: player2Card.acf.image,
            p2Val1: player2Card.acf.value_1,
            p2Val2: player2Card.acf.value_2,
            p2Val3: player2Card.acf.value_3,
            p2Val4: player2Card.acf.value_4,

            p2Val1Hide: "???",
            p2Val2Hide: "???",
            p2Val3Hide: "???",
            p2Val4Hide: "???",

            // Cards remaining

            player1CardsLeft: deck1.length,
            player2CardsLeft: deck2.length,

        });
    }

    // Player 2's turn

    player2Round = (deck1, deck2) => {

        // Some extremely basic AI. Essentially the computer just looks for the highest value attribute.
        // TODO: Improve this AI, so the computer remembers previous player 1 cards attributes and picks more strategically

        let player1Card = deck1[0];
        let player2Card = deck2[0];

        let player2CardVals = [];
        let player1CardVals = [];

        let parsedP1 = player1Card.acf;
        let player1CardArray = [];

        let parsedP2 = player2Card.acf;
        let player2CardArray = [];

        for(let x in parsedP1) {
            player1CardArray.push(parseInt(parsedP1[x], 10));
        }

        for(let y in parsedP2) {
            player2CardArray.push(parseInt(parsedP2[y], 10));
        }

        for (let i = 1; i < player2CardArray.length; i++) { // skip the image value here
            player2CardVals.push(player2CardArray[i]);
            player1CardVals.push(player1CardArray[i]);
        }

        // Get the index of the largest value in the array
        let p2Index = player2CardVals.indexOf(Math.max(...player2CardVals));

        // return the corresponding index of player 1's card
        let p1 = player1CardVals[p2Index];
        let p2 = player2CardVals[p2Index];

        this.setState({
            result:"I'm thinking...",
            disabled:"disabled",
            disableSelects:"disabled",
        });

        // After pretending to think about it for a bit :) - do the who won routine
        setTimeout(() => {
            this.setState({
                result:"",
            });

            this.whoWon(p2Index, p1, p2);

        }, 3000);

    }

    // Pass it back through for the next card choice
    nextCard = (deck1, deck2, countVal) => {

        let count = countVal;

        count ++;

        // Get the last cards played
        if (deck1.length === 0 || deck2.length === 0) {
            this.endGame();
        } else {

            // Get the decks from the Store
            deck1 = JSON.parse(localStorage.getItem('deck1'));
            deck2 = JSON.parse(localStorage.getItem('deck2'));

            this.dealCard(deck1, deck2, count);

            this.setState({
                tookTheWinnings:"",
                count: count
            })
        }
    }

    // Work out who won the hand
    whoWon = (cardIndex, p1, p2) => {
        if (p1 === undefined || p2 === undefined) {
            this.endGame();
            this.setState({
                disabled:"disabled",
                disableSelects:"disabled"
            });
            return;
        }

        if (p1 > p2) {
            this.player1Wins();
            this.setState({result:"You won this round!"});
        }

        if (p1 < p2) {
            this.player2Wins();
            this.setState({result:"I won this round!"});
        }

        if (p1 === p2) {
            this.bothWin();
            this.setState({result:"It's a draw!"});
        }

        // Reveal player 2's result
        if (cardIndex === 0) {
            this.setState({
                p2Val1Hide: this.state.p2Val1,
            });
        }

        if (cardIndex === 1) {
            this.setState({
                p2Val2Hide: this.state.p2Val2,
            })
        }

        if (cardIndex === 2) {
            this.setState({
                p2Val3Hide: this.state.p2Val3,
            });
        }

        if (cardIndex === 3) {
            this.setState({
                p2Val4Hide: this.state.p2Val4,
            });
        }

        this.setState({
            disabled:"",
            disableSelects:"disabled",
        });
    }

    player1Wins = () => {

        // Push player2's card into the end of player 1's deck
        let deck1 = JSON.parse(localStorage.getItem('deck1'));
        let player2Card = JSON.parse(localStorage.getItem('player2Card'));
        let player1Card = JSON.parse(localStorage.getItem('player1Card'));
        deck1.shift();
        deck1.push(player1Card);
        deck1.push(player2Card);

        // Remove player2's card from their deck.
        let deck2 = JSON.parse(localStorage.getItem('deck2'));

        // remove the first item (which is their card)
        deck2.shift();

        // re-store the decks back to local storage
        localStorage.setItem('deck1', JSON.stringify(deck1));
        localStorage.setItem('deck2', JSON.stringify(deck2));

        // See if there is anything in deck 3

        let deck3 = JSON.parse(localStorage.getItem('deck3'));

        if ( deck3.length !== 0 ) {
            // Add items from deck 3 to the end of the pack if there is a draw pot

            // TODO: Get better at ES6 and use .map
            for (let i = 0; i < deck3.length; i++) {
                deck1.push(deck3[i]);
            }

            // Push the winnings to deck 1
            localStorage.setItem('deck1', JSON.stringify(deck1));

            // Clear deck 3
            localStorage.setItem('deck3', JSON.stringify([]));

            this.setState({
                drawPotSize:0,
                tookTheWinnings: "You took the winnings!"
            })

        } else {

            localStorage.setItem('deck3', JSON.stringify([]));

            this.setState({
                tookTheWinnings:""
            });
        }

        // re-store the decks back to local storage
        localStorage.setItem('deck1', JSON.stringify(deck1));
        localStorage.setItem('deck2', JSON.stringify(deck2));

        if (deck1.length === 0 || deck2.length === 0) {
            this.endGame();
            this.setState({
                disabled:"disabled",
                disableSelects:"disabled",
            });

            return;

        } else {
            this.setState({
                player1CardsLeft: deck1.length,
                player2CardsLeft: deck2.length,
            });
        }
    }

    player2Wins = () => {

        // push player1's card into the end of player 2's deck
        let deck2 = JSON.parse(localStorage.getItem('deck2'));
        let player1Card = JSON.parse(localStorage.getItem('player1Card'));
        let player2Card = JSON.parse(localStorage.getItem('player2Card'));
        deck2.shift();
        deck2.push(player2Card);
        deck2.push(player1Card);

        // Remove player1's card from their deck.
        let deck1 = JSON.parse(localStorage.getItem('deck1'));

        // remove the first item (which is their card)
        deck1.shift();

        // See if there is anything in deck 3
        let deck3 = JSON.parse(localStorage.getItem('deck3'));

        if (deck3.length !== 0) {
            // Add items from deck 3 to the end of the pack if there is a draw pot

            // Loop over deck 3 and push each item in turn
            // TODO: Get better at ES6 and use .map
            for (let i = 0; i < deck3.length; i++) {
                deck2.push(deck3[i]);
            }

            // Push the winnings to deck 1
            localStorage.setItem('deck1', JSON.stringify(deck1));

            // Clear deck 3
            localStorage.setItem('deck3', JSON.stringify([]));

            this.setState({
                drawPotSize:0,
                tookTheWinnings: "I took the winnings!"
            });

        } else {
            this.setState({
                tookTheWinnings:""
            });
        }

        // re-store the decks back to local storage
        localStorage.setItem('deck1', JSON.stringify(deck1));
        localStorage.setItem('deck2', JSON.stringify(deck2));

        if (deck1.length === 0 || deck2.length === 0) {
            this.endGame();
            this.setState({
                disabled:"disabled",
                disableSelects:"disabled",
            });

            return;

        } else {
            this.setState({
                player1CardsLeft: deck1.length,
                player2CardsLeft: deck2.length,
            });
        }

    }

    bothWin = () => {
        // Make a pot of cards - Winner of the next hand takes these cards

        // get both player 1 and player 2's cards
        let deck3 = JSON.parse(localStorage.getItem('deck3'));
        let player1Card = JSON.parse(localStorage.getItem('player1Card'));
        let player2Card = JSON.parse(localStorage.getItem('player2Card'));
        let deck1 = JSON.parse(localStorage.getItem('deck1'));
        let deck2 = JSON.parse(localStorage.getItem('deck2'));

        // remove these from both players deck
        deck1.shift();
        deck2.shift();

        // Push the updated packs back into local storage
        localStorage.setItem('deck1', JSON.stringify(deck1));
        localStorage.setItem('deck2', JSON.stringify(deck2));

        // add them to a new deck (Deck 3)
        deck3.push(player1Card);
        deck3.push(player2Card);

        localStorage.setItem('deck3', JSON.stringify(deck3));

        this.setState({
            player1CardsLeft: deck1.length,
            player2CardsLeft: deck2.length,
            drawPotSize: deck3.length
        })
    }

    // When all the cards are gone - do the endgame
    endGame = () => {

        let winText;

        let deck1 = JSON.parse(localStorage.getItem('deck1'));
        let deck2 = JSON.parse(localStorage.getItem('deck2'));

        if (deck1.length === 0) {
            winText = "Player 2 Wins!"
        } else {
            winText = "Player 1 Wins!"
        }

        this.setState({
            disabled:"disabled",
            disableSelects:"disabled",
            player1CardsLeft: deck1.length,
            player2CardsLeft: deck2.length,
            showHide:"hidden",
            showEndgame:"shown",
            winText: winText,
            removeButton:"hidden",
            result:""
        });
    }

    // End of game logic

    // Render the frontend
    render = () => {
        return (

            <div className="container">
                <div className="centered">
                    <h1>TOP DRUNKS</h1>
                    <p>Draw pot size: {this.state.drawPotSize}<br/>{this.state.tookTheWinnings}</p>
                </div>
                <hr />
                <div className="row" >

                    <div className="col-md-4 text-left">
                        <button className="btn btn-primary" onClick={() => this.dealAllCards()}>
                            Deal / Reset
                        </button>
                    </div>
                    <div className="col-md-4">
                        <div className="result clearfix centered">
                            <button disabled className="btn disabled">{this.state.result}</button>
                        </div>
                    </div>

                    <div className="col-md-4">

                        <div className="text-right">
                            <span className={this.state.removeButton}>
                                <button disabled={this.state.disabled} className="btn btn-primary" onClick={() => this.nextCard(this.state.deck1, this.state.deck2, this.state.count)} >
                                    Next Round
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
                <hr />
                <div className={this.state.showHide}>
                    <div className="row game-state-playing">

                        <div className="col-xl-2 col-lg-0"></div>
                        <div className="col-xl-4 col-lg-6 col-sm-6">
                            <div className="heading centered">
                                <h2>You</h2>
                                <hr />
                                <h3>Cards Remaining: {this.state.player1CardsLeft}</h3>
                                <p>&nbsp;</p>
                            </div>
                            <div className={this.state.borderHighlightPlayer1} key={this.state.p1ID}>

                                <img className="card-img-top round" src={this.state.p1Image} alt={this.state.p1Title} />
                                <div className="card-block">

                                    <h3 className="card-title centered">{this.state.p1Title}</h3>
                                    <div className="card-text">
                                        <p>
                                            <button disabled={this.state.disableSelects}
                                                className="btn btn-primary full"
                                                onClick={() => this.whoWon(this.state.index1, this.state.p1Val1, this.state.p2Val1)}
                                            >
                                                Drunk Factor: {this.state.p1Val1}
                                            </button>
                                        </p>
                                        <p>
                                            <button disabled={this.state.disableSelects}
                                                className="btn btn-primary full"
                                                onClick={() => this.whoWon(this.state.index2, this.state.p1Val2, this.state.p2Val2)}
                                            >
                                                Hangover Length: {this.state.p1Val2}
                                            </button>
                                        </p>
                                        <p>
                                            <button disabled={this.state.disableSelects}
                                                className="btn btn-primary full"
                                                onClick={() => this.whoWon(this.state.index3, this.state.p1Val3, this.state.p2Val3)}
                                            >
                                                Embarrassment Level: {this.state.p1Val3}
                                            </button>
                                        </p>
                                        <p>
                                            <button disabled={this.state.disableSelects}
                                                className="btn btn-primary full"
                                                onClick={() => this.whoWon(this.state.index4, this.state.p1Val4, this.state.p2Val4)}
                                            >
                                                People Offended: {this.state.p1Val4}
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-sm-6">
                            <div className="heading centered">
                                <h2>Your Computer</h2>
                                <hr />
                                <h3>Cards Remaining: {this.state.player2CardsLeft}</h3>
                                <p>&nbsp;</p>
                            </div>
                            <div className={this.state.borderHighlightPlayer2} key={this.state.p2ID}>

                                <img className="card-img-top round" src={this.state.p2Image} alt={this.state.p2Title} />
                                <div className="card-block">
                                    <h3 className="card-title centered">{this.state.p2Title}</h3>
                                    <div className="card-text">
                                        <p>
                                            <button disabled className="btn btn-disabled full">Drunk Factor: {this.state.p2Val1Hide}</button>
                                        </p>
                                        <p>
                                            <button disabled className="btn btn-disabled full">Hangover Length: {this.state.p2Val2Hide}</button>
                                        </p>
                                        <p>
                                            <button disabled className="btn btn-disabled full">Embarrassment Level: {this.state.p2Val3Hide}</button>
                                        </p>
                                        <p>
                                            <button disabled className="btn btn-disabled full">People Offended: {this.state.p2Val4Hide}</button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xs-2 col-lg-0"></div>

                    </div>

                </div>

                <div className={this.state.showEndgame}>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    <h1 className="centered">{this.state.winText}</h1>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                </div>

                <div className="footer centered">
                    <hr/>
                </div>

            </div>
        );
    };
};

export default App;
