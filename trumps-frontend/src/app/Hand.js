import React, { Component } from 'react';
import Card from './Card';

class Hand extends Component {
  getDefaultProps = () => {
    return {
      hand: []
    }
  }

  render() {
    return(
      <div className="hand">
        {this.props.showDeck ? <Card hidden={true} /> : ''}
        {this.props.hand.map(function(card, index) {
        //  return <Card face={card.f} value={card.v} key={i} />
        })}
      </div>
    )
  }
}

export default Hand;
