import React, { Component } from 'react';
import { Input, Card, Row, Col, Button, Checkbox, InputNumber, Form, Modal, Icon, Tag } from 'antd';
import TopBar from "./top-bar";
import fire from './fire.js';
import ToDoItem from './ToDoItem';


const Search = Input.Search;
const storageRef = fire.storage().ref();


export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: "",
            hours: null,
            todoList: [],
            visible: false,
            gitHubInput: "",
            linkedInInput: "",
            gitHubCurrent: "",
            linkedInCurrent: "",
            loading: false,
            skill: "",
            skills: [],
            showSkillInput: false,
            completed: false,
            profilepic: this.props.person.profilepic
        }
        this.renderCompleted = this.renderCompleted.bind(this);
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // When the submit button is clicked, the user input gets put on firebase
    handleClick = e => {
        const currUserRef = fire.database().ref('users/' + this.props.userID + '/todo/');
        currUserRef.push({
            task: this.state.task,
            hours: this.state.hours,
            completed: this.state.completed
        });
        this.setState({
            task: '',
            hours: '',
        })
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
            let skillList = snapshot.val();
            let newSkill = [];
            for (let skill in skillList) {
                newSkill.push({
                    id: skill,
                    skill: skillList[skill].skill
                })
            }
            this.setState({
                todoList: newState,
            });
        });
        const skillRef = fire.database().ref('users/' + this.props.userID + '/skills/');
        skillRef.on('value', (snapshot) => {
            let skillList = snapshot.val();
            let newSkill = [];
            for (let skill in skillList) {
                newSkill.push({
                    id: skill,
                    skill: skillList[skill].skill
                })
            }
            this.setState({
                skills: newSkill
            })
        })
    }



    showModal = e => {
        this.setState({
            visible: !this.state.visible
        });
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }

    handleModal = () => {
        const usersRef = fire.database().ref('users/' + this.props.userID);
        this.setState({ loading: true });
        setTimeout(() => {
        this.setState({ loading: false, visible: false });
            }, 500);
        usersRef.update({
            linkedIn: this.state.linkedInInput,
            gitHub: this.state.gitHubInput
        })
    }

    onSubmitSkill = () => {
        const currSkillRef = fire.database().ref('users/' + this.props.userID + '/skills/');
        currSkillRef.push({
            skill: this.state.skill,
        });
        this.setState({
            skill: '',
        })
    }


    removeSkill = (skillId) => {
      const skillRef = fire.database().ref('users/' + this.props.userID + `/skills/${skillId}` )

      skillRef.remove()

    }



    renderSkill = () => {
        if (this.state.showSkillInput == true) {
            return (
              <Row>
                <div style={{paddingTop: 10}}>
                  <Col span={15}>
                    <Input placeholder="New Skill" name="skill" onChange={this.handleChange} />
                  </Col>
                  <Col span={9}>
                    <Button onClick={() => this.onSubmitSkill()} htmlType="submit" type="dashed" >Submit</Button>
                  </Col>
                </div>
              </Row>
            )
        } else if (this.state.showSkillInput == false) {
            return (<div></div>);
        }
    }

    onShowInput = () => {
        this.setState({
            showSkillInput: !this.state.showSkillInput
        })
    }
    fileChangedHandler = (event) => {
        const pic = event.target.files[0];
        console.log(pic);
        let imageRef = storageRef.child(this.props.userID);
        imageRef.put(pic)
            .then(() => {
                console.log("uploaded");
                imageRef.getDownloadURL().then(
                    url => {
                        this.setState({ profilepic: url });
                        console.log(url);
                        let hopperRef = fire.database().ref(`/users/${this.props.userID}`);
                        hopperRef.update({
                            profilepic: url,
                        });
                    }
                )
                    .catch(err => console.log(err));
            });

    }

    onComplete = (itemId) => {
      const currUserRef = fire.database().ref('users/' + this.props.userID + `/todo/${itemId}`)
      currUserRef.update({
        completed: !this.state.completed
      })
      this.setState({
        completed: !this.state.completed
      })
      console.log(this.state.completed)




    }





    //  removes contracts
    removeItem(itemId) {
        const itemRef = fire.database().ref('users/' + this.props.userID + `/todo/${itemId}`);
        itemRef.remove();
    }

    renderCompleted = () => {

          return(
            <ToDoItem list={this.state.todoList} check={this.state.completed} remove={(itemId) => this.removeItem(itemId)} complete={(itemId) => this.onComplete(itemId)}/>
          )

      }


    render() {
        let userRef = fire.database().ref('users/' + this.props.userID);
        let user = {};
        userRef.on('value', (snapshot) => {
            user = snapshot.val();
          });
        let linkedIn = user.linkedIn;
        let gitHub = user.gitHub;
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
                                <Card style={{ marginTop: 8 }} type="inner" extra={<input type="file" onChange={this.fileChangedHandler} />} cover={<img alt="example" src={this.state.profilepic} />}>
                                    {this.props.person.fullname}
                                </Card>


                                <Card style={{ marginTop: 16 }} type="inner" title="Skills" extra={<Row><div><Button size="small" onClick={() => this.onShowInput()}> + </Button><Col span={24}>{this.renderSkill()}</Col></div></Row>}>
                                  {this.state.skills.map((skills) => {
                                    return (
                                    <div key={skills.id}>
                                      <Row style={{paddingBottom: 20}}>
                                        <Col span={20}>
                                          <Tag style={{paddingRight: 20, paddingLeft: 20}} color="magenta">{skills.skill}</Tag>
                                        </Col>
                                        <Col span={4}>
                                          <Button type="danger" onClick={() => this.removeSkill(skills.id)}>X</Button>
                                        </Col>
                                      </Row>
                                    </div>
                                  )
                                  })}
                                </Card>
                                <Card style={{ marginTop: 16 }} type="inner" title="Links" extra={<Button onClick={this.showModal} size="small">Edit</Button>}>

                                    GitHub: <a href={gitHub}> {gitHub} </a>
                                <br />
                                    LinkedIn: <a href={linkedIn}> {linkedIn} </a>
                                </Card>
                                <Modal
                                    visible={this.state.visible}
                                    title="Edit Info"
                                    onCancel={this.handleCancel}
                                    footer={[
                                        <Button key="back" onClick={this.handleCancel}>Cancel</Button>,
                                        <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleModal}>
                                            Submit
                                        </Button>,
                                    ]}
                                    >

                                    <Input
                                        placeholder="GitHub"
                                        name="gitHubInput"
                                        prefix={<Icon type="link"
                                            style={{ color: 'rgba(0,0,0,.25)' }} />}

                                        onChange={this.handleChange}>
                                    </Input>
                                    <Input
                                        placeholder="LinkedIn"
                                        name="linkedInInput"
                                        prefix={<Icon type="link"

                                            style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        onChange={this.handleChange}>
                                    </Input>
                                </Modal>
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
                                      <Row>
                                        <Col span={6}>
                                          <Input placeholder="New Task" name="task" onChange={this.handleChange} />
                                        </Col>
                                        <Col span={6} style={{paddingLeft:10}}>
                                          <Input placeholder="Number of hours" name="hours" maxlength="5" onChange={this.handleChange} />
                                        </Col>
                                        <Col span={3} style={{paddingLeft:10}}>
                                          <Button size="medium" onClick={this.handleClick}> + </Button>
                                        </Col>
                                      </Row>
                                    </Form>
                                      {this.renderCompleted()}

                                </Card>
                            </Card>
                        </Col>
                    </Row >
                </div >
            </div>
        );
    }
}
