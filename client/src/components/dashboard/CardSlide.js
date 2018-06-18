import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

class CardSlide extends Component {
    render() {
        const { cards } = this.props;
        let content = cards.map((card, index) => (
            <div key={index} style={{width: '100%', height: '35vh'}}>
                <div style={{height: '80%'}}>
                    <iframe scrolling="no" width="100%" height="100%" src={"/card/"+card.handle} title="slideitem"></iframe>
                </div>
                <div className="btn" style={{wordWrap: 'break-word'}} onClick={() => window.location=`http://selfcard.herokuapp.com/card/${card.handle}` }>
                    http://selfcard.herokuapp.com/card/{card.handle}
                </div>
            </div>));
        return (
            <div>
                <AliceCarousel showSlideIndex={true}>
                    {content}
                </AliceCarousel>
            </div>
        );
    }
}

CardSlide.propTypes = {
    cards: PropTypes.array.isRequired
};

export default CardSlide;