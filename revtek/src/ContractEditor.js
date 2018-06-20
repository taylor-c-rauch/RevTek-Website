import React, { Component } from "react";
import { Card, Layout, Input, Button, Menu, Dropdown, Icon } from 'antd';
import fire from './fire.js'

export default class ContractEditor extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        contracts: [],
        data: [],
        users: [],
        numContracts: 0
      };
    }

      handleUserInput = e => {
        this.setState({
          [e.target.id]: e.target.value
        })
        if (this.state.data[0].payRate.length == 0 || this.data[0].estHours.length == 0) {
                this.state.data.onDisabled = false
        } 
        else if (this.data[0].payRate.length != 0 && this.data[0].estHours.length != 0 ) {
                this.state.data.onDisabled = true
        }
      };

      handleClick = e => {
        const usersRef = fire.database().ref('users');
        usersRef.on('value', (snapshot) => {
        let userVals = snapshot.val();
        var curUser = fire.auth().currentUser;
        for (let user in userVals) {
            if(userVals[user].email == curUser.email)
                this.state.data.bidders.push[userVals[user].fullname]
        }
        }
    )};

    handleApproved = (xID) => {
      let contractRef = fire.database().ref(`/contracts/${xID}`); 
      contractRef.update({
        contractApproved: true
      })
    }

    removeItem(contractID) {
      const contractsRef = fire.database().ref(`/contracts/${contractID}`);
      contractsRef.remove();
    }


    assignClick = (userID) => {
      const usersRef = fire.database().ref(`/users/${userID}`);
      this.setState({
        numContracts: this.state.numContracts + 1
      })
      usersRef.update({
        contracts: [],
        todo: [],
        numContracts: this.state.numContracts
      })
    }

    componentDidMount() {
        const contractsRef = fire.database().ref('contracts');
        contractsRef.on('value', (snapshot) => {
          let contractVals = snapshot.val();
          let newState = [];
          for (let info in contractVals) {
            let contract = contractVals[info].project
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
                bidders: [],
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

    render(){
        const menu = (
            <div>
            {this.state.users.map(user => 
            <Menu>
              <Menu.Item key="0">
                <a onClick={() => this.assignClick(user.id)}>{user.fullname}</a>
              </Menu.Item>
            </Menu>
        )}
            </div>
          );
        const { Header, Footer, Sider, Content } = Layout;
        return(
        <div style={{ background: '#ECECEC', padding: '10px' }}>
        <h1> Contracts to Approve </h1> 
        {this.state.data.map((x)=> {
          if (x.contractApproved == false) {
            return (
            <Card title={x.client} extra={<a href="#">Remove</a>} style={{ width: 1027 }}>
            <p><strong>{x.project}</strong></p>
            <p>{x.description}</p>
            <p>{x.email}</p>
            <p>{x.numinterns}</p>
            <p>{x.skills}</p>
            <p>{x.bidders}</p>
            <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" href="#">
            Options <Icon type="down" />
            </a>
            </Dropdown>
            <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" href="#">
            Assign <Icon type="down" />
            </a>
            </Dropdown>
            <Button onClick={() => this.handleApproved(x.id)}> Approve Contract </Button>
            <Button onClick={() => this.removeItem(x.id)}> Remove </Button>
          </Card>
          );
          }
        })}
        <h2> Approved Contracts </h2> 
        {this.state.data.map((x)=> {
          if (x.contractApproved == true) {
            return (
            <Card title={x.client} extra={<a href="#">Remove</a>} style={{ width: 1027 }}>
            <p><strong>{x.project}</strong></p>
            <p>{x.description}</p>
            <p>{x.email}</p>
            <p>{x.numinterns}</p>
            <p>{x.skills}</p>
            <p>{x.bidders}</p>
            <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" href="#">
            Options <Icon type="down" />
            </a>
            </Dropdown>
            <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" href="#">
            Assign <Icon type="down" />
            </a>
            </Dropdown>
            <Button onClick={() => this.removeItem(`/contracts/${x.id}`)}> Remove </Button>
          </Card>
          );
          }
        })}
        </div>
        );
    }
}