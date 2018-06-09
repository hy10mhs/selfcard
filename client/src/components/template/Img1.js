import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCard } from '../../actions/cardActions';
import isEmpty from '../../validation/is-empty';

class Img1 extends React.Component {
    constructor(){
        super();
        this.state = {

        };

        this.onImgClick = this.onImgClick.bind(this);
        this.onModalCloseClick = this.onModalCloseClick.bind(this);
    }

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
            img: !isEmpty(card.page[card.pageidx].img) ? card.page[card.pageidx].img : Array.apply(null, Array(6)).map(item => { return {} }),
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
            text: [],
            img: !isEmpty(card.page[card.pageidx].img) ? card.page[card.pageidx].img : Array.apply(null, Array(6)).map(item => { return {} }),
            movie: []
            });
        }

        const cardData = {
            page
        };

        this.props.setCard(cardData);
        }
    }

    onImgClick (e) {
        document.getElementById("img01").src = e.target.src;
        document.getElementById("modal01").style.display = "block";
        var captionText = document.getElementById("caption");
        captionText.innerHTML = '';//element.alt;
    }

    onModalCloseClick (e) {
        document.getElementById("modal01").style.display = 'none';
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
            <div className="template img1">
                <div className="w3-row">
                    <div className="w3-col s6">
                    <div style={{border: '1px solid #777', width: '100%', height: '33.33333vh', overflow: 'hidden'}}> { !isEmpty(page) && !isEmpty(page.img) && !isEmpty(page.img[0]) && !isEmpty(page.img[0].url) ? (<img src={page.img[0].url} style={{width: '100%'}} onClick={this.onImgClick} />) : 'Upload Image1'}</div>
                    <div style={{border: '1px solid #777', width: '100%', height: '33.33333vh', overflow: 'hidden'}}> { !isEmpty(page) && !isEmpty(page.img) && !isEmpty(page.img[2]) && !isEmpty(page.img[2].url) ? (<img src={page.img[2].url} style={{width: '100%'}} onClick={this.onImgClick} />) : 'Upload Image3'}</div>
                    <div style={{border: '1px solid #777', width: '100%', height: '33.33333vh', overflow: 'hidden'}}> { !isEmpty(page) && !isEmpty(page.img) && !isEmpty(page.img[4]) && !isEmpty(page.img[4].url) ? (<img src={page.img[4].url} style={{width: '100%'}} onClick={this.onImgClick} />) : 'Upload Image5'}</div>
                    </div>
                    <div className="w3-col s6">
                    <div style={{border: '1px solid #777', width: '100%', height: '33.33333vh', overflow: 'hidden'}}> { !isEmpty(page) && !isEmpty(page.img) && !isEmpty(page.img[1]) && !isEmpty(page.img[1].url) ? (<img src={page.img[1].url} style={{width: '100%'}} onClick={this.onImgClick} />) : 'Upload Image2'}</div>
                    <div style={{border: '1px solid #777', width: '100%', height: '33.33333vh', overflow: 'hidden'}}> { !isEmpty(page) && !isEmpty(page.img) && !isEmpty(page.img[3]) && !isEmpty(page.img[3].url) ? (<img src={page.img[3].url} style={{width: '100%'}} onClick={this.onImgClick} />) : 'Upload Image4'}</div>
                    <div style={{border: '1px solid #777', width: '100%', height: '33.33333vh', overflow: 'hidden'}}> { !isEmpty(page) && !isEmpty(page.img) && !isEmpty(page.img[5]) && !isEmpty(page.img[5].url) ? (<img src={page.img[5].url} style={{width: '100%'}} onClick={this.onImgClick} />) : 'Upload Image6'}</div>
                    </div>
                </div>

                <div id="modal01" className="w3-modal w3-black" style={{paddingTop: '0'}} onClick={this.onModalCloseClick}>
                    <span className="w3-button w3-black w3-xlarge w3-display-topright">×</span>
                    <div className="w3-modal-content w3-animate-zoom w3-center w3-transparent w3-padding-64">
                    <img id="img01" className="w3-image" />
                    <p id="caption"></p>
                    </div>
                </div>
            </div>
        );
    }
}

Img1.propTypes = {
  setCard: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  card: state.card
});

export default connect(mapStateToProps, { setCard })(Img1);
