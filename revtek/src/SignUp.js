import React, { Component } from "react";
import Background from "./assets/homePhoto.jpg";
import { Input, Button, Row, Col } from "antd";
import fire from "./fire";
import SignUpForm from './SignUpForm';
import UserMessage from './UserMessage';
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

  signup = e => {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {
        var user = fire.auth().currentUser;
        this.logUser(user);
      })
      .catch(error => {
        console.log(error);
      });
    this.setState({ clicked: true });
  };

  // When the submit button is clicked, the user input gets put on firebase
  logUser = user => {
    let ref = fire.database().ref('users');
    let obj = {
      email: this.state.email,
      username: this.state.username,
      fullname: this.state.fullname,
      password: this.state.password,
      status: this.state.status
    }
    ref.push(obj);
  };

  // updates each input's corresponding state
  handleUserInput = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {

    return (
      <div>

        {this.state.user ? (<UserMessage person={this.state.user} />) : (<SignUpForm person={this.state.user} />)}
      </div>
    );
  }
}
