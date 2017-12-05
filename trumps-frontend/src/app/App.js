import React, { Component } from 'react';
//import CardDeck from './CardDeck';

// class App extends Component {
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       cards: [],
//       deck: [],
//       dataRoute: 'http://trumps.local/wp-json/wp/v2/trumps?per_page=100',
//
//     }
//
//     //this.doCards = this.doCards.bind(this);
//     //this.CardList = this.CardList.bind(this);
//
//   }
//
//   componentDidMount = () => {
//     let deck = []
//     let image = "";
//     let title = "";
//     let value_1 = "";
//     let value_2 = "";
//     let value_3 = "";
//     let value_4 = "";
//
//     fetch(this.state.dataRoute)
//         .then(res => res.json())
//         .then(cards => this.setState((prevState, props) => {
//
//             for (let i=0; i<cards.length; i++) {
//
//               title = cards[i]['title']['rendered'];
//               image = cards[i]['acf']['image'];
//               value_1 = cards[i]['acf']['value_1'];
//               value_2 = cards[i]['acf']['value_2'];
//               value_3 = cards[i]['acf']['value_3'];
//               value_4 = cards[i]['acf']['value_4'];
//
//               deck.push({
//                 "title":title,
//                 "image":image,
//                 "val1":value_1,
//                 "val2":value_2,
//                 "val3":value_3,
//                 "val4":value_4
//               });
//
//             }
//
//         }));
//
//         console.log(deck)
//
//         this.setState({
//             deck:deck
//         })
//
//
//
//         for (let i = deck.length - 1; i > 0; i--) {
//             let j = Math.floor(Math.random() * (i + 1));
//             [deck[i], deck[j]] = [deck[j], deck[i]];
//         }
//
//
//
//
//   }
//
//   render() {
//     let cont = this.state.deck.map((cont, index) => {
//       return <div key={index}>
//               // <img src={movie._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url} alt="" />
//               <p><strong>Title:</strong> { cont.title.rendered}</p>
//               <p><strong>Val 1:</strong> { cont.acf.val1}</p>
//               <p><strong>Val 2:</strong> {movie.acf.val2}</p>
//               <div><strong>Val 3:</strong> {movie.acf.val3} </div>
//             </div>
//     }
//     );
//
// }

class App extends Component {
  constructor() {
    super();
    this.state = {
      cards: []
    }
  }
componentDidMount() {
    let dataURL = "http://trumps.local/wp-json/wp/v2/trumps?per_page=100";
    fetch(dataURL)
      .then(res => res.json())
      .then(res => {
        
        this.setState({
          cards: res
        })
      })
  }
render() {
    let cards = this.state.cards.map((card, index) => {
      return <div key={index}>
              <p><strong>Title:</strong> {card.title.rendered}</p>
              <p><strong>Drunk Factor:</strong> {card.acf.value_1}</p>
              <p><strong>Hangover:</strong> {card.acf.value_2}</p>
              <p><strong>Embarrassment Level:</strong> {card.acf.value_3}</p>
              <p><strong>People Offended:</strong> {card.acf.value_4} </p>
            </div>
    });
return (
      <div>
        {cards}
      </div>
    )
  }
}

export default App;
