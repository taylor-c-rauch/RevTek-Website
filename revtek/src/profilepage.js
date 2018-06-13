import React, { Component } from 'react';
import { Input, Card, Row, Col, Button, Checkbox } from 'antd';
import TopBar from "./top-bar";

const Search = Input.Search;


export default class Profile extends Component {
    render() {
        return (
            <div>
                <TopBar status="admin" />
                <div style={{ background: '#fffff', padding: '30px' }}>

                    <Row gutter={16}>
                        <Col span={8}>
                            <Card title="Profile" bordered={true} style={{ background: "#C4C4C4" }}>
                                <p
                                    style={{
                                        fontSize: 14,
                                        color: 'rgba(0, 0, 0, 0.85)',
                                        marginBottom: 8,
                                        fontWeight: 500,
                                    }}
                                />
                                <Card
                                    style={{ marginTop: 8 }}
                                    type="inner"
                                    cover={<img alt="example" src="http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" />}
                                >
                                    Name
                            </Card>

                                <Card
                                    style={{ marginTop: 16 }}
                                    type="inner"
                                    title="Skills"
                                    extra={<Button size="small">+</Button>}
                                >
                                    ReactJS, Python, JavaScript
                            </Card>
                                <Card
                                    style={{ marginTop: 16 }}
                                    type="inner"
                                    title="Links"
                                    extra={<Button size="small">Edit</Button>}
                                >
                                    Github:
                                <br />
                                    LinkedIn:
                        </Card>
                            </Card>
                        </Col>
                        <Col span={16}>
                            <Card title="Task Manager" bordered={true} style={{ background: "#C4C4C4" }}>
                                <p
                                    style={{
                                        fontSize: 14,
                                        color: 'rgba(0, 0, 0, 0.85)',
                                        marginBottom: 8,
                                        fontWeight: 500,
                                    }}
                                />

                                <Card
                                    style={{ marginTop: 8 }}
                                    type="inner"
                                    title="To-Do"
                                    extra={<Button size="small">+</Button>}
                                >
                                    <Card style={{ marginTop: 8 }} >
                                        <Checkbox>Daily Challenge</Checkbox> <br /><br /> <Search
                                            placeholder="Hours" maxlength="5"
                                            enterButton="+" /></Card>
                                    <Card style={{ marginTop: 8 }}>
                                        <Checkbox >Client Challenge </Checkbox><br /><br /><Search
                                            placeholder="Hours" maxlength="5"
                                            enterButton="+" /></Card>
                                    <Card style={{ marginTop: 8 }}>
                                        <Checkbox >Pomodoro Challenge</Checkbox><br /><br /> <Search
                                            placeholder="Hours" maxlength="5"
                                            enterButton="+" /></Card>
                                </Card>
                                <Card
                                    style={{ marginTop: 16 }}
                                    type="inner"
                                    title="Completed"
                                >
                                    <Card style={{ marginTop: 8 }}>
                                        <Checkbox >FizzBuzz</Checkbox></Card>
                                    <Card style={{ marginTop: 8 }}>
                                        <Checkbox >Partner Project</Checkbox></Card>
                                    <Card style={{ marginTop: 8 }}>
                                        <Checkbox >Other Task</Checkbox></Card>
                                </Card>
                            </Card>
                        </Col>
                    </Row >
                </div >
            </div>
        );
    }

}

