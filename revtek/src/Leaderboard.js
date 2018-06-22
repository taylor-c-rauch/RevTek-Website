import React from 'react';
import ReactDom from 'react-dom';
import { Row, Col, Card, Tag } from 'antd';
import fire from "./fire.js";

export default class Leaderboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alumni: [],
            id: 0
        }
    }

    componentDidMount() {
        let usersRef = fire.database().ref('users');
        let users = {};
        let alums = [];
        usersRef.on('value', (snapshot) => {
            users = snapshot.val();
        });
        Object.keys(users).forEach((key) => {
            let status = users[key].status;
            if (status === 'alumni') {
                let person = {
                    name: users[key].fullname,
                    profilepic: users[key].profilepic,
                    github: users[key].gitHub,
                    linkedin: users[key].linkedIn,
                    skills: users[key].skills,
                    numContracts: users[key].numContracts,
                    index: 1
                };
                alums.push(person);
            }
        });
        this.setState({ alumni: alums }, this.sortAlumni);
    }

    sortAlumni() {
        let peeps = this.state.alumni;
        peeps.sort((a, b) => b.numContracts - a.numContracts);
        this.setState({ alumni: peeps });
    }


    render() {
        return (
            <Row type="flex" justify="center" >
                <Col span={22}>
                    <Card style={{ marginTop: 16, background: "#C4C4C4" }} title="Leaderboard">
                        {this.state.alumni.map(person =>
                            <Row type="flex" justify="space-around" >
                                <Col span={4}>
                                    <Card style={{ marginTop: 8, height: 181 }}>{(this.state.alumni.indexOf(person) + 1)}</Card>
                                </Col>
                                <Col span={20}>
                                    <Card style={{ marginTop: 8 }} title={<h1 className="cardTitle">{person.name} </h1>}
                                        extra={<img width="75px" height="75px" alt="example" src={person.profilepic} />}
                                    >Number of Contracts: {person.numContracts}</Card>
                                </Col>
                            </Row>)}
                    </Card>
                </Col>
            </Row>
        );
    }
}