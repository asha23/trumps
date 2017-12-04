import React, { Component } from 'react';

class Logic extends Component {
  constructor = (props) => {
    super(props);
    this.state = this.setInitialState(props.cards);
    this.cardClick = this.cardClick.bind(this);
  }

  componentWillReceiveProps = (nextProps) => {

  }

  setCardState = (cards) => {
    // Create array of cards
  }


}

export default Logic;
