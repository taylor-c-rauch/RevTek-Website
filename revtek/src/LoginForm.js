import React, { Component } from "react";
import { Input, Button, Row, Col, notification } from "antd";
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
        notification.error({
          message: "Error",
          description: error.toString().substring(7)
        });
      });
  };

  render() {
    return (
      <div class="backdrop">
        <section>
          <TopBar
            updateField={this.props.updateField}
            status="home"
            person={this.props.person}
            user={this.props.user}
          />
          <div className="HeaderFiller" />
          <div className="LoginBackground">
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
              <br />
              <Col>
                <Input
                  style={{ width: "70%" }}
                  id="password"
                  placeholder="Password"
                  type="password"
                  onChange={e => this.handleUserInput(e)}
                />
              </Col>
              <br />
              <Button type="primary" onClick={e => this.login(e)}>
                Login
              </Button>
              <br />
              <br />

              <div>Don't have an account?</div>
              <Link to="/sign-up">Sign Up</Link>
            </Row>
          </div>
        </section>
      </div>
    );
  }
}
