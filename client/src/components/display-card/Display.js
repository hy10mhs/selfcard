import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCard } from '../../actions/cardActions';

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

function mapStateToProps(state) {
    return {
        card: state.card
    };
}

class Display extends Component {
    componentDidMount() {
        if (this.props.match.params.handle) {
            this.props.getCard(this.props.match.params.handle);
        }
    }
    
    render() {
        const { card } = this.props.card;

        let content = [];

        if( card && card.page ) {
            for(let i=0; i < card.page.length; i++) {
                if(card.page[i].type1 + card.page[i].type2 === 'Main1') {
                    content.push(<Main1 key={ i } pagedata={card.page[i]}/>);
                } else if ( card.page[i].type1 + card.page[i].type2 === 'Main2' ) {
                    content.push(<Main2 key={ i } pagedata={card.page[i]}/>);
                } else if ( card.page[i].type1 + card.page[i].type2 === 'Text1' ) {
                    content.push(<Text1 key={ i } pagedata={card.page[i]}/>);
                } else if ( card.page[i].type1 + card.page[i].type2 === 'Text2' ) {
                    content.push(<Text2 key={ i } pagedata={card.page[i]}/>);
                } else if ( card.page[i].type1 + card.page[i].type2 === 'Img1' ) {
                    content.push(<Img1 key={ i } pagedata={card.page[i]}/>);
                } else if ( card.page[i].type1 + card.page[i].type2 === 'Img2' ) {
                    content.push(<Img2 key={ i } pagedata={card.page[i]}/>);
                } else if ( card.page[i].type1 + card.page[i].type2 === 'Movie1' ) {
                    content.push(<Movie1 key={ i } pagedata={card.page[i]}/>);
                } else if ( card.page[i].type1 + card.page[i].type2 === 'Movie2' ) {
                    content.push(<Movie2 key={ i } pagedata={card.page[i]}/>);
                } else if ( card.page[i].type1 + card.page[i].type2 === 'Comment1' ) {
                    content.push(<Comment1 key={ i } pagedata={card.page[i]}/>);
                } else if ( card.page[i].type1 + card.page[i].type2 === 'Comment2' ) {
                    content.push(<Comment2 key={ i } pagedata={card.page[i]}/>);
                } else if ( card.page[i].type1 + card.page[i].type2 === 'Map1' ) {
                    content.push(<Map1 key={ i } pagedata={card.page[i]}/>);
                } else if ( card.page[i].type1 + card.page[i].type2 === 'Map2' ) {
                    content.push(<Map2 key={ i } pagedata={card.page[i]}/>);
                }                
            }
        }

        return (
            <div>
                { content }
            </div>
        );
    }
}

export default connect(
    mapStateToProps, { getCard }
)(Display);