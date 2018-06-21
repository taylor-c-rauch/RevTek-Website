import React, { Component } from "react";
import { Card, Layout, Input, Button } from 'antd';
import fire from './fire.js';
import ContractTile from "./ContractTile";

export default class BiddingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contracts: [],
      data: []
    };
  }

  componentDidUpdate(prevProps) {

    if (this.props.userID !== prevProps.userID) {
      const contractsRef = fire.database().ref('contracts');
      let contractVals = [];
      let contractKeys = [];
      contractsRef.on('value', (snapshot) => {
        contractVals = snapshot.val();
        contractKeys = Object.keys(snapshot.val());
      });

      let newState = [];
      for (let info in contractVals) {
        let contract = {
          client: contractVals[info].client,
          description: contractVals[info].description,
          email: contractVals[info].email,
          numinterns: contractVals[info].numinterns,
          project: contractVals[info].project,
          skills: contractVals[info].skills,
          onDisabled: false,
          contractApproved: contractVals[info].contractApproved
        };
        newState.push(contract);

      }

      this.setState({ data: newState });

    }
  }

  componentDidMount() {

    const contractsRef = fire.database().ref('contracts');
    let contractVals = [];
    let contractKeys = [];
    contractsRef.on('value', (snapshot) => {
      contractVals = snapshot.val();
      contractKeys = Object.keys(snapshot.val());
    });

    let newState = [];
    for (let info in contractVals) {
      let contract = {
        client: contractVals[info].client,
        description: contractVals[info].description,
        email: contractVals[info].email,
        numinterns: contractVals[info].numinterns,
        project: contractVals[info].project,
        skills: contractVals[info].skills,
        onDisabled: false,
        contractApproved: contractVals[info].contractApproved
      };
      newState.push(contract);

    }

    this.setState({ data: newState });
  }

  render() {

    const { Header, Footer, Sider, Content } = Layout;
    return (
      <div style={{ background: '#ECECEC' }}>
        {this.state.data.map((x) => {
          if (x.contractApproved === true) {
            return (
              <div>
                <ContractTile userID={this.props.userID} person={this.props.person} email={x.email} numinterns={x.numinterns} client={x.client} project={x.project} skills={x.skills} description={x.description} />
              </div>
            )
          }
        })}
      </div>)
  }

}
