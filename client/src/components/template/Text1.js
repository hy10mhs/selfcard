import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCard } from '../../actions/cardActions';
import isEmpty from '../../validation/is-empty';

class Text1 extends React.Component {
  componentDidMount() {
    if ( isEmpty(this.props.pagedata) ) {
      const { card } = this.props.card;
    
      let page = [];
      if(card && card.page && !isEmpty(card.pageidx) && !isEmpty(card.page[card.pageidx])) {
        page = card.page;
        page.splice(card.pageidx, 1, {
          type1: card.page[card.pageidx].type1,
          type2: card.page[card.pageidx].type2,
          text: !isEmpty(card.page[card.pageidx].text) ? card.page[card.pageidx].text : Array.apply(null, Array(5)).map(item => ''),
          img: !isEmpty(card.page[card.pageidx].img) ? card.page[card.pageidx].img : Array.apply(null, Array(1)).map(item => { return {} }),
          movie: []
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
          text: !isEmpty(card.page[card.pageidx].text) ? card.page[card.pageidx].text : Array.apply(null, Array(5)).map(item => ''),
          img: !isEmpty(card.page[card.pageidx].img) ? card.page[card.pageidx].img : Array.apply(null, Array(1)).map(item => { return {} }),
          movie: []
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
      <div className="template text1">
        <div className="container p-0 m-0" style={{width: '100%', height: '100%', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundImage: `url('${!isEmpty(page) && !isEmpty(page.img) && !isEmpty(page.img[0]) ? page.img[0].url : null}')`}}>
            { !isEmpty(page) && !isEmpty(page.img) && !isEmpty(page.img[0]) ? null : <div style={{height: '100vh', width: '100%', position: 'absolute'}}><div className="text-center" style={{paddingTop: '45vh'}}>Upload Image1</div></div>}
            <div className="row">
                <div className="col text-center" style={{marginTop: '55vh'}}>
                <h1 style={{fontFamily: "'Jua', sans-serif"}}>{ !isEmpty(page) && !isEmpty(page.text) && !isEmpty(page.text[0]) ? page.text[0] : 'Insert text1'}</h1>
                </div>
            </div>
            <hr style={{width: '70%', margin: 'auto', paddingBottom: '3px'}}/>
            <div className="row">
                <div className="col text-center">
                <span style={{fontFamily: "'Jua', sans-serif"}}>{ !isEmpty(page) && !isEmpty(page.text) && !isEmpty(page.text[1]) ? page.text[1] : 'Insert text2'}</span>
                </div>
            </div>
            <div className="row">
                <div className="col text-center">
                <span style={{fontFamily: "'Jua', sans-serif"}}>{ !isEmpty(page) && !isEmpty(page.text) && !isEmpty(page.text[2]) ? page.text[2] : 'Insert text3'}</span>
                </div>
            </div>
            <div className="row">
                <div className="col text-center">
                <span style={{fontFamily: "'Jua', sans-serif"}}>{ !isEmpty(page) && !isEmpty(page.text) && !isEmpty(page.text[3]) ? page.text[3] : 'Insert text4'}</span>
                </div>
            </div>
            <div className="row">
                <div className="col text-center">
                <span style={{fontFamily: "'Jua', sans-serif"}}>{ !isEmpty(page) && !isEmpty(page.text) && !isEmpty(page.text[4]) ? page.text[4] : 'Insert text5'}</span>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

Text1.propTypes = {
  setCard: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  card: state.card
});

export default connect(mapStateToProps, { setCard })(Text1);
