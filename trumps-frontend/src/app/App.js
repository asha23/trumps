import React, { Component } from 'react';
import CardDeck from './app/CardDeck';
import WordPressConnect from './app/WordPressConnect';

class App extends Component {
  getInitialState = () => {
    // Set the initial state as the cards array from Wordpress
    return (
      cards: [{v:11, f:"c5"}]
    )
  }

  shuffleDeck = (cards) => {
    for (let i = cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
  }

  render() {
    return(
      <CardDeck deck={this.shuffleDeck(this.state.cards)} />
    )
  }
}

export default App;
