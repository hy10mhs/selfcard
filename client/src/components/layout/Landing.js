import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

class Landing extends React.Component {
  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render () {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-5 pt-5 mt-5 mb-4">SELF Making Card</h1>
                <p className="lead">
                  Free for any use! Make your first card right now! <br />
                  MERN Stack
                </p>
                <hr />
                <Link className="btn btn-lg btn-info mr-2" to="/register">SignUp</Link>
                <Link className="btn btn-lg btn-light" to="/login">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
