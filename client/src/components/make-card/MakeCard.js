import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Resize, ResizeHorizon } from 'react-resize-layout';
import classnames from 'classnames';
import windowSize from 'react-window-size';
import Display from './Display';
import Pallete from './Pallete';

class MakeCard extends React.Component {
  constructor() {
    super();

    // const detail = {};

    // detail.nav = {};
    // detail.nav.isuse = false;
    // detail.nav.numofbtn = null;
    // detail.nav.btn = [];

    // detail.backmusic = {};
    // detail.backmusic.isuse = false;
    // detail.backmusic.src = null;
    // detail.backmusic.isrepeated = null;

    // detail.scroll = {};
    // detail.scroll.isuse = false;
    // detail.scroll.typeofscroll = null;

    // detail.isopen = {};
    // detail.isopen.isuse = false;

    this.state = {
      overlap: false
    };

    this.onToggleClick = this.onToggleClick.bind(this);
  }

  onToggleClick () {
    this.setState({ overlap: !this.state.overlap});
  }

  render () {
    let content;
    
    if(this.props.windowWidth > 992) {
      content = (
        <Resize handleWidth="10px" handleColor="#777">
          <ResizeHorizon width={this.props.windowWidth * 0.6}>
            <div id="displaywrap">
              <Display />
            </div>
          </ResizeHorizon>
          <ResizeHorizon width={this.props.windowWidth * 0.4} overflow="auto">
            <div id="palletewrap">
              <Pallete />
            </div>           
          </ResizeHorizon>
        </Resize>
      );
    } else {
      content = (
        <div>
          <div id="pallete-toggle"
            className={classnames('', {'pallete-open': this.state.overlap, 'pallete-close': !this.state.overlap})}
          >
            <a onClick={this.onToggleClick}><i className={classnames('', {'fa fa-angle-double-down': this.state.overlap, 'fa fa-angle-double-up': !this.state.overlap})}></i></a>
          </div>        
          <div id="displaywrap">
            <Display />
          </div>
          <div id="palletewrap" className={classnames('', {'palletewrap-overlap': this.state.overlap, 'palletewrap-hidden': !this.state.overlap})}>
            <Pallete />
          </div>
        </div>
      );
    }

    return (
      <div className="make-card">
        { content }
      </div>
    )
  }
}

MakeCard.propTypes = {
  card: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  card: state.card,
  errors: state.errors
});

export default connect(mapStateToProps)(windowSize(MakeCard));
