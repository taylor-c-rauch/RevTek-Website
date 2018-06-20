import React, { Component } from "react";
import Background from "./assets/homePhoto.jpg";
import {
  Select,
  Input,
  Button,
  Row,
  Col,
  Menu,
  notification,
  Icon,
  message
} from "antd";
import fire from "./fire";
import TopBar from "./top-bar";
import "./SignUp.css";
import { Link, Redirect } from "react-router-dom";

const Option = Select.Option;

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
      dailyChallenges: [],
      switch: false,
      todo: [],
      skills: [],
      contracts: [],
      numContracts: 0,
      approved: false,
      profilepic:
        "http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
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
        fire
          .auth()
          .signOut()
          .catch(error => {
            console.log(error);
          });
        this.setState({
          switch: true,
          clicked: true,
          email: "",
          username: "",
          fullname: "",
          password: "",
          status: "",
          approved: false,
          contracts: [],
          numContracts: 0,
        });
      })
      .catch(error => {
        console.log(error);
        notification.error({
          message: "Error",
          description: error.toString().substring(7)
        });
      });
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
      dailyChallenges: this.state.dailyChallenges,
      todo: this.state.todo,
      skills: this.state.skills,
      profilepic: this.state.profilepic,
      approved: this.state.approved,
      contracts: this.state.contracts,
      numContracts: this.state.numContracts,
    })
  };

  // updates each input's corresponding state
  handleUserInput = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSelect(value) {
    this.setState({ status: value });
  }

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
                  value={this.state.email}
                />
              </Col>
              <br />
              <Col>
                <Input
                  style={{ width: "60%" }}
                  id="username"
                  placeholder="Username"
                  onChange={e => this.handleUserInput(e)}
                  value={this.state.username}
                />
              </Col>
              <br />
              <Col>
                <Input
                  style={{ width: "60%" }}
                  id="fullname"
                  placeholder="Full Name"
                  onChange={e => this.handleUserInput(e)}
                  value={this.state.fullname}
                />
              </Col>
              <br />
              <Col>
                <Input
                  style={{ width: "60%" }}
                  id="password"
                  placeholder="Password"
                  onChange={e => this.handleUserInput(e)}
                  value={this.state.password}
                  type="password"
                />
              </Col>
              <br />
              <Col>
                <Select
                  placeholder="Status"
                  style={{ width: "60%" }}
                  onChange={value => this.handleSelect(value)}
                >
                  <Option value="intern">Intern</Option>
                  <Option value="alumni">Alumni</Option>
                  <Option value="administrator">Administrator</Option>
                </Select>
              </Col>
              <br />
              <br />
              <Link to="/signup-message">
                <Button
                  className="SubmitButton"
                  type="primary"
                  //submit button does nothing yet
                  onClick={e => this.signup(e)}
                >
                  Submit
                </Button>
              </Link>
              {console.log(this.state.switch)}
              {this.state.switch ? <Redirect to="/signup-message" /> : null}
            </Row>
          </div>
        </section>
      </div>
    );
  }
}
