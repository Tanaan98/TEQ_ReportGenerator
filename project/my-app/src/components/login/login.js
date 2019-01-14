import React, { Component } from 'react';
import './login.css';


import { auth } from '../../firebase';
import firebase from 'firebase';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        if (firebase.auth().currentUser.uid === 'K2VAv4k1nMfv3R6ogE1Wby86eiz1'){
          history.push('/alt');
        } else {
          history.push('/main');
        }
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
  	const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <div>

        <div className="container-login">
          <div className="wrap-login">

            <div className="container-image">
              <img src="https://www.scarboroughlip.com/images/structure/logo.png" 
                alt="Avatar" className="avatar"/>
            </div>

            <form onSubmit={this.onSubmit} className="login-form">

              <div className="wrap-input">
                <input
                  className="login-input"
                  value={email}
                  onChange={event => this.setState(byPropKey('email', event.target.value))}
                  type="userInput"
                  placeholder="Email Address"/>
              </div>

              <div className="wrap-input">
                <input
                  className="login-input"
                  value={password}
                  onChange={event => this.setState(byPropKey('password', event.target.value))}
                  type="password"
                  placeholder="Password"/>
              </div>  
              <div className="btn-container">
                <button className="login-button" disabled={isInvalid} type="submit">Continue</button>
              </div>
              
              { error && <p>{error.message}</p> }

            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;