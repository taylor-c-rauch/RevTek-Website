import React, { Component } from 'react';
import { Layout, Form, Input, Icon, Card, Button, Col, Row, DatePicker } from 'antd';
import fire from "./fire.js"; 
import "./ChallengeManager.css"

const Header = Layout.Header;
const Content = Layout.Content;
const FormItem = Form.Item;
const { TextArea } = Input;

export default class ChallengeManager extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            name: "",
            duedate: "",
            description: "",
            challenges: [],
            interns: [],
            submissions: [],
            data: [],
            file: "",
            link123: "",
            disable: true,
            clicked: false
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.userID !== prevProps.userID) {
            const challengesRef = fire.database().ref('challenges/');
            challengesRef.on('value', (snapshot) => {
                let challengesSnapshot = snapshot.val();
                let challengesArray = []

                for (let challenge in challengesSnapshot) {
                    challengesArray.push({
                        id: challenge,
                        name: challengesSnapshot[challenge].name,
                        description: challengesSnapshot[challenge].description,
                        duedate: challengesSnapshot[challenge].duedate,
                        submissions: challengesSnapshot[challenge].submissions,
                        link123: challengesSnapshot[challenge].link123,
                    });
                }

                this.setState({
                    challenges: challengesArray
                })
            })

        }
    }

    componentDidMount() {
        //Updates the render() with all the challenges in Firebase
        const challengesRef = fire.database().ref('challenges/');
        challengesRef.on('value', (snapshot) => {
            let challengesSnapshot = snapshot.val();
            let challengesArray = []

            for (let challenge in challengesSnapshot) {
                challengesArray.push({
                    id: challenge,
                    name: challengesSnapshot[challenge].name,
                    description: challengesSnapshot[challenge].description,
                    duedate: challengesSnapshot[challenge].duedate,
                    submissions: challengesSnapshot[challenge].submissions,
                    link123: challengesSnapshot[challenge].link123,
                });
            }

            this.setState({
                challenges: challengesArray
            })
        })

        //Creates a snapshot of interns to display on each card
        const usersRef = fire.database().ref('users/');
        usersRef.on('value', (snapshot) => {
            let usersSnapshot = snapshot.val();
            let usersArray = []

            for (let user in usersSnapshot) {
                if (usersSnapshot[user].status == "intern") {
                    usersArray.push({
                        name: usersSnapshot[user].fullname,
                        dailyChallenges: usersSnapshot[user].dailyChallenges
                    });
                }
            }

            this.setState({
                interns: usersArray
            })
        })

    }

    handleName = (e) => {
        e.preventDefault();
        this.setState({
            name: e.target.value
        }, this.checkFields());
    }

    handleDate = (e) => {
        var myDate = new Date(e);
        this.setState({
            duedate: myDate.toLocaleString(),
            seconds: myDate.getTime(),
            clicked: true
        }, this.checkFields());
    }

    handleDescription = (e) => {
        e.preventDefault();
        this.setState({
            description: e.target.value
        }, this.checkFields())
    }
    handleLink = (e) => {
        e.preventDefault();
        this.setState({
            link123: e.target.value
        })
    }

    checkFields() {
        if (this.state.name.length !== 0 && this.state.clicked && this.state.description.length !== 0) {
            this.setState({ disable: false });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const currChallengeRef = fire.database().ref('challenges/');
        let challengeObject = ({ name: this.state.name, description: this.state.description, duedate: this.state.duedate, seconds: this.state.seconds, submissions: this.state.submissions })
        let name = this.state.name;
        let link = this.state.link123;
        if (link.slice(0, 4) !== "http") {
            link = "http://" + link;
        }
        currChallengeRef.child(name.split(" ").join("-")).set({
            name: this.state.name,
            description: this.state.description,
            duedate: this.state.duedate,
            seconds: this.state.seconds,
            submissions: this.state.submissions,
            link123: link
        });

        let array = this.state.challenges;
        array.push(challengeObject);
        this.setState({
            challenges: array, name: "", description: "", duedate: "", link123: "", clicked: "false", disable: "true"
        });

    }

    removeItem(userID) {
        { console.log(userID) }
        const currChallengeRef = fire.database().ref(`challenges/${userID}`);
        currChallengeRef.remove()
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={16} offset={4}>
                        <Content className="submission">
                            <h1 className="submission-title">Challenge Manager </h1> 
                            <div style={{background: "#c4c4c4", padding: "20px", width: "90%", margin: "0 auto"}}>
                            <Card bordered={true}>
                                <Form layout="inline" onSubmit={this.handleSubmit}>
                                    <FormItem>
                                        <Input
                                            value={this.state.name}
                                            placeholder="Challenge Name"
                                            onChange={this.handleName}
                                        />
                                    </FormItem>
                                    <FormItem>
                                        <DatePicker onChange={this.handleDate} placeholder="Due Date" />
                                    </FormItem>
                                    <TextArea
                                        rows={4}
                                        placeholder="Challenge Description"
                                        onChange={this.handleDescription}
                                        value={this.state.description}
                                    />
                                    <FormItem>
                                        <Input
                                            value={this.state.link123}
                                            prefix={<Icon type="link"
                                                style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Link"
                                            onChange={this.handleLink}
                                        />
                                    </FormItem>

                                    <FormItem>
                                        <Button type="primary" htmlType="submit" disabled={this.state.disable}>
                                            Add Challenge
                                    </Button>
                                    </FormItem>
                                </Form>
                            </Card>
                        </div>
                        </Content>
                    </Col>
                </Row>

                {/*  Maps the challenges from database to a new card and maps interns who have submitted links */}
                {this.state.challenges.map(challenge => {
                    const currName = challenge.name;
                    let query = fire.database().ref('challenges/' + currName + '/submissions/');
                    let data = []
                    query.once("value", (snapshot) => {
                        snapshot.forEach(function (childSnapshot) {
                            var childData = childSnapshot.val();
                            data.push({ name: childData.Name, gitHubLink: childData.gitHubLink })
                        });
                    });

                    return (
                        <div>
                            <Row>
                                <Col span={20} offset={2}>
                                <div classname="card" style={{background: "#c4c4c4", padding: "20px", width: "90%", margin: "0 auto"}}>
                                    <Card className="card-content" title={challenge.name + "  Due Date: " + challenge.duedate}>
                                        <p>{challenge.description} </p>
                                        <a href={challenge.link123} target="_blank">{challenge.link123} </a>
                                        <br />
                                        {data.map(submission => {
                                            return (
                                                <div>
                                                    {submission.name}: <a href={"https://" + submission.gitHubLink}> {submission.gitHubLink} </a>
                                                </div>
                                            )
                                        })
                                        }
                                        <br/>
                                        <Button type="primary" shape="circle" icon="delete" onClick={() => this.removeItem(currName)} />
                                    </Card>
                                </div>
                                </Col>
                            </Row>
                            <br />
                        </div>
                    )
                })
                }
            </div>
        )
    }
}