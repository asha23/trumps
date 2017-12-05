import React, { Component } from 'react';
import Card from './app/Card';

class Hand extends Component {
  getDefaultProps = () => {
    return {
      hand: []
    }
  }

  render() {
    <div className="hand">
      {this.props.showDeck ? <Card hidden={true} /> : ''}
      {this.props.hand.map(function(card, index) {
        return <Card face={card.f} value={card.v} key={i} />
      })}
    </div>
  }
}

export default Hand;
