import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCard } from '../../actions/cardActions';
import isEmpty from '../../validation/is-empty';

class Main2 extends React.Component {
  componentDidMount() {
    const { card } = this.props.card;
  
    let page = [];
    if(card && card.page && !isEmpty(card.pageidx) && !isEmpty(card.page[card.pageidx])) {
      page = card.page;
      page.splice(card.pageidx, 1, {
        type1: card.page[card.pageidx].type1,
        type2: card.page[card.pageidx].type2,
        text: !isEmpty(card.page[card.pageidx].text) ? card.page[card.pageidx].text : Array.apply(null, Array(1)).map(item => ''),
        img: !isEmpty(card.page[card.pageidx].img) ? card.page[card.pageidx].img : Array.apply(null, Array(1)).map(item => { return {} }),
        movie: !isEmpty(card.page[card.pageidx].movie) ? card.page[card.pageidx].movie : Array.apply(null, Array(1)).map(item => '')
      })
    }

    const cardData = {
      page
    };

    this.props.setCard(cardData);
  }

  render () {
    // const { card } = this.props.card;

    // let page = null;
    // if(card) {
    //   page = card.page;
    // }
    
    // const pageidx = 0;
    
    return (
      <div>
          Main2
      </div>
    );
  }
}

Main2.propTypes = {
  setCard: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  card: state.card
});

export default connect(mapStateToProps, { setCard })(Main2);
