import React, { Component } from 'react';
import fire from './fire.js';
import TopBar from "./top-bar";

import { Form, Input, Icon } from 'antd';
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
        clicked: false,
        clientMessage: "",
        emailMessage: "",
        projectMessage: "",
        descriptionMessage: "",
        numinternsMessage: "",
        skillsMessage: "" 
      }
    }
  
    // updates each input's corresponding state
    handleChange=e => {
      this.setState({
        [e.target.name]: e.target.value,
        [e.target.name + "Message"]: ""
      });
    }
  
    // When the submit button is clicked, the user input gets put on firebase
    handleSubmit=e => {
      e.preventDefault();
      if(this.state.client.length == 0){
        this.setState({clientMessage: "please enter your client or company name"});
      }
      if(this.state.email.length == 0) {
        this.setState({emailMessage: "please enter your email"});
      }
      if(this.state.project.length == 0) {
        this.setState({projectMessage: "please enter your project name"});
      }
      if(this.state.description.length == 0) {
        this.setState({descriptionMessage: "please enter your project description"});
      }
      if(this.state.skills.length == 0) {
        this.setState({skillsMessage: "please enter the preferred skills"});
      }
      if(this.state.numinterns.length == 0) {
        this.setState({numinternsMessage: "please enter the number of interns needed"});
      }
      else{
        const contractname = this.state.project.split(' ').join('-')
        const contractsRef = fire.database().ref('contracts/' + contractname).set({
          client: this.state.client,
          email: this.state.email, 
          project: this.state.project, 
          description: this.state.description,
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
          clicked: true,
          clientMessage: "",
          emailMessage: "",
          projectMessage: "",
          descriptionMessage: "",
          numinternsMessage: "",
          skillsMessage: ""
        })}
    }

    render() {
      if (this.state.clicked === false) {
        return (
          <div className="contract">
            {/* renders a form where users can input their contract information */}
            <section className="add-contract">
            <Form className="login-form">
              <FormItem label= "Client Name" validateStatus="error"
              required={true} help={this.state.clientMessage}> 
                <Input name="client" placeholder="Client Name" onChange={this.handleChange} value={this.state.client} />
              </FormItem>
              <FormItem label = "Email" validateStatus="error"
              required={true} help={this.state.emailMessage}>
                <Input name="email" placeholder="Email" onChange={this.handleChange} value={this.state.email} />
              </FormItem>
              <FormItem label = "Project Name" validateStatus="error"
              required={true} help={this.state.projectMessage}>
                <Input name="project" placeholder="Project Name" onChange={this.handleChange} value={this.state.project} />
              </FormItem>
              <FormItem label = "Project Description" validateStatus="error"
              required={true} help={this.state.descriptionMessage}>
                <Input name="description" placeholder="Project Description" onChange={this.handleChange} value={this.state.description} />
              </FormItem>
              <FormItem label = "Interns Needed" validateStatus="error"
              required={true} help={this.state.numinternsMessage}>
                <Input name="numinterns" placeholder="Number of Interns Needed" onChange={this.handleChange} value={this.state.numinterns} />
              </FormItem>
              <FormItem label = "Skills Needed" validateStatus="error"
              required={true} help={this.state.skillsMessage}>
                <Input name="skills" placeholder="Preferred Intern Skills" onChange={this.handleChange} value={this.state.skills} />
              </FormItem>
              <button onClick={this.handleSubmit}>Submit Contract </button>
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