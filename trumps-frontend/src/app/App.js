import React, { Component } from 'react';
//import CardDeck from './CardDeck';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      deck: [],
      dataRoute: 'http://trumps.local/wp-json/wp/v2/trumps?_embed',
      decks:""

    }

    //this.doCards = this.doCards.bind(this);
    this.shuffleCards = this.shuffleCards.bind(this);

  }

  componentDidMount = () => {
    let deck = []
    let image = "";
    let title = "";
    let value_1 = "";
    let value_2 = "";
    let value_3 = "";
    let value_4 = "";

    fetch(this.state.dataRoute)
        .then(res => res.json())
        .then(cards => this.setState((prevState, props) => {

            for (let i=0; i<cards.length; i++) {

              title = cards[i]['title']['rendered'];
              image = cards[i]['acf']['image'];
              value_1 = cards[i]['acf']['value_1'];
              value_2 = cards[i]['acf']['value_2'];
              value_3 = cards[i]['acf']['value_3'];
              value_4 = cards[i]['acf']['value_4'];

              deck.push({
                "title":title,
                "image":image,
                "val1":value_1,
                "val2":value_2,
                "val3":value_3,
                "val4":value_4
              });

            }

        }));

        

  }

  shuffleCards(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    console.log("hello")
    this.setState({
      decks:deck
    })
  }



  render() {

      return (
        <div>
          {this.state.decks}
        </div>
    );


  }
}

export default App;
