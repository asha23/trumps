

import React, { Component } from 'react';
// /import { connect } from 'react-redux'


class WordPressConnect extends Component {

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

  shuffleArray = (cards) => {
      for (let i = cards.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [cards[i], cards[j]] = [cards[j], cards[i]];
      }
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

  render() {
    return (
      <div>
        {

          this.state.cards.map((card, index) =>

            <div className="card" key={index}>
              <p>{card.title}</p>
              <p>{card.image}</p>
              <p>{card.value_1}</p>
              <p>{card.value_2}</p>
              <p>{card.value_3}</p>
              <p>{card.value_4}</p>
            </div>

          )
      }

      </div>
    );
  }
}

console.log(cards);

// const mapStateToProps = store => {
//   return {
//     title: store.card.title.rendered
//   }
// }

export default WordPressConnect;
