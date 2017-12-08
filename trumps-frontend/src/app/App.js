/*
    Top Drunks Version 0.3

    TODO: make the per_page value dynamic - it could be
    TODO: write some proper tests for everything
    TODO: Make the whole thing 100% ES6
    TODO: Learn more React!!!
    TODO: Sort out the issue when a value is 10 - The other player wins - Odd
    TODO: DON'T USE LOCALSTORAGE - Learn Redux.
*/

import React, { Component } from 'react';
import '../css/App.css';

// Grab the json API from the WordPress installation
const DATA = 'http://trumps.local/wp-json/wp/v2/trumps?per_page=100';

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
    };

    // Call up the data when the app starts

    componentDidMount() {
      this.callData();
    };

    // Resets everything
    dealAllCards(list) {
        this.callData(list)
    };


    // Do the data - Returns "list" as an object/array
    callData(data) {
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

    doDataState(list) {

        // Wipe local storage
        localStorage.removeItem('deck');
        localStorage.removeItem('deck1');
        localStorage.removeItem('deck2');
        localStorage.removeItem('deck3');
        localStorage.removeItem('player1Card');
        localStorage.removeItem('player2Card');

        // set local storage for all the data
        localStorage.setItem('deck', JSON.stringify(list));

        setTimeout(function() { // Weird. This only works with a delay - No idea why this is
            list = JSON.parse(localStorage.getItem('deck'));
        }, 50);

        this.shuffleCards(list);
    };

    // Shuffle the cards

    shuffleCards(list) {
        for (let i = list.length - 1; i > 0; i--) {
            let j = Math.floor( Math.random() * ( i + 1 ) );
            [ list[i], list[j] ] = [ list[j], list[i] ];
        }

        this.dealTwoSets(list);

    };

    // Deal 2 sets of cards

    dealTwoSets(list) {

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

        this.dealCard(deck1, deck2);

    };

    // Deal cards

    dealCard(deck1, deck2) {

            // Get the first card in the deck

            // Reset the local storage

            localStorage.removeItem('player1Card');
            localStorage.removeItem('player2Card');

            let player1Card = deck1[0];
            let player2Card = deck2[0];

            // Store the player's current cards

            localStorage.setItem('player1Card', JSON.stringify(player1Card));
            localStorage.setItem('player2Card', JSON.stringify(player2Card));

            if (player1Card === undefined || player2Card === undefined) {
                this.endGame()
                return;
            }

            // TODO Add a star trump

            // console.log(player1Card.acf.star_trump);
            // console.log(player2Card.acf.star_trump);
            //
            // if(player1Card.acf.star_trump === 0 || player2Card.acf.star_trump === 0) {
            //     this.setState({
            //         starTrump: "star-trump",
            //         starTrumpText: "Star Trump"
            //     })
            // } else {
            //     this.setState({
            //         starTrump: "star-trump-hide",
            //         starTrumpText: "Star Trump"
            //     })
            // }

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


                // Cards remaining

                player1CardsLeft: deck1.length,
                player2CardsLeft: deck2.length

            });
    }

    // Pass it back through for the next card choice
    nextCard(deck1, deck2, e) {

        // Get the last cards played

        if (deck1.length === 0 || deck2.length === 0) {
            this.endGame();
        } else {

            // Get the decks from the Store

            deck1 = JSON.parse(localStorage.getItem('deck1'));
            deck2 = JSON.parse(localStorage.getItem('deck2'));

            this.dealCard(deck1,deck2);

            this.setState({
                result:"",
                disableSelects:""

            })
        }
    }

    whoWon(p1, p2) {

        if (p1 === undefined || p2 === undefined) {
            this.endGame();
            return
        }

        if (p1 > p2) {
            this.player1Wins();
            this.setState({result:"You won this round!"})
        }
        if (p1 < p2) {
            this.player2Wins();
            this.setState({result:"I won this round!"})
        }
        if (p1 === p2) {
            this.bothWin();
            this.setState({result:"It's a draw!"})
        }

        this.setState({
            disabled:"",
            disableSelects:"disabled"
        })

    }

    player1Wins() {


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

        if (deck3) {
            // Add items from deck 3 to the end of the pack
            deck1.push(deck3);
            this.setState({
                drawPotSize:deck3.length
            })
        }

        // re-store the decks back to local storage
        localStorage.setItem('deck1', JSON.stringify(deck1));
        localStorage.setItem('deck2', JSON.stringify(deck2));

        if (deck1.length === 0 || deck2.length === 0) {
            this.endGame()
            return;
        } else {
            this.setState({
                player1CardsLeft: deck1.length,
                player2CardsLeft: deck2.length,
            })
        }

    }

    player2Wins() {

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

        if (deck3) {
            // Add items from deck 3 to the end of the pack
            deck2.push(deck3);

            this.setState({
                drawPotSize:deck3.length
            })
        }

        // re-store the decks back to local storage
        localStorage.setItem('deck1', JSON.stringify(deck1));
        localStorage.setItem('deck2', JSON.stringify(deck2));

        if (deck1.length === 0 || deck2.length === 0) {
            this.endGame()
            return;
        } else {
            this.setState({
                player1CardsLeft: deck1.length,
                player2CardsLeft: deck2.length,
            })
        }

    }

    bothWin() {
        // Make a pot of cards - Winner of the next hand takes these cards

        // get both player 1 and player 2's cards
        let deck3 = []
        let player1Card = JSON.parse(localStorage.getItem('player1Card'));
        let player2Card = JSON.parse(localStorage.getItem('player2Card'));
        let deck1 = JSON.parse(localStorage.getItem('deck1'));
        let deck2 = JSON.parse(localStorage.getItem('deck2'));

        // remove these from both players deck
        deck1.shift();
        deck2.shift();


        // add them to a new deck (Deck 3)

        deck3.push(player1Card);
        deck3.push(player2Card);

        localStorage.setItem('deck3', JSON.stringify(deck3));

        this.setState({
            player1CardsLeft: deck1.length,
            player2CardsLeft: deck2.length,
            drawPotSize:deck3.length
        })
    }


    // When all the cards are gone - do the endgame
    endGame() {
        console.log("endgame");

        this.setState({
            disabled:""
        })

    }

    // REACT / FRONTEND
    // =========================================================================
    render() {
        return (

            <div className="container" >
                <div className="centered">
                    <h1>TOP DRUNKS</h1>
                    <p>Draw pot size: {this.state.drawPotSize}</p>

                </div>
                <hr />
                <div className="row">

                    <div className="col-md-4 text-left">
                        <button className="btn btn-primary" onClick={() => this.dealAllCards()}>
                            Deal / Reset
                        </button>
                    </div>
                    <div className="col-md-4">
                        <div className="result clearfix centered">
                            <button disabled className="btn btn-disabled">{this.state.result}</button>
                        </div>
                    </div>

                    <div className="col-md-4">

                        <div className="text-right">
                            <button disabled={this.state.disabled} className="btn btn-primary" onClick={() => this.nextCard(this.state.deck1,this.state.deck2)} >
                                Next Round
                            </button>

                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-xl-2 col-lg-0"></div>
                    <div className="col-xl-4 col-lg-6 col-sm-6">
                        <div className="heading centered">
                            <h2>You</h2>
                            <hr />
                            <h3>Cards Remaining: {this.state.player1CardsLeft}</h3>
                            <p>&nbsp;</p>
                        </div>
                        <div className="card" key={this.state.p1ID}>
                            <div className={this.state.starTrump}>{this.state.starTrumpText}</div>
                            <img className="card-img-top round" src={this.state.p1Image} alt={this.state.p1Title} />
                            <div className="card-block">


                                <h3 className="card-title centered">{this.state.p1Title}</h3>
                                <div className="card-text">
                                    <p>
                                        <button disabled={this.state.disableSelects} className="btn btn-primary full" onClick={() => this.whoWon(this.state.p1Val1, this.state.p2Val1)}>Drunk Factor: {this.state.p1Val1}</button>
                                    </p>
                                    <p>
                                        <button disabled={this.state.disableSelects} className="btn btn-primary full" onClick={() => this.whoWon(this.state.p1Val2, this.state.p2Val2)}>Hangover Length: {this.state.p1Val2}</button>
                                    </p>
                                    <p>
                                        <button disabled={this.state.disableSelects} className="btn btn-primary full" onClick={() => this.whoWon(this.state.p1Val3, this.state.p2Val3)}>Embarrassment Level: {this.state.p1Val3}</button>
                                    </p>
                                    <p>
                                        <button disabled={this.state.disableSelects} className="btn btn-primary full" onClick={() => this.whoWon(this.state.p1Val4, this.state.p2Val4)}>People Offended: {this.state.p1Val4}</button>
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
                        <div className="card" key={this.state.p2ID}>
                            <div className={this.state.starTrump}>{this.state.starTrumpText}</div>
                            <img className="card-img-top round" src={this.state.p2Image} alt={this.state.p2Title} />
                            <div className="card-block">
                                <h3 className="card-title centered">{this.state.p2Title}</h3>
                                <div className="card-text">
                                    <p>
                                        <button disabled className="btn btn-disabled full">Drunk Factor: {this.state.p2Val1}</button>
                                    </p>
                                    <p>
                                        <button disabled className="btn btn-disabled full">Hangover Length: {this.state.p2Val2}</button></p>
                                    <p>
                                        <button disabled className="btn btn-disabled full">Embarrassment Level: {this.state.p2Val3}</button></p>
                                    <p>
                                        <button disabled className="btn btn-disabled full">People Offended: {this.state.p2Val4}</button></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xs-2 col-lg-0"></div>


                </div>

                <div className="footer centered">
                    <hr/>
                    No alcoholic beverages, apart from craft beer, were consumed during the coding of this game. <br/>
                    No one died. <br/>
                    Disclaimer: Most of the people featured in this game actually did die. And those that didn't probably wish they were dead.<br/>

                </div>

            </div>
        );
    };
};

//export default App;
export default App;
