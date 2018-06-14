import React, { Component } from "react";
import { Input, Button, Row, Col } from "antd";
import fire from "./fire";
import App from "./App";
import Background from "./assets/homePhoto.jpg";
import { Link } from "react-router-dom";

export default class Authentication extends Component {
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

  UNSAFE_componentWillMount() {
    console.log("componentWillMount");
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

  onLoggedIn() {
    return this.state.user ? <App /> : <Authentication />;
  }

  handleUserInput = e => {
    this.setState({
      [e.target.id]: e.target.value
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
        <div>
          <h1>Sign In</h1>
          <Row>
            <Col span={24}>
              <Input
                style={{ width: "70%" }}
                id="email"
                placeholder="Email"
                onChange={e => this.handleUserInput(e)}
              />
            </Col>
            <Col span={24}>
              <Input
                style={{ width: "70%" }}
                id="password"
                placeholder="Password"
                onChange={e => this.handleUserInput(e)}
              />
            </Col>
            {/* Button does nothing yet */}
            <Button type="primary">Login</Button>
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
