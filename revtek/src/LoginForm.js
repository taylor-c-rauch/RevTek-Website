import React, { Component } from "react";
import { Input, Button, Row, Col } from "antd";
import fire from "./fire";
import App from "./App";
import Background from "./assets/homePhoto.jpg";
import { Link } from "react-router-dom";
import TopBar from "./top-bar";
import "./Login.css";
import "./SignUp.css";

export default class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      username: "",
      password: "",
      status: "",
      user: null
    };
  }

  handleUserInput = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  login = e => {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {
        console.log(u);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <section
        style={{
          backgroundImage: `url(${Background})`,
          height: 800,
          width: "100%",
          backgroundSize: "cover",
          overflow: "hidden"
        }}
      >
        <TopBar status="home" />
        <div class="HeaderFiller" />
        <div class="LoginBackground">
          <h1 className="RobotoTitle">Sign In</h1>
          <Row>
            <Col>
              <Input
                style={{ width: "70%" }}
                id="email"
                placeholder="Email"
                onChange={e => this.handleUserInput(e)}
              />
            </Col>
            <Col>
              <Input
                style={{ width: "70%" }}
                id="password"
                placeholder="Password"
                onChange={e => this.handleUserInput(e)}
              />
            </Col>
            {/* Button does nothing yet */}
            <Button type="primary" onClick={e => this.login(e)}>
              Login
            </Button>
            Don't have an account?
            <Link to="/sign-up">
              <Button shape="square" type="primary">
                Sign Up
              </Button>
            </Link>
          </Row>
        </div>
      </section>
    );
  }
}
