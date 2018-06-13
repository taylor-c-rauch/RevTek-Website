import React, { Component } from 'react';
import { Layout, Form, Input, Card } from 'antd';
const Header = Layout.Header;
const Content = Layout.Content;

export default class DailyChallenge extends Component{

	render() {
		return (
			<div className = "daily">
				<Layout>
					<Layout>
						<Content>
						<Card title="Daily Challenge">
							<p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
						</Card>
						<Card>
							<p>GitHub Submission Link</p>
							<Input link = "GitHub Link" />
						</Card>
						</Content>
					</Layout>
				</Layout>
			</div>
			)
	}
}