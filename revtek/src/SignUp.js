import React, { Component } from "react";
import Background from "./assets/homePhoto.jpg";
import { Input, Button, Row, Col, Menu, Dropdown, Icon, message } from "antd";
import fire from "./fire";

// const onClick = function({ key }) {
//   message.info(`Click on item ${key}`);
// };

function handleButtonClick(e) {
  message.error("Click on left button.");
  console.log("click left button", e);
}
function handleMenuClick(e) {
  message.error("You forgot to fill out SOMETHING");
  console.log("click", e);
}

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">Intern</Menu.Item>
    <Menu.Item key="2">Alumni</Menu.Item>
    <Menu.Item key="3">Administrator</Menu.Item>
  </Menu>
);

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      username: "",
      fullname: "",
      password: "",
      status: "",
      user: null,
      clicked: false
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
    const username = this.state.username;
    const usernameRef = fire
      .database()
      .ref("users/" + username)
      .set({
        email: this.state.email,
        username: this.state.username,
        fullname: this.state.fullname,
        password: this.state.password,
        status: this.state.status
      });
  };

  // updates each input's corresponding state
  handleUserInput = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    if (this.state.clicked === false) {
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
            <h1>Sign Up</h1>
            <Row>
              <Col span={24} offset={4}>
                <Input
                  style={{ width: "70%" }}
                  id="email"
                  placeholder="Email"
                  onChange={e => this.handleUserInput(e)}
                />
              </Col>
              <Col span={24} offset={4}>
                <Input
                  style={{ width: "70%" }}
                  id="username"
                  placeholder="Username"
                  onChange={e => this.handleUserInput(e)}
                />
              </Col>
              <Col span={24} offset={4}>
                <Input
                  style={{ width: "70%" }}
                  id="fullname"
                  placeholder="Fullname"
                  onChange={e => this.handleUserInput(e)}
                />
              </Col>
              <Col span={24} offset={4}>
                <Input
                  style={{ width: "70%" }}
                  id="password"
                  placeholder="Password"
                  onChange={e => this.handleUserInput(e)}
                />
              </Col>
              <Col span={24} offset={4}>
                <div>
                  <Dropdown overlay={menu}>
                    <Button
                      span={24}
                      offset={4}
                      style={{ marginLeft: 8 }}
                      style={{ width: "70%" }}
                    >
                      Status <Icon type="down" />
                    </Button>
                  </Dropdown>
                </div>
              </Col>
              <Button
                span={24}
                offset={4}
                type="primary"
                onClick={e => this.signup(e)}
              >
                Submit
              </Button>
            </Row>
          </div>
        </section>
      );
    } else {
      return (
        <div style={{ background: "#ECECEC", padding: "30px" }}>
          <h1>Thank you for signing up!</h1>
          <h3>
            {" "}
            Registration requires instructor approval. You will receive an email
            soon regarding your account status
          </h3>
        </div>
      );
    }
  }
}

//ReactDOM.render(
//stuff
//, mountNode);
