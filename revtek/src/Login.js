import React, { Component } from "react";
import { Input, Button, Row, Col } from "antd";
import fire from "./fire";
import App from "./App";
import Background from "./assets/homePhoto.jpg";
import { Link, Redirect } from "react-router-dom";
import Profile from './profilepage';
import LoginForm from './LoginForm';
import TopBar from "./top-bar";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: null, users: []
    }
  }

  UNSAFE_componentWillMount() {
    this.authListener();
  }

  authListener() {

    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user }, () => this.newfunc());
        this.props.updateField("user", user);
        this.props.updateField("email", user.email);

      } else {
        this.setState({ user: null });
      }
    });
  }

  newfunc2() {
    Object.keys(this.state.users).forEach((key) => {
      if (this.state.users[key].email === this.state.user.email) {
        let userID = key;
        this.props.updateField("userID", userID);

        this.props.updateField("userInfo", this.state.users[key]);

        this.props.updateField("status", this.state.users[key].status);
        console.log(this.state.users[key].status)
      }
    }
    );
  }

  newfunc() {
    const usersRef = fire.database().ref('users');
    let users1 = [];
    usersRef.on('value', (snapshot) => {
      users1 = snapshot.val();

      this.props.updateField("users", users1);
      this.setState({ users: users1 }, () => this.newfunc2());
    });

  }

  render() {

    return (
      <div>
        {console.log(this.state.user)}
        {this.state.user ? <Redirect to="/profile" /> : <div> <LoginForm updateField={this.props.updateField} user={this.props.user} person={this.props.person} /></div>}
      </div>
    );
  }
}
