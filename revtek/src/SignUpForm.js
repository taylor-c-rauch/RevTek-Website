import React, { Component } from "react";
import Background from "./assets/homePhoto.jpg";
import { Input, Button, Row, Col, Menu, Dropdown, Icon, message } from "antd";
import fire from "./fire";
import TopBar from "./top-bar";
import "./SignUp.css";

const menu = (
  <Menu>
    <Menu.Item key="1">Intern</Menu.Item>
    <Menu.Item key="2">Alumni</Menu.Item>
    <Menu.Item key="3">Administrator</Menu.Item>
  </Menu>
);

export default class SignUpForm extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      username: "",
      fullname: "",
      password: "",
      status: "",
      user: {},
      clicked: false,
      dailyChallenges: []
    };
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

    const uid = fire.auth().currentUser.uid

    const usernameRef = fire.database().ref("users/" + uid).set({
      email: this.state.email,
      username: this.state.username,
      fullname: this.state.fullname,
      password: this.state.password,
      status: this.state.status,
      dailyChallenges: this.state.dailyChallenges
    })

  };



  // updates each input's corresponding state
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
          height: 600,
          width: "100%",
          backgroundSize: "cover",
          overflow: "hidden"
        }}
      >
        <TopBar status="home" />
        <div class="HeaderFiller" />
        <div class="LoginBackground">
          <Row>
            <h1 class="RobotoTitle">Sign Up</h1>
            <Col>
              <Input
                style={{ width: "60%" }}
                id="email"
                placeholder="Email"
                onChange={e => this.handleUserInput(e)}
              />
            </Col>
            <Col>
              <Input
                style={{ width: "60%" }}
                id="username"
                placeholder="Username"
                onChange={e => this.handleUserInput(e)}
              />
            </Col>
            <Col>
              <Input
                style={{ width: "60%" }}
                id="fullname"
                placeholder="Fullname"
                onChange={e => this.handleUserInput(e)}
              />
            </Col>
            <Col>
              <Input
                style={{ width: "60%" }}
                id="password"
                placeholder="Password"
                onChange={e => this.handleUserInput(e)}
              />
            </Col>
            <Col>
              <div>
                <Dropdown overlay={menu}>
                  <Button
                    span={24}
                    offset={4}
                    style={{ marginLeft: 8 }}
                    style={{ width: "60%" }}
                  >
                    Status <Icon type="down" />
                  </Button>
                </Dropdown>
              </div>
            </Col>
            <Button
              className="SubmitButton"
              type="primary"
              //submit button does nothing yet
              /* onClick={e => this.signup(e)} */
            >
              Submit
            </Button>
          </Row>
        </div>
      </section>
    );
  }
}
