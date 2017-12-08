import React, { Component } from 'react';
import './App.css';


// TODO: make the per_page value dynamic - it could be
// TODO: write some proper tests for everything
// TODO: Make the whole thing 100% ES6

// Grab the json API from the WordPress installation
const DATA = 'http://trumps.local/wp-json/wp/v2/trumps?per_page=100';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
          deck1:null,
          deck2:null,
          list:null
        };

        this.callData = this.callData.bind(this);
        this.doDataState = this.doDataState.bind(this);
        this.shuffleCards = this.shuffleCards.bind(this);
        this.dealTwoSets = this.dealTwoSets.bind(this);
        this.dealAllCards = this.dealAllCards.bind(this);
        this.selectOption = this.selectOption.bind(this);
    };

    // Call up the data when the app starts

    componentDidMount() {
      this.callData();
    };

    dealAllCards(data) {
        this.callData(data)
    };

    selectOption(theState) {
        console.log(theState);
    }

    // Do the data - Returns "list" as an object/array
    callData(data) {
        fetch(`${DATA}`)
          .then(list => list.json())
          .then(list => this.doDataState(list))
          .catch(e => e); // TODO - Create a proper error checking system
    };

    // GAME LOGIC
    // =========================================================================

    // I know, It just calls another function...
    // Might need it at some point so left this here
    doDataState(list) {
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
        for(let i = 0; i < list.length; i ++) {
            if ( ( i + 2 ) % 2 === 0) {
                deck1.push(list[i]);
            } else {
                deck2.push(list[i]);
            }
        }

        this.dealCard(deck1, deck2);

    };

    // Pick a card for each player (shift it from the array)
    dealCard(deck1, deck2) {
        let player1Card = deck1.shift();
        let player2Card = deck2.shift();

        if(!player1Card.acf.image) {
            player1Card.acf.image = "No Image"
        }

        if(!player2Card.acf.image) {
            player2Card.acf.image = "No Image"
        }

        console.log(player1Card.acf.image);

        // Show each player some cards
        this.setState({

            // Player 1
            p1Title: player1Card.title.rendered,
            p1Image: player1Card.acf.image,
            p1Val1: player1Card.acf.value_1,
            p1Val2: player1Card.acf.value_2,
            p1Val3: player1Card.acf.value_3,
            p1Val4: player1Card.acf.value_4,

            // Player 2
            p2Title: player2Card.title.rendered,
            p2Image: player2Card.acf.image,
            p2Val1: player2Card.acf.value_1,
            p2Val2: player2Card.acf.value_2,
            p2Val3: player2Card.acf.value_3,
            p2Val4: player2Card.acf.value_4,

        });
    }



    // REACT / FRONTEND
    // =========================================================================
    render() {
        return (

            <div className="container" >
                <div className="row">
                    <div className="card col-md-6">
                        <h3>Player 1</h3>
                        <p>{this.state.p1Title}</p>
                        <p>{this.state.p1Image}</p>
                        <p>
                            Drunk Factor: {this.state.p1Val1}
                            <button onClick={() => this.selectOption(this.state.p1Val1)}>Select</button>
                        </p>
                        <p>
                            Hangover Length: {this.state.p1Val2}
                            <button onClick={() => this.selectOption(this.state.p1Val2)}>Select</button>
                        </p>
                        <p>
                            Embrarrassment Level: {this.state.p1Val3}
                            <button onClick={() => this.selectOption(this.state.p1Val3)}>Select</button>
                        </p>
                        <p>
                            People Offended: {this.state.p1Val4}
                            <button onClick={() => this.selectOption(this.state.p1Val4)}>Select</button>
                        </p>
                    </div>

                    <div className="card col-md-6">
                        <h3>Player 2</h3>
                        <p>{this.state.p2Title}</p>
                        <p>{this.state.p2Image}</p>
                        <p >Drunk Factor: {this.state.p2Val1}</p>
                        <p>Hangover Length: {this.state.p2Val2}</p>
                        <p>Embrarrassment Level: {this.state.p2Val3}</p>
                        <p>People Offended: {this.state.p2Val4}</p>
                    </div>
                </div>




                <button onClick={() => this.handleClick()}>Deal</button>
            </div>
        );
    };
};

export default App;
