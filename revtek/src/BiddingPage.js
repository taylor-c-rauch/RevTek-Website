import React, { Component } from "react";
import { Card, Layout, Input, Button } from "antd";
import fire from "./fire.js";
import ContractTile from "./ContractTile";

export default class BiddingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contracts: [],
      data: []
    };
  }

  handleUserInput = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
    if (
      this.state.data[0].payRate.length == 0 ||
      this.data[0].estHours.length == 0
    ) {
      this.state.data.onDisabled = false;
    } else if (
      this.data[0].payRate.length != 0 &&
      this.data[0].estHours.length != 0
    ) {
      this.state.data.onDisabled = true;
    }
  };

  componentDidMount() {
    const contractsRef = fire.database().ref("contracts");
    let contractVals = [];
    let contractKeys = [];
    contractsRef.on("value", snapshot => {
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
      <div style={{ background: "#ECECEC" }}>
        {this.state.data.map(x => {
          if (x.contractApproved === true) {
            return (
              <div>
                <Card
                  title={x.client}
                  style={{
                    marginLeft: 30,
                    marginRight: 30,
                    marginTop: 20,
                    marginBottom: 20
                  }}
                >
                  <p>
                    <strong>Project Name: {x.project}</strong>
                  </p>
                  <p>Description: {x.description}</p>
                  <p>Email: {x.email}</p>
                  <p>Number of Interns: {x.numinterns}</p>
                  <p>Skills: {x.skills}</p>
                  <Input
                    placeholder="Pay Rate"
                    id="payRate"
                    onChange={e => this.handleUserInput(e)}
                  />
                  <Input
                    placeholder="Estimated Hours"
                    id="estHours"
                    onChange={e => this.handleUserInput(e)}
                  />
                  <Button type="primary">Submit Bid</Button>
                </Card>
              </div>
            );
          }
        })}
      </div>
    );
  }
}
