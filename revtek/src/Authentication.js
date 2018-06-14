import React, { Component } from 'react';
import { Input, Button } from 'antd';
import fire from './fire';
import App from './App';
import Background from './assets/homePhoto.jpg';

export default class Authentication extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      username: "",
      password: "",
      status: "",
      user: null
    }
  }

  UNSAFE_componentWillMount() {
    console.log("componentWillMount");
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user });
        this.props.updateField(user);
      } else {
        this.setState({ user: null });
        this.props.updateField(null);
      }
    });
  }

  onLoggedIn() {
    return this.state.user ? <App /> : <Authentication />;
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
  };

  logUser = user => {
    let ref = fire.database().ref("users");
    let obj = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      status: this.state.status

    };
    ref.push(obj);
  };

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
        <div>
          <Input id="email" placeholder="Email" onChange={e => this.handleUserInput(e)} />
          <Input id="username" placeholder="Username" onChange={e => this.handleUserInput(e)} />
          <Input id="password" placeholder="Password" onChange={e => this.handleUserInput(e)} />
          <Input id="status" placeholder="Status" onChange={e => this.handleUserInput(e)} />
          <Button type="primary" onClick={e => this.signup(e)}>Submit</Button>
        </div>
      </section>
    )
  }
}
