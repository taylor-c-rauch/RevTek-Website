import React, { Component } from 'react';
import { Input, Card, Row, Col, Button, Checkbox } from 'antd';
import TopBar from "./top-bar";

const Search = Input.Search;

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: [{task: "New task 2", hours:null}], 
        }
    }

    handleClick = e => {
        let todo = this.state.todo;
        todo.push({task:"", hours:null});
        this.setState({todo:todo});
    }


    render() {
        return (
            <div>
                <div style={{ background: '#fffff', padding: '30px' }}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card title="Profile" bordered={true} style={{ background: "#C4C4C4" }}>
                                <p style={{
                                        fontSize: 14,
                                        color: 'rgba(0, 0, 0, 0.85)',
                                        marginBottom: 8,
                                        fontWeight: 500,
                                    }}
                                />
                                <Card style={{ marginTop: 8 }} type="inner" cover={<img alt="example" src="http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" />}>
                                    Name
                                </Card>

                                <Card style={{ marginTop: 16 }} type="inner" title="Skills" extra={<Button size="small" onClick={this.handleClick}> + </Button>}>
                                    ReactJS, Python, JavaScript
                                </Card>
                                <Card style={{ marginTop: 16 }} type="inner" title="Links" extra={<Button size="small">Edit</Button>}>
                                    Github:
                                <br />
                                    LinkedIn:
                                </Card>
                            </Card>
                        </Col>
                        <Col span={16}>
                            <Card title="Task Manager" bordered={true} style={{ background: "#C4C4C4" }}>
                                <p style={{
                                        fontSize: 14,
                                        color: 'rgba(0, 0, 0, 0.85)',
                                        marginBottom: 8,
                                        fontWeight: 500,
                                    }}
                                />
                                <Card style={{ marginTop: 8 }} type="inner" title="To-Do" extra={
                                        <Search placeholder="New Task" maxlength="5" onSearch={this.handleClick} enterButton= {<Button size="small"> + </Button>} /> }>
                                    <Card style={{ marginTop: 8 }} >
                                            <Checkbox> Daily Challenges</Checkbox> 
                                        <br />
                                        <br /> 
                                            <Search placeholder="Hours" maxlength="5" enterButton="+" />
                                    </Card>
                                    {this.state.todo.map(item=> 
                                        <Card style={{ marginTop: 8 }} >
                                            <Checkbox> {item.task}</Checkbox> 
                                            <Button> Remove </Button>
                                        <br />
                                        <br /> 
                                            <Search placeholder="Hours" maxlength="5" enterButton="+" />
                                        </Card> 
                                    )}
                                </Card>
                            </Card>
                        </Col>
                    </Row >
                </div >
            </div>
        );
    }
}

