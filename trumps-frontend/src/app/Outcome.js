import React, { Component } from 'react';

class Outcome extends Component {
  getDefaultProps = () => {
    return {
      status: playing
    }
  }

  render() {
    switch(this.props.status) {
      case "playing":
        return (<div className="alert alert-info" role="alert">Next card</div>);
        break;
      case "win":
        return(<div className="alert alert-success" role="alert">Win</div>);
        break;
      case "lose":
        return(<div className="alert alert-danger" role="alert">You Lose</div>);
        break;
      default:
        return(<div className="alert alert-info" role="alert">Click to Start</div>);
        break;
    }
  }
}

export default Outcome;
