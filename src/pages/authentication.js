import React, { PureComponent } from "react";
import { Route, Redirect } from "react-router-dom";
import fire from "../fire";
import "../layouts/css/site.css";
import "../layouts/css/entry.css";

import { connect } from "react-redux";

class Authentication extends PureComponent {
  constructor(props) {
    super(props);
    this._handleSignup = this._handleSignup.bind(this);
    this._handleSignIn = this._handleSignIn.bind(this);
    this._setCreateMode = this._setCreateMode.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      newUser: false,
      returningUser: false,
      loading: false,
      createMode: false
    };
  }

  _setCreateMode() {
    this.setState({ createMode: true })
  }

  _handleSignIn() {
    this.setState({ loading: true });

    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        function(user) {
          fire
            .database()
            .ref("users/" + user.uid)
            .once("value")
            .then(
              function(snapshot) {
                console.log("SIGN IN SNAPSHOT", snapshot.val());
                this.props.setCurrentUser(
                  user.uid,
                  snapshot.val().username,
                  snapshot.val().email,
                  snapshot.val().hasNotifications,
                  snapshot.val().paypal_email,
                  snapshot.val().seller,
                  snapshot.val().stripe
                );
              }.bind(this)
            );
        }.bind(this)
      )
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("LOGIN ERROR", errorCode, errorMessage);
        // ...
      });
  }

  _handleSignup() {
    this.setState({
      loading: true,
      newUser: true
    });

    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        function(user) {
          const newUser = fire.auth().currentUser;

          this.props.createAndSignInUser(
            user.uid,
            this.state.username,
            this.state.email
          );

          this.setState({ loading: false });
        }.bind(this)
      )
      .catch(function(error) {
        // handle errors.
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  render() {
    if (this.props.userAuthenticated && this.state.newUser) {
      return <Redirect to="/welcome-to-boardgrab" />;
    }

    if (this.props.userAuthenticated && !this.state.newUser) {
      return <Redirect to="/" />;
    }

    return (
      <div className="authentication-wrapper">
        <div className="authentication-form">
          <div className="authentication-header">
            <img
              className="navbar__logo"
              style={{ marginBottom: 0 }}
              src={require("../layouts/images/maya_logo.png")}
            />
          </div>

          <div className="authentication-body">

            { !this.state.createMode
              ?
              <div>
              <div className="form-wrapper" style={{ marginBottom: "18px" }}>
                <div className="input-wrap">
                  <input
                    onChange={e => {
                      this.setState({ email: e.target.value });
                    }}
                    placeholder="Email Address"
                    className="form-input"
                  />
                </div>
              </div>
              <div className="form-wrapper">
                <div className="input-wrap">
                  <input
                    onChange={e => {
                      this.setState({ password: e.target.value });
                    }}
                    placeholder="Password"
                    className="form-input"
                    type="password"
                  />
                </div>
              </div>
              <div className="form-wrapper">
                <div className=" input-wrap--btn">
                  <button
                    onClick={() => this._handleSignIn()}
                    className="auth-button"
                    style={{ marginTop: "22px" }}
                  >
                    Sign In
                  </button>
                </div>
                <div className=" input-wrap--btn">
                  <button
                    onClick={() => this._setCreateMode()}
                    className="auth-button"
                    style={{ marginTop: "22px", backgroundColor: "#479F6B" }}
                  >
                    Create Account
                  </button>
                </div>
              </div>
              </div>
              : ''

             }

      
            <label className="authentication-label">Username</label>
            <input
              className="authentication-field"
              onChange={e => {
                this.setState({ username: e.target.value });
              }}
              type="text"
            />
            <label className="authentication-label">Email</label>
            <input
              className="authentication-field"
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
              type="text"
            />
            <label className="authentication-label">Password</label>
            <input
              className="authentication-field"
              onChange={e => {
                this.setState({ password: e.target.value });
              }}
              type="password"
            />
            <button
              onClick={() => this._handleSignup()}
              className="auth-button auth-button--black"
              style={{ marginTop: "22px" }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  userId,
  userAuthenticated,
  account_username,
  firstTimeLogin
}) => {
  return { userId, userAuthenticated, account_username, firstTimeLogin };
};

const mapDispatchToProps = dispatch => {
  return {
    createAndSignInUser: (userId, account_username, email) =>
      dispatch({
        type: `CREATE_AND_SIGNIN_USER`,
        userId,
        account_username,
        email
      }),
    setCurrentUser: (
      userId,
      username,
      email,
      hasNotifications,
      paypal_email,
      seller,
      stripe
    ) =>
      dispatch({
        type: `SET_CURRENT_USER`,
        userId,
        username,
        email,
        hasNotifications,
        paypal_email,
        seller,
        stripe
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
