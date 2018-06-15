import React, { Component } from "react";
import Background from "./assets/homePhoto.jpg";
import { Input, Button, Row, Col } from "antd";
import fire from "./fire";
import SignUpForm from "./SignUpForm";
import UserMessage from "./UserMessage";
import TopBar from "./top-bar";

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      username: "",
      fullname: "",
      password: "",
      status: "",
      user: {},
      clicked: false
    };
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
        {this.state.user ? (
          <UserMessage person={this.state.user} />
        ) : (
          <SignUpForm person={this.state.user} />
        )}
      </div>
    );
  }
}
