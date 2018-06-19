import React, { Component } from "react";
import { Card, Layout, Input, Button, Menu, Dropdown, Icon } from 'antd';
import fire from './fire.js'

export default class ContractEditor extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        contracts: [],
        data: [],
        users: []
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
        console.log(curUser.email)
        for (let user in userVals) {
            if(userVals[user].email == curUser.email)
                this.state.data.bidders.push[userVals[user].fullname]
        }
        }
    )};

    componentDidMount() {
        const contractsRef = fire.database().ref('contracts');
        contractsRef.on('value', (snapshot) => {
          let contractVals = snapshot.val();
          let contractKeys = Object.keys(snapshot.val());
          let newState = [];
          for (let info in contractVals) {
              let contract = {
                client: contractVals[info].client,
                description: contractVals[info].description,
                email: contractVals[info].email,
                numinterns: contractVals[info].numinterns,
                project: contractVals[info].project,
                skills: contractVals[info].skills,
                payRate: "",
                estHours: "",
                onDisabled: false,
                bidders: []
              };
              newState.push(contract);
          }
          this.setState({
            data: newState
          });
        });

        const usersRef = fire.database().ref('users');
        usersRef.on('value', (snapshot) => {
          let userVals = snapshot.val();
          console.log(snapshot.val())
          let newState2 = [];
          for (let user in userVals) {
              let userList = {
                fullname: userVals[user].fullname,
              };
              newState2.push(userList);
          }
          this.setState({
            users: newState2
          });
        });
    }

    render(){
        console.log(this.state.users.fullname)
        const menu = (
            <div>
            {this.state.users.map(x => 
            <Menu>
              <Menu.Item key="0">
                <a>{x.fullname}</a>
              </Menu.Item>
            </Menu>
        )}
            </div>
          );
        const { Header, Footer, Sider, Content } = Layout;
        return(
        <div style={{ background: '#ECECEC', padding: '10px' }}>
        {this.state.data.map(x=>
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
        </Card>
        )}
        </div>
        );
    }
}