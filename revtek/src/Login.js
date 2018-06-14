import React, { Component } from "react";
import { Input, Button, Row, Col } from "antd";
import fire from "./fire";
import App from "./App";
import Background from "./assets/homePhoto.jpg";
import { Link } from "react-router-dom";
import Profile from './profilepage';
import LoginForm from './LoginForm';
import TopBar from "./top-bar";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: {}, users: []
    }
  }

  UNSAFE_componentWillMount() {
    this.authListener();
  }

  authListener() {

    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user });
        this.props.updateField("user", user);
        this.props.updateField("email", user.email);

      } else {
        this.setState({ user: null });
      }
    });
  }

  newfunc() {
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

  componentDidMount() {
    const usersRef = fire.database().ref('users');
    let users1 = [];
    usersRef.on('value', (snapshot) => {
      users1 = snapshot.val();

      this.props.updateField("users", users1);
      this.setState({ users: users1 }, () => this.newfunc());
    });

  }

  render() {

    return (
      <div>
        {this.state.user ? <div><TopBar status={this.props.person.status} /> <Profile person={this.props.person} /></div> : <div> <LoginForm /></div>}
      </div>
    );
  }
}
