import React, { Component } from 'react';
import Card from './Card';
import Interface from './Interface';
import Hand from './Hand';

class CardDeck extends Component {

    getInitialState = () => {

        // table cards shuffle
        //var shuffled = shuffleDeck(this.props.cards);

        return {
            //cards: shuffled,
        };

    }

    /* function to handle the event of user clicking the Hit button */
    handleHitButton = () => {

    }

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
