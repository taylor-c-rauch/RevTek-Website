import React, { Component } from "react";
import { Card, Layout, Input, Button, Menu, Dropdown, Icon, Select, message } from 'antd';
import fire from './fire.js'

export default class ContractEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contracts: [],
      data: [],
      users: [],
      numContracts: 0,
      peep: ""
    };
  }

  handleUserInput = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
    if (this.state.data[0].payRate.length == 0 || this.data[0].estHours.length == 0) {
      this.state.data.onDisabled = false
    }
    else if (this.data[0].payRate.length != 0 && this.data[0].estHours.length != 0) {
      this.state.data.onDisabled = true
    }
  };

  handleClick = e => {
    const usersRef = fire.database().ref('users');
    usersRef.on('value', (snapshot) => {
      let userVals = snapshot.val();
      var curUser = fire.auth().currentUser;
      for (let user in userVals) {
        if (userVals[user].email == curUser.email)
          this.state.data.bidders.push[userVals[user].fullname]
      }
    }
    )
  };

  handleApproved = (xID) => {
    let contractRef = fire.database().ref(`/contracts/${xID}`);
    contractRef.update({
      contractApproved: true
    })
  }

  removeItem(ref1) {
    const contractsRef = fire.database().ref(ref1);
    contractsRef.remove();
  }

  handleSelect(value) {
    this.setState({ peep: value });
  }

  assignClick = (id, project, client, email, description) => {
    console.log(project, client, email, description);
    let phrase = `CONTRACT: ${project}, ${client}, ${email}, ${description}`
    const todoRef = fire.database().ref('users/' + this.state.peep + '/todo/').push({
      task: phrase,
      hours: "",
      completed: false
    });
    const userRef = fire.database().ref('users/' + this.state.peep);
    let user1 = {};
    let num = 0;
    userRef.on('value', (snapshot) => {
      user1 = snapshot.val();
      num = user1.numContracts + 1;
    });
    userRef.update({ numContracts: num });
    this.removeItem("/contracts/" + id);
  }

  componentDidMount() {
    const contractsRef = fire.database().ref('contracts');
    contractsRef.on('value', (snapshot) => {
      let contractVals = snapshot.val();
      let newState = [];
      for (let info in contractVals) {
        let contract = contractVals[info].project;
        const bidRef = fire.database().ref('contracts/' + contract.split(" ").join("-") + "/bids/");
        let bidState = [];
        bidRef.on('value', (snapshot) => {
          let bidList = snapshot.val();
          for (let bid in bidList) {
            bidState.push({
              userID: bidList[bid].userID,
              fullname: bidList[bid].fullname,
              payRate: bidList[bid].payRate,
              estHours: bidList[bid].estHours,
            });
          }
        });
        console.log(bidState);
        newState.push({
          id: contract.split(" ").join("-"),
          client: contractVals[info].client,
          description: contractVals[info].description,
          email: contractVals[info].email,
          numinterns: contractVals[info].numinterns,
          project: contractVals[info].project,
          skills: contractVals[info].skills,
          payRate: "",
          estHours: "",
          onDisabled: false,
          bids: bidState,
          contractApproved: contractVals[info].contractApproved
        });
      }
      this.setState({
        data: newState
      });
    });

    const usersRef = fire.database().ref('users');
    usersRef.on('value', (snapshot) => {
      let userVals = snapshot.val();
      let newState2 = [];
      for (let user in userVals) {
        let userList = {
          id: user,
          fullname: userVals[user].fullname,
          numContracts: userVals[user].numContracts,
        };
        this.setState({
          numContracts: userVals[user].numContracts,
        })
        newState2.push(userList);
      }
      this.setState({
        users: newState2
      });
    });
  }

  render() {
    const Option = Select.Option;

    const onClick = function ({ key }) {
      message.info(`Assigned ${key}`);
    };

    const { Header, Footer, Sider, Content } = Layout;
    return (
      <div style={{ background: '#ECECEC', padding: '10px' }}>
        <h1> Contracts to Approve </h1>
        {this.state.data.map((x) => {
          if (x.contractApproved == false) {
            return (
              <Card title={x.client} style={{ width: 1027 }}>
                <p><strong>{x.project}</strong></p>
                <p>{x.description}</p>
                <p>{x.email}</p>
                <p>{x.numinterns}</p>
                <p>{x.skills}</p>
                <p>{x.bidders}</p>
                <Button onClick={() => this.handleApproved(x.id)}> Approve Contract </Button>
                <Button onClick={() => this.removeItem(x.id)}> Remove </Button>
              </Card>
            );
          }
        })}
        <h2> Approved Contracts </h2>
        {this.state.data.map((x) => {
          if (x.contractApproved == true) {
            let project = x.project;
            let client = x.client;
            let email = x.email;
            let description = x.description;
            console.log(project, client, email, description);
            return (
              <Card key={x.project.split(" ").join("-")} title={x.client} style={{ width: 1027 }}>
                <p><strong>{x.project}</strong></p>
                <p>{x.description}</p>
                <p>{x.email}</p>
                <p>{x.numinterns}</p>
                <p>{x.skills}</p>
                <p>{x.bidders}</p>
                {x.bids.length > 0 ? <Select placeholder="Assign Bidder" style={{ width: 300 }} onChange={(value, project, client, email, description) => this.handleSelect(value, project, client, email, description)}>
                  {x.bids.map((bid) => {

                    return (
                      <Option value={bid.userID}>{bid.fullname}, Pay: {bid.payRate}, Hours: {bid.estHours}</Option>
                    );
                  })}
                </Select> : <Select placeholder="No Submitted Bids" style={{ width: 300 }}>

                  </Select>}
                <Button onClick={() => this.assignClick(x.project.split(" ").join("-"), project, client, email, description)}> Submit </Button>
                <Button onClick={() => this.removeItem(`/contracts/${x.project.split(" ").join("-")}`)}> Remove </Button>
              </Card>
            );
          }
        })}
      </div>
    );
  }
}