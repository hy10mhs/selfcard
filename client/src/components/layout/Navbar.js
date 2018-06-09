import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCard, clearCards } from '../../actions/cardActions';

class Navbar extends React.Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCard();
    this.props.clearCards();
    this.props.logoutUser();
  }

  render () {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item active" data-toggle="collapse" data-target=".collapse.show">
          <Link className="nav-link" to="/dashboard">Dashboard</Link>
        </li>
        <li className="nav-item active" data-toggle="collapse" data-target=".collapse.show">
          <Link className="nav-link" to="/makecard">MakeCard</Link>
        </li>
        <li className="nav-item active" data-toggle="collapse" data-target=".collapse.show">
          <a className="nav-link" href="" onClick={this.onLogoutClick.bind(this)}>Logout</a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item active" data-toggle="collapse" data-target=".collapse.show">
          <Link className="nav-link" to="/register">SignUp</Link>
        </li>
        <li className="nav-item active" data-toggle="collapse" data-target=".collapse.show">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container">
          <button data-toggle="collapse" data-target=".collapse.show" style={{borderWidth: '0', backgroundColor: 'unset'}}><Link className="navbar-brand" to="/">SELF Card</Link></button>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            { isAuthenticated ? authLinks : guestLinks }
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCard, clearCards })(Navbar);
