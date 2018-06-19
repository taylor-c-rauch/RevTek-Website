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
  render() {
    console.log(this.props.approved);
      return (
        <div>
          {this.props.user ? <Redirect to="/profile"/> : <div> <LoginForm updateField={this.props.updateField} user={this.props.user} person={this.props.person} /></div>}
        </div>
        
      )
  }
}
