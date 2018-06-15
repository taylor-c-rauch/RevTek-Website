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
			dailyChallengeID: 0,
			gitHubLink: 0
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

		const currUserRef = fire.database().ref('users/' + this.props.userID + '/dailyChallenges/');

		let test = [];
		var dailyObject = ({ID: this.state.dailyChallengeID , Link: this.state.gitHubLink})
		currUserRef.push(dailyObject);

		

    	this.setState({
    		dailyChallengeID: 0 , 
    		gitHubLink: "" 
    	});	
	}

	render() {
		return (
			<Row>
				<Col span = {24}>
					<Content className="info">
						<Card title="Daily Challenge" bordered={true}>
							<p><font size="5">"Lorem ipsum dolor sit amet, consectetur 
							adipiscing elit, sed do eiusmod tempor incididunt ut labore 
							et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
							ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
							in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
							Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
							ollit anim id est laborum."</font></p>
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