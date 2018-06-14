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
        this.props.updateField(user);
      } else {
        this.setState({ user: null });
        this.props.updateField(null);
      }
    });
  }

  render() {

    return (
      <div>
        {this.state.user ? <div><TopBar status={this.state.user.status} /> <Profile person={this.state.user} /></div> : <div><TopBar status="home" /> <LoginForm /></div>}
      </div>
    );
  }
}
