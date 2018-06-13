import React, { Component } from 'react';
import fire from './fire.js';
import TopBar from "./top-bar";

import { Form, Input, Card } from 'antd';
const FormItem = Form.Item;

export default class ContractSubmission extends Component {
  constructor() {
    super();
    this.state = {
      client: "",
      email: "",
      project: "",
      description: "",
      numinterns: "",
      skills: [],
      clicked: false
    }
  }

  // updates each input's corresponding state
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // When the submit button is clicked, the user input gets put on firebase
  handleSubmit = e => {
    e.preventDefault();
    const contractname = this.state.project.split(' ').join('-')
    const contractsRef = fire.database().ref('contracts/' + contractname).set({
      client: this.state.client,
      email: this.state.email,
      project: this.state.project,
      desciption: this.state.description,
      numinterns: this.state.numinterns,
      skills: this.state.skills
    });
    this.setState({
      client: '',
      email: '',
      project: '',
      description: '',
      numinterns: '',
      skills: [],
      clicked: true
    })
  }

  render() {
    if (this.state.clicked === false) {
      return (
        <div className="contract">
          <TopBar status="home" />
          {/* renders a form where users can input their contract information */}
          <section className="add-contract">
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                <Input name="client" placeholder="Client Name" onChange={this.handleChange} value={this.state.client} />
              </FormItem>
              <br />
              <FormItem>
                <Input name="email" placeholder="Email" onChange={this.handleChange} value={this.state.email} />
              </FormItem>
              <br />
              <FormItem>
                <Input name="project" placeholder="Project Name" onChange={this.handleChange} value={this.state.project} />
              </FormItem>
              <br />
              <FormItem>
                <Input name="description" placeholder="Project Description" onChange={this.handleChange} value={this.state.description} />
              </FormItem>
              <br />
              <FormItem>
                <Input name="numinterns" placeholder="Number of Interns Needed" onChange={this.handleChange} value={this.state.numinterns} />
              </FormItem>
              <br />
              <FormItem>
                <Input name="skills" placeholder="Preferred Intern Skills" onChange={this.handleChange} value={this.state.skills} />
              </FormItem>
              <button>Submit Contract </button>
            </Form>
          </section>
        </div >
      );
    }
    else {
      return (
        <div style={{ background: '#ECECEC', padding: '30px' }}>
          <h1>Thank you for submitting a contract!</h1>
          <h3> We will get back to you as soon as possible </h3>
        </div>
      )
    }
  }

}
