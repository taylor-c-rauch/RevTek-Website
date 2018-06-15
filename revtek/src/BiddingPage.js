import React, { Component } from "react";
import { Card, Layout, Input, Button } from 'antd';
import fire from './fire.js'

export default class BiddingPage extends React.Component {
    constructor(props) {
<<<<<<< HEAD
      super(props);
      this.state = {
        contracts: [],
        data: []
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
                onDisabled: false
              };
              newState.push(contract);
          }
          this.setState({
            data: newState
          });
        });
    }

    render(){
        console.log(this.state.data.onDisabled)
        const { Header, Footer, Sider, Content } = Layout;
        return(
        <div style={{ background: '#ECECEC', padding: '10px' }}>
        {this.state.data.map(x=>
        <Card title={x.client} style={{ width: 1027 }}>
        <p><strong>{x.project}</strong></p>
        <p>{x.description}</p>
        <p>{x.email}</p>
        <p>{x.numinterns}</p>
        <p>{x.skills}</p>
        <Input placeholder="Pay Rate" id="payRate" onChange={e => this.handleUserInput(e)} />
        <Input placeholder="Estimated Hours" id="estHours" onChange={e => this.handleUserInput(e)} />
        <Button type="primary" disabled={!this.state.onDisabled}>Submit Bid</Button>
        </Card>
        )}
        </div>
=======
        super(props);
        this.state = {
            cards: [], //title, descrip, skills 
            payRate: "",
            estHours: "",
            onDisabled: false
        };
        //   this.handleUserInput = this.handleUserInput(this)
        //   this.onDisable = this.onDisable.bind(this);
    }

    // onDisable = () => {
    //     if (
    //       this.state.payRate.length < 5 &&
    //       this.state.estHours.length < 5
    //     ) {
    //       this.setState({
    //         onDisabled: true
    //       });
    //     } else {
    //       this.setState({
    //         onDisabled: false
    //       });
    //     }
    //   };

    handleUserInput = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
        if (this.state.payRate.length == 0 || this.state.estHours.length == 0) {
            this.setState({
                onDisabled: false
            });
        }
        else if (this.state.payRate.length != 0 && this.state.estHours.length != 0) {
            this.setState({
                onDisabled: true
            })
        }



    };

    render() {
        const { Header, Footer, Sider, Content } = Layout;
        return (
            <div style={{ background: '#ECECEC', padding: '10px' }}>
                <Layout>

                    <Content>
                        <Card title="LIZERD SKUAD" extra={<a href="#">Edit</a>} style={{ width: 1027 }}>
                            <p>Hello we are Lizerd Skuad</p>
                            <p>Lizerd Skuad</p>
                            <p>Lizerd Skuad</p>
                            <Input placeholder="Pay Rate" id="payRate" onChange={e => this.handleUserInput(e)} />
                            <Input placeholder="Estimated Hours" id="estHours" onChange={e => this.handleUserInput(e)} />
                            <Button type="primary" disabled={!this.state.onDisabled}>Submit Bid</Button>
                        </Card>

                        <Card title="LIZERD SKUAD" extra={<a href="#">Edit</a>} style={{ width: 1027 }}>
                            <p>Lizerd Skuad</p>
                            <p>Lizerd Skuad</p>
                            <p>Lizerd Skuad</p>
                        </Card>

                        <Card title="LIZERD SKUAD" extra={<a href="#">Edit</a>} style={{ width: 1027 }}>
                            <p>Lizerd Skuad</p>
                            <p>Lizerd Skuad</p>
                            <p>Lizerd Skuad</p>
                        </Card>
                    </Content>
                </Layout>
            </div>
>>>>>>> develop
        );
    }
}