import React, { Component } from "react";
import { Card, Layout, Input, Button } from 'antd';

export default class BiddingPage extends React.Component {
    constructor(props) {
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
        );
    }
}