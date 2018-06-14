import React, { Component } from 'react';
import Background from './assets/homePhoto.jpg';
import { Input, Button, Row, Col } from 'antd';
import fire from './fire';
import TopBar from "./top-bar";

export default class SignUpForm extends Component {
  render() {
    return (
      <section style={{
        backgroundImage: `url(${Background})`,
        height: 800,
        width: '100%',
        backgroundSize: 'cover',
        overflow: 'hidden'
      }}>
        <TopBar status="home" />
        <div>
          <h1>Sign Up</h1>
          <Row>
            <Col span={24}>
              <Input style={{ width: '50%' }} id="email" placeholder="Email" onChange={e => this.handleUserInput(e)} />
            </Col>
            <Col span={24}>
              <Input style={{ width: '50%' }} id="username" placeholder="Username" onChange={e => this.handleUserInput(e)} />
            </Col>
            <Col span={24}>
              <Input style={{ width: '50%' }} id="fullname" placeholder="Fullname" onChange={e => this.handleUserInput(e)} />
            </Col>
            <Col span={24}>
              <Input style={{ width: '50%' }} id="password" placeholder="Password" onChange={e => this.handleUserInput(e)} />
            </Col>
            <Col span={24}>
              <Input style={{ width: '50%' }} id="status" placeholder="Status" onChange={e => this.handleUserInput(e)} />
            </Col>
            <Button type="primary" onClick={e => this.signup(e)}>Submit</Button>
          </Row>
        </div>
      </section>
    )
  }
}
