import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCards } from '../../actions/cardActions';
import Spinner from '../common/Spinner';
import isEmpty from '../../validation/is-empty';
import CardSlide from './CardSlide';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.getCards();
  }

  render () {
    const { user } = this.props.auth;
    const { cards, cardsloading } = this.props.card;

    let dashboardContent;

    if( cards === null || cardsloading ) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has cards data
      if(!isEmpty(cards)) {
        dashboardContent = (
          <div className="text-center">
            <CardSlide cards={cards} />
            <Link to="/makecard" className="btn btn-lg btn-info">MakeCard</Link>
          </div>
        );
      } else {
        // User is logged in but has no cards
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome { user.name }</p>
            <p>You have not yet make a card, MakeCard right now!</p>
            <Link to="/makecard" className="btn btn-lg btn-info">MakeCard</Link>
          </div>
        )
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              { dashboardContent }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCards: PropTypes.func.required,
  auth: PropTypes.object.isRequired,
  card: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  card: state.card
});

export default connect(mapStateToProps, { getCards })(Dashboard);
