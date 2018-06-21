import React, { Component } from 'react';
import { Layout, Form, Input, Icon, Button, Card, Row, Col, Alert } from 'antd';
import './DailyChallenge.css'
import TopBar from "./top-bar";
import fire from './fire.js';
const Header = Layout.Header;
const Content = Layout.Content;
const FormItem = Form.Item;

export default class DailyChallenge extends Component{

	constructor(props){
		super(props);
		this.state = ({
			challengeName: "",
			dueDate: "",
			challengeDescription: "",
			gitHubLink: "None",
			submitted: false
		})
	}

	componentDidMount(){
		const challengesRef = fire.database().ref('challenges');
		challengesRef.on('value', (snapshot) => {
			let currTime = new Date().getTime()
        	let endTime = currTime + 87400000;
            let challengesSnapshot = snapshot.val();
            let challengesArray = []
            console.log(challengesSnapshot)
            console.log(currTime)
            console.log(endTime)

           	for (let challenge in challengesSnapshot){
           		if (challengesSnapshot[challenge].seconds <= endTime && challengesSnapshot[challenge].seconds >= currTime)
	            	this.setState({
	            		challengeName: challengesSnapshot[challenge].name,
	            		dueDate: challengesSnapshot[challenge].duedate,
	            		challengeDescription: challengesSnapshot[challenge].description
	            	})
            }

            this.setState({
            	challenges: challengesArray
            })
        })
	}

	handleChange = (e) => {
		e.preventDefault();
    	this.setState({
      		gitHubLink: e.target.value
    	});
	}

	handleSubmit = (e) => {
		e.preventDefault();

		const challengesRef = fire.database().ref('challenges/' + this.state.challengeName + '/submissions');
		challengesRef.child(this.props.person.fullname).set({
            Name: this.props.person.fullname,
            gitHubLink: this.state.gitHubLink
        });
		this.setState({
			gitHubLink: '',
			submitted: true
		})
	}

	renderMessage = () => {
		if (this.state.submitted === true) {
			return (
				<div style={{padding: 10}}>
					<Alert message={`You have submitted successfully!`} type="success" showIcon />
				</div>
			)
		} else if (this.state.submitted === false) {
			return(
				<div style={{padding: 10}}>
					<Alert message={`You need to submit a link!`} type="info" showIcon />
				</div>
			)
		}
	}

	render() {
		console.log(this.state.challengeName)
		return (
			<div style={{backgroundColor: 'white', height: 800}}>
				<div style={{textAlign: 'center', paddingTop: 30}}>
					<h1 style={{fontSize: 35, fontFamily: 'Roboto'}} className="RobotoFont">Daily Challenge</h1>
				</div>
				<Row>
					<Col span = {24}>

							<Content className="info">
								<div style={{backgroundColor: '#c4c4c4', padding: 20}}>
								<Card title={this.state.challengeName + " Due Date:" + this.state.dueDate} bordered={true}>
									<p>{this.state.challengeDescription}</p>
								</Card>
								</div>
							</Content>

					</Col>
					<Col span={12} offset = {6}>
						<Content className = "submission">
							<div style={{backgroundColor: '#c4c4c4', padding: 20}}>
								<Card bordered={true}>
									<p>Enter your Github Link</p>
									<Form layout="inline" onSubmit={this.handleSubmit}>
										<FormItem>
								        	<Input
								        	prefix={<Icon type="link"
								        	style={{ color: 'rgba(0,0,0,.25)' }} />}
								        	placeholder="GitHub Link"
													value={this.state.gitHubLink}
								        	onChange={this.handleChange}
								        	/>
								        </FormItem>
										<FormItem>
								        	<Button type="primary" htmlType="submit">
								        	Submit
								        	</Button>
								        </FormItem>
												{this.renderMessage()}
									</Form>
								</Card>
						</div>
						</Content>
					</Col>
				</Row>
		</div>
			)
	}
}
