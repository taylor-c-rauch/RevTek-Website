import React, { Component } from "react";
import { Card, Layout, Input, Button } from 'antd';
import fire from './fire.js'

export default class ContractTile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payRate: "",
            estHours: "",
            disable: true,
            id: this.props.project.replace(" ", "-")
        };
    }
    handleUserInput(e) {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(e.target.name, e.target.value);
        if (this.state.payRate.length > 0 && this.state.estHours.length > -1) {
            this.state.disable = false;
        }
    };

    handleClick(e) {
        e.preventDefault();
        let bid = {
            userID: this.props.userID,
            status: this.props.person.status,
            fullname: this.props.person.fullname,
            email: this.props.person.email,
            person: this.props.person,
            payRate: this.state.payRate,
            estHours: this.state.estHours
        }
        const contractRef = fire.database().ref('contracts/' + this.state.id + '/bids/');
        contractRef.push(bid);
        this.setState({ payRate: "", estHours: "", disable: true });
    }

    render() {

        return (
            <div>
                <Card title={this.props.client} style={{ marginLeft: 30, marginRight: 30, marginTop: 20, marginBottom: 20 }}>
                    <p><strong>Project Name: {this.props.project}</strong></p>
                    <p>Description: {this.props.description}</p>
                    <p>Email: {this.props.email}</p>
                    <p>Number of Interns: {this.props.numinterns}</p>
                    <p>Skills: {this.props.skills}</p>
                    <Input value={this.state.payRate} placeholder="Pay Rate" name="payRate" onChange={(e) => this.handleUserInput(e)} />
                    <Input value={this.state.estHours} placeholder="Estimated Hours" name="estHours" onChange={(e) => this.handleUserInput(e)} />
                    <Button disabled={this.state.disable} type="primary" onClick={(e) => this.handleClick(e)}>Submit Bid</Button>
                </Card>
            </div>);
    }

}