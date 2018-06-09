import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCard } from '../../actions/cardActions';
import isEmpty from '../../validation/is-empty';

class Movie1 extends React.Component {
  componentDidMount() {
    if ( isEmpty(this.props.pagedata) ) {
      const { card } = this.props.card;
    
      let page = [];
      if(card && card.page && !isEmpty(card.pageidx) && !isEmpty(card.page[card.pageidx])) {
        page = card.page;
        page.splice(card.pageidx, 1, {
          type1: card.page[card.pageidx].type1,
          type2: card.page[card.pageidx].type2,
          text: [],
          img: [],
          movie: !isEmpty(card.page[card.pageidx].movie) ? card.page[card.pageidx].movie : Array.apply(null, Array(1)).map(item => '')
        });
      }

      const cardData = {
        page
      };

      this.props.setCard(cardData);
    }
  }

  componentWillReceiveProps(nextProps) {
    if( isEmpty(this.props.pagedata) && (this.props.card.card.pageidx !== nextProps.card.card.pageidx) ) {
      const { card } = nextProps.card;
    
      let page = [];
      if(card && card.page && !isEmpty(card.pageidx) && !isEmpty(card.page[card.pageidx])) {
        page = card.page;
        page.splice(card.pageidx, 1, {
          type1: card.page[card.pageidx].type1,
          type2: card.page[card.pageidx].type2,
          text: [],
          img: [],
          movie: !isEmpty(card.page[card.pageidx].movie) ? card.page[card.pageidx].movie : Array.apply(null, Array(1)).map(item => '')
        });
      }

      const cardData = {
        page
      };

      this.props.setCard(cardData);
    }
  }
  
  render () {
    let page = null;
    const { card } = this.props.card;
    const { pagedata } = this.props;
    
    if( isEmpty(pagedata) ) {
      if( !isEmpty(card) ) {
        page = card.page[card.pageidx];
      }
    } else {
      page = pagedata;
    }
    
    
    return (
      <div className="template movie1">
        <div className="container p-0 m-0">
          <div className="row">
            <div className="col">
              { !isEmpty(page) && !isEmpty(page.movie) && !isEmpty(page.movie[0]) && (page.movie[0].toLowerCase().indexOf('http://') !== -1 || page.movie[0].toLowerCase().indexOf('https://') !== -1) && page.movie[0].toLowerCase().indexOf('youtube.com/embed') !== -1 ? (<div style={{margin: 'auto', width: '75%', height: '45vh', marginTop: '25vh'}}><iframe title={'Movie'+1} width="100%" height="100%" src={page.movie[0]} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe></div>) : (<div className="text-center" style={{paddingTop: '45vh'}}>Embed Movie1</div>)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Movie1.propTypes = {
  setCard: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  card: state.card
});

export default connect(mapStateToProps, { setCard })(Movie1);
