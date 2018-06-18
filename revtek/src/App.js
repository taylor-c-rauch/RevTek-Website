import React, { Component } from 'react';
import Router from "./Route";
import './App.css';
import fire from "./fire";


class App extends Component {
  constructor() {
    super();
    this.state = { email: "", user: null, users: [], userID: "", userInfo: {}, status: "" };
    this.authListener();
  }
  authListener() {

    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user });
        this.setState({ email: user.email });
        const usersRef = fire.database().ref('users');
        let users1 = [];
        usersRef.on('value', (snapshot) => {
          console.log("2+2=4")
          users1 = snapshot.val();
          this.setState({ users: users1 }, () => { console.log(this.state.users); this.newfunc2(); });
        });
      } else {
        this.setState({ user: null });
      }
    });
  }

  newfunc2() {
    Object.keys(this.state.users).forEach((key) => {
      if (this.state.users[key].email === this.state.email) {
        let userID = key;
        this.setState({ userID: userID });
        this.setState({ userInfo: this.state.users[key] });
        this.setState({ status: this.state.users[key].status });
        console.log(this.state.users[key].status)
      }
    }
    );
  }

  updateField = (field, newVal) => {
    this.setState({ [field]: newVal });
  };


  render() {
    console.log(this.state);
    return (
      <div>
        <Router updateField={(field, newVal) => this.updateField(field, newVal)} email={this.state.email} user={this.state.user} users={this.state.users} userID={this.state.userID} userInfo={this.state.userInfo} status={this.state.status} />
      </div>
    );
  }
}

export default App;
