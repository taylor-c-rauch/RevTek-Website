import React, { Component } from 'react';
import fire from './fire.js';

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
        interns: "",
        skills: "",
      }
    }
  
    // updates each input's corresponding state
    handleChange=e => {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  
    // When the submit button is clicked, the user input gets put on firebase
    handleSubmit=e => {
      e.preventDefault();
      const contractname = this.state.project.split(' ').join('-')
      const contractsRef = fire.database().ref('contracts/' + contractname).set({
        client: this.state.client,
        email: this.state.email, 
        project: this.state.project, 
        desciption: this.state.description,
        interns: this.state.interns, 
        skills: this.state.skills        
      });
      this.setState({
        client: '', 
        email: '', 
        project: '', 
        description: '',
        interns: '', 
        skills: '',
      })
    }

    render() {
      return (
          <div className="contract">
            {/* renders a form where users can input their contract information */}
            <section className="add-contract">
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                <Input name="client" placeholder="Client Name" onChange={this.handleChange} value={this.state.client}/>
              </FormItem>
              <br/>
              <FormItem>
                <Input name="email" placeholder="Email" onChange={this.handleChange} value={this.state.email}/>
              </FormItem>
              <br/>
              <FormItem>
                <Input name="project" placeholder="Project Name" onChange={this.handleChange} value={this.state.project}/>
              </FormItem>
              <br/>
              <FormItem>
                <Input name="description" placeholder="Project Description" onChange={this.handleChange} value={this.state.description}/>
              </FormItem>
              <br/>
              <FormItem>
                <Input name="interns" placeholder="Number of Interns Needed" onChange={this.handleChange} value={this.state.interns}/>
              </FormItem>
              <br/>
              <FormItem>
                <Input name="skills" placeholder="Preferred Intern Skills" onChange={this.handleChange} value={this.state.skills}/>
              </FormItem>
              <button>Submit Contract </button>
            </Form>
            </section>
          </div>
      );
    }
}
