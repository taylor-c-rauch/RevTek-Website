import React, { Component } from "react";
import { Input, Button, Row, Col } from "antd";
import fire from "./fire";
import App from "./App";
import Background from "./assets/homePhoto.jpg";
import { Link } from "react-router-dom";
import Profile from './profilepage';
import LoginForm from './LoginForm';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    }
  }

  UNSAFE_componentWillMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.user ? <Profile /> : <LoginForm />}
      </div>
    );
  }
}
