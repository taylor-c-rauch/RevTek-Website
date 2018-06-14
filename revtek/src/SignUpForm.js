import React, { Component } from 'react';
import Background from './assets/homePhoto.jpg';
import { Input, Button, Row, Col } from 'antd';
import fire from './fire';
import TopBar from "./top-bar";

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

    const uid = fire.auth().currentUser.uid

    const usernameRef = fire.database().ref("users/" + uid).set({
      email: this.state.email,
      username: this.state.username,
      fullname: this.state.fullname,
      password: this.state.password,
      status: this.state.status
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
      <section style={{
        backgroundImage: `url(${Background})`,
        height: 800,
        width: '100%',
        backgroundSize: 'cover',
        overflow: 'hidden'
      }}>
        <TopBar status="home" />
        <div>
          <h1>Sign Up</h1>
          <Row>
            <Col span={24}>
              <Input style={{ width: '50%' }} id="email" placeholder="Email" onChange={e => this.handleUserInput(e)} />
            </Col>
            <Col span={24}>
              <Input style={{ width: '50%' }} id="username" placeholder="Username" onChange={e => this.handleUserInput(e)} />
            </Col>
            <Col span={24}>
              <Input style={{ width: '50%' }} id="fullname" placeholder="Fullname" onChange={e => this.handleUserInput(e)} />
            </Col>
            <Col span={24}>
              <Input style={{ width: '50%' }} id="password" placeholder="Password" onChange={e => this.handleUserInput(e)} />
            </Col>
            <Col span={24}>
              <Input style={{ width: '50%' }} id="status" placeholder="Status" onChange={e => this.handleUserInput(e)} />
            </Col>
            <Button type="primary" onClick={e => this.signup(e)}>Submit</Button>
          </Row>
        </div>
      </section>
    )
  }
}
