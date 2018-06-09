import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from '../../validation/is-empty';
import Main1 from '../template/Main1';
import Main2 from '../template/Main2';
import Text1 from '../template/Text1';
import Text2 from '../template/Text2';
import Img1 from '../template/Img1';
import Img2 from '../template/Img2';
import Movie1 from '../template/Movie1';
import Movie2 from '../template/Movie2';
import Comment1 from '../template/Comment1';
import Comment2 from '../template/Comment2';
import Map1 from '../template/Map1';
import Map2 from '../template/Map2';

class Display extends React.Component {
  render () {
    const { card } = this.props.card;
    let displayContent;

    if( card && card.page && !isEmpty(card.pageidx) && card.page[card.pageidx] && card.page[card.pageidx].type1 && card.page[card.pageidx].type2 ) {
      if(card.page[card.pageidx].type1 + card.page[card.pageidx].type2 === 'Main1') {
        displayContent = <Main1 />;
      } else if ( card.page[card.pageidx].type1 + card.page[card.pageidx].type2 === 'Main2' ) {
        displayContent = <Main2 />;
      } else if ( card.page[card.pageidx].type1 + card.page[card.pageidx].type2 === 'Text1' ) {
        displayContent = <Text1 />;
      } else if ( card.page[card.pageidx].type1 + card.page[card.pageidx].type2 === 'Text2' ) {
        displayContent = <Text2 />;
      } else if ( card.page[card.pageidx].type1 + card.page[card.pageidx].type2 === 'Img1' ) {
        displayContent = <Img1 />;
      } else if ( card.page[card.pageidx].type1 + card.page[card.pageidx].type2 === 'Img2' ) {
        displayContent = <Img2 />;
      } else if ( card.page[card.pageidx].type1 + card.page[card.pageidx].type2 === 'Movie1' ) {
        displayContent = <Movie1 />;
      } else if ( card.page[card.pageidx].type1 + card.page[card.pageidx].type2 === 'Movie2' ) {
        displayContent = <Movie2 />;
      } else if ( card.page[card.pageidx].type1 + card.page[card.pageidx].type2 === 'Comment1' ) {
        displayContent = <Comment1 />;
      } else if ( card.page[card.pageidx].type1 + card.page[card.pageidx].type2 === 'Comment2' ) {
        displayContent = <Comment2 />;
      } else if ( card.page[card.pageidx].type1 + card.page[card.pageidx].type2 === 'Map1' ) {
        displayContent = <Map1 />;
      } else if ( card.page[card.pageidx].type1 + card.page[card.pageidx].type2 === 'Map2' ) {
        displayContent = <Map2 />;
      }
    } else {
      displayContent = <div style={{fontSize: '25px', paddingTop: '43vh', textAlign: 'center'}}>Select Main/Sub Type</div>;
    }

    return (
      <div id="display">
        { displayContent }
      </div>
    );
  }
}

Display.propTypes = {
  card: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  card: state.card
});

export default connect(mapStateToProps)(Display);
