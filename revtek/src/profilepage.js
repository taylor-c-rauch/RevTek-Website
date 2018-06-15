import React, { Component } from 'react';
import { Input, Card, Row, Col, Button, Checkbox, InputNumber, Form } from 'antd';
import TopBar from "./top-bar";
import fire from './fire.js'

const Search = Input.Search;

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: "", 
            hours: null, 
            todoList: [], 
        }   
    }

    handleChange=e => {
        this.setState({
          [e.target.name]: e.target.value
        });
      }

    // When the submit button is clicked, the user input gets put on firebase
    handleClick=e => {
        const currUserRef = fire.database().ref('users/' + this.props.userID + '/todo/');
        currUserRef.push({
            task: this.state.task, 
            hours: this.state.hours
        });
        this.setState({
            task: '', 
            hours: '',
        })

        // const todoRef = fire.database().ref('todo');
        // const todo = {
        //   task: this.state.task,
        //   hours: this.state.hours, 
        // }
        // todoRef.push(todo);
    }

     // retrieves the information from firebase so it can be rendered on the screen
    componentDidMount() {
        const todoRef = fire.database().ref('users/' + this.props.userID + '/todo/');
        todoRef.on('value', (snapshot) => {
            let todoList = snapshot.val(); 
            let newState = []; 
            for (let todo in todoList) {
                newState.push({
                id: todo, 
                task: todoList[todo].task, 
                hours: todoList[todo].hours, 
                }); 
            }
            this.setState({
                todoList: newState
            });
        });
    }


    //  removes contracts 
    removeItem(itemId) {
        const itemRef = fire.database().ref(`/todo/${itemId}`);
        itemRef.remove();
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

                                <Card style={{ marginTop: 16 }} type="inner" title="Skills" extra={<Button size="small"> + </Button>}>
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
                                <Card style={{ marginTop: 8 }} type="inner" title="To-Do">
                                        <Form> 
                                            <Input placeholder="New Task" name="task" onChange={this.handleChange}/> 
                                            <Input placeholder="Number of hours" name="hours" maxlength="5" onChange={this.handleChange}/> 
                                            <Button size="small" onClick={this.handleClick}> + </Button>
                                        </Form>  
                                    <Card style={{ marginTop: 8 }} >
                                            <Checkbox> Daily Challenges</Checkbox> 
                                        <br />
                                        <br /> 
                                        Hours: <InputNumber min={0} max={100} defaultValue={0} onChange={this.handleChange} /> 
                                    </Card>
                                    {this.state.todoList.map((todo) => {
                                        return (
                                            <Card style={{ marginTop: 8 }} >
                                                <Checkbox> {todo.task}</Checkbox> 
                                                <br/>
                                                Hours: {todo.hours} 
                                                <br/>
                                                <button onClick={() => this.removeItem(todo.id)}>Remove Contract</button>
                                            </Card> 
                                        )
                                    })}
                                </Card>
                            </Card>
                        </Col>
                    </Row >
                </div >
            </div>
        );
    }
}

