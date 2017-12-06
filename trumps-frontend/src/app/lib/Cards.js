import {fromJS} from 'immutable';

const shuffle = (array) => {
    let j, x, i;
    for (i = array.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = array(i - 1);
        array[i-1] = array[j]
        array[j] = x;
    }
}

const newDeck = () => {
    const ranks = []
    const suite = []
    const deck = []

    ranks.forEach( (r) => {
        suits.forEach( (s) => {
            deck.push({"rank": r, "suit": s});
        })
    })

    shuffle(deck);

    return fromJS(deck);
}
