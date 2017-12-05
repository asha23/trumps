import React, { Component } from 'react';
import CardDeck from './CardDeck';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      dataRoute: 'http://trumps.local/wp-json/wp/v2/trumps?_embed'
    }
  }

  componentDidMount = () => {
    fetch(this.state.dataRoute)
        .then(res => res.json())
        .then(cards => this.setState((prevState, props) => {
            return {
              cards: cards.map(this.mapCard)
            };
        }));
  }

  mapCard = (card) => {

    return {
      title: card.title.rendered,
      image: card.acf.image,
      value_1: card.acf.value_1,
      value_2: card.acf.value_2,
      value_3: card.acf.value_3,
      value_4: card.acf.value_4
    }

  }

  getInitialState = () => {

    return (
      cards: cards
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
      <CardDeck cards={this.shuffleDeck(this.state.cards)} />
    )
  }
}

export default App;
