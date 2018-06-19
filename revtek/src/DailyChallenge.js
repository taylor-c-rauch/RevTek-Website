import React, { Component } from 'react';
import { Layout, Form, Input, Icon, Button, Card, Row, Col } from 'antd';
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
			gitHubLink: "None"
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
	}

	render() {
		console.log(this.state.challengeName)
		return (
			<Row>
				<Col span = {24}>
					<Content className="info">
						<Card title={this.state.challengeName + " Due Date:" + this.state.dueDate} bordered={true}>
							<p>{this.state.challengeDescription}</p>
						</Card>
					</Content>
				</Col>
				<Col span={12} offset = {6}>
					<Content className = "submission">
						<Card bordered={true}>
							<p>Enter your Github Link</p>
							<Form layout="inline" onSubmit={this.handleSubmit}>
								<FormItem>
						        	<Input 
						        	prefix={<Icon type="link" 
						        	style={{ color: 'rgba(0,0,0,.25)' }} />} 
						        	placeholder="GitHub Link"
						        	onChange={this.handleChange} 
						        	/>
						        </FormItem>
								<FormItem>
						        	<Button type="primary" htmlType="submit">
						        	Submit
						        	</Button>
						        </FormItem>  
							</Form>
						</Card>
					</Content>
				</Col>	
			</Row>
			)
	}
}