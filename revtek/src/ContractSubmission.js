import React, { Component } from 'react';
// import firebase from './firebase.js';

import { Form, Input, Card } from 'antd';
const FormItem = Form.Item;

export default class Contract extends Component {
  constructor() {
      super();
      this.state = {
        name: "",
        company: "", 
        details: "",
        items: [], 
      }
    }
  
    // updates each input's corresponding state
    handleChange=e => {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  
    // When the submit button is clicked, the user input gets put on firebase
    // handleSubmit=e => {
    //   e.preventDefault();
    //   const itemsRef = firebase.database().ref('items');
    //   const item = {
    //     name: this.state.name,
    //     company: this.state.company, 
    //     details: this.state.details,
    //   }
    //   itemsRef.push(item);
    //   this.setState({
    //     name: '', 
    //     company: '', 
    //     details: '',
    //   })
    // }
    
  // retrieves the contract information from firebase so it can be rendered on the screen
//    componentDidMount() {
//      const itemsRef = firebase.database().ref('items');
//      itemsRef.on('value', (snapshot) => {
//        let items = snapshot.val(); 
//        let newState = []; 
//        for (let item in items) {
//          newState.push({
//            id: item, 
//            name: items[item].name, 
//            company: items[item].company, 
//            details: items[item].details,
//          }); 
//        }
//        this.setState({
//          items: newState
//        });
//      });
//    }

  //  removes contracts 
//   removeItem(itemId) {
//     const itemRef = firebase.database().ref(`/items/${itemId}`);
//     itemRef.remove();
//   }

    render() {
      return (
          <div className="contract">
            {/* renders a form where users can input their contract information */}
            <section className="add-contract">
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                <Input name="name" placeholder="Client Name" onChange={this.handleChange} value={this.state.name}/>
              </FormItem>
              <br/>
              <FormItem>
                <Input name="email" placeholder="Email" onChange={this.handleChange} value={this.state.company}/>
              </FormItem>
              <br/>
              <FormItem>
                <Input name="description" placeholder="Project Description" onChange={this.handleChange} value={this.state.details}/>
              </FormItem>
              <br/>
              <FormItem>
                <Input name="interns" placeholder="Number of Interns Needed" onChange={this.handleChange} value={this.state.details}/>
              </FormItem>
              <br/>
              <FormItem>
                <Input name="skills" placeholder="Preferred Intern Skills" onChange={this.handleChange} value={this.state.details}/>
              </FormItem>
              <button>Submit Contract </button>
            </Form>
            </section>

            {/* displays what the users' entered */}
            <section className="display-contract">
              <div className="wrapper">
                {this.state.items.map((item) => {
                    return ( 
                        <Card className="card" style={{ height: 150, width: 350 }}>
                          <p>Name: {item.name}</p>
                          <p>Company: {item.company}</p>
                          <p>Company Details: {item.details}</p>
                          <button onClick={() => this.removeItem(item.id)}>Remove Contract</button>
                        </Card>
                    )
                  })}
              </div>
            </section>
          </div>
      );
    }
}
