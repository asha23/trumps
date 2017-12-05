import React, { Component } from 'react';
import Card from './app/Card';
import Interface from './app/Interface';

class CardDeck extends Component {

    getInitialState = () => {

        // table deck shuffle
        var shuffled = _.shuffle(this.props.deck);

        return {
            deck: shuffled,
        };

    },

    /* function to compute the hand score */
    handScore = (hand) => {

        var score = _.sum(hand,'v');

        if(score > 21){
            //check for aces
            var aces = _.countBy(hand, {v:11}).true;
            while (score > 21 && aces > 0){
                score -= 10;
                aces -=1;
            }
        }

        return score;
    },

    /* function to handle the event of user clicking the Deal button */
    handleDealButton = () => {

        /* this variables are restrained to this closure and modifying state variables without the setState is prohibited */
        var deck        = this.state.deck;
        var playerhand  = [];
        var dealerhand  = [];

        //check deck size to see if we need to shuffle a new deck
        if(deck.length < 5){
            deck = _.shuffle(this.props.deck);
        }

        //player hand, deal 2 cards
        playerhand.push(deck.pop());
        playerhand.push(deck.pop());

        //lets just burn a card
        deck.pop();

        //dealer card
        //since we are using client side state the dealer secret card is only popped out of the deal at the time the user clicks Stand.
        dealerhand.push(deck.pop());

        //set the updates
        this.setState({
            player :  playerhand,
            dealer : dealerhand,
            deck : deck,
            status : "playing"
        });

    },

    /* function to handle the event of user clicking the Hit button */
    handleHitButton = () => {

        var newStatus = this.state.status;
        var playerHand = this.state.player;

        // check deck size to see if we need to shuffle a new deck
        if(this.state.deck.length < 5){
            this.state.deck = _.shuffle(this.props.deck);
        }

        // we shuffle every time so you don't cheat by checking component state :D
        var shuffled = _.shuffle(this.state.deck);

        // deal the card
        playerHand.push(shuffled.pop());

        var newPlayerscore = this.handScore(playerHand);

        // five card charlie
        if(newPlayerscore < 21 && playerHand.length == 5)
            newStatus = "win";
        if(newPlayerscore > 21)
            newStatus = "lose";

        // set the updates
        this.setState({
            player :  playerHand,
            playerscore: newPlayerscore,
            deck : shuffled,
            status : newStatus
        });

    },

    /* function to handle the event of user clicking the Stand button */
    handleStandButton = () => {

        // check deck size to see if we need to shuffle a new deck
        var dealerHand = this.state.dealer;
        var deck = this.state.deck;
        if(deck.length < 5) {
            deck = _.shuffle(this.props.deck);
        }

        // we shuffle every time so you don't cheat by checking component state :D
        var shuffled = _.shuffle(deck);

        // update scores for the interface component
        var dealerScore = this.handScore(dealerHand);
        var playerScore = this.handScore(this.state.player);
        var dealerHasCharlie = false;

        // compute game status while dealing cards to the dealer
        while (dealerScore < playerScore || dealerScore <= 17) {

            // deal a card
            dealerHand.push(shuffled.pop());
            dealerScore = this.handScore(dealerHand);

            if(dealerScore < 21 && dealerHand.length == 5){
                // five card charlie
                dealerHasCharlie = true;
                break;
            }

        }

        // update the state variables accordingly
        this.setState({
            dealer :  dealerHand,
            deck : shuffled,
            // compute game status
            status : (dealerScore < 21 || dealerHasCharlie) ? 'lose' : 'win'
        });

    },

    /*
     lets call for a Hand component for the dealer where we will show the deck of cards,
     the user Interface component to display scores and buttons (that will trigger the game logic events)
     and finaly another Hand component for the player
     */
    render() {
        return (
            <div className='table-board'>
                <Hand
                    showDeck={true}
                    hand={this.state.dealer}
                    />
                <Interface
                    playerscore={this.handScore(this.state.player)}
                    dealerscore={this.handScore(this.state.dealer)}
                    deal={this.handleDealButton}
                    hit={this.handleHitButton}
                    stand={this.handleStandButton}
                    status={this.state.status}
                    />
                <Hand
                    hand={this.state.player}
                    />
            </div>
        );
    }
};


export default CardDeck;
