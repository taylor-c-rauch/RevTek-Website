import React, { Component } from 'react';
import { Card, Button, Col, Row } from 'antd';

export default class ChallengeManager extends Component {
    render () {
        return (
            <div> 
            <div> 
                <h1>Challenge Manager</h1> 
                <Button>Add new challenge</Button>
            </div>
            <br/>
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <h2>Contract Challenge</h2> 
                <Button type="primary" shape="circle" icon="delete" />
                <Row gutter={16}>
                <Col span={4}>
                    <Card title="Jane Doe" bordered={false} style={{ width: 240 }} cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>Link:</Card>
                </Col>
                <Col span={4}>
                    <Card title="JSON Jon" bordered={false} style={{ width: 240 }} cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>Link:</Card>
                </Col>
                <Col span={4}>
                    <Card title="Sed Do" bordered={false} style={{ width: 240 }} cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>Link:</Card>
                </Col>
                <Col span={4}>
                    <Card title="Lorem Ipsum" bordered={false} style={{ width: 240 }} cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>Link:</Card>
                </Col>
                <Col span={4}>
                    <Card title="Nathan Park" bordered={false} style={{ width: 240 }} cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>Link:</Card>
                </Col>
                <Col span={4}>
                    <Card title="John Doe" bordered={false} style={{ width: 240 }} cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>Link:</Card>
                </Col>
                </Row>
            </div>
            </div>
        )
    }
}