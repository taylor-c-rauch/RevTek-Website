import React from 'react';
import ReactDom from 'react-dom';
import { Row, Col, Card, Tag } from 'antd';
import fire from "./fire.js";
import './alumniList.css';

export default class AlumniList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alumni: []
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
            let approved = users[key].approved;
            if (status === 'alumni' && approved) {
                alums.push(users[key])
                console.log(users[key])
            }
        });
        this.setState({ alumni: alums });
    }


    render() {
        let alum = this.state.alumni;
        return (
            <div className="alumniProfs">
                <div className="alumniHeader"> Alumni Profiles </div>
                {alum.map(i => {
                    let skills = [];
                    let curSkills = i.skills;
                    if (curSkills) {
                        Object.keys(curSkills).forEach((key) => {
                            let skill = curSkills[key].skill;
                            skills.push(skill)
                            console.log(skill)

                        });
                    }
                    return (
                        <div>
                            <Row>
                                <Col span={20} offset={2}>
                                    <Card style={{ background: "#C4C4C4", marginTop: "20px", padding: "5px" }}>
                                        <Card className="alumniCards"

                                            title={<p className="cardTitle">{i.fullname} </p>}
                                            extra={<img width="100px" height="100px" alt="example" src={i.profilepic} />}
                                            bordered={true}>
                                            GitHub: <a href={"https://" + i.gitHub}> {i.gitHub} </a>
                                            <br />
                                            LinkedIn: <a href={"https://" + i.linkedIn}> {i.linkedIn} </a>
                                            <br />
                                            Skills: {skills.map(skill => {
                                                let theSkill = skill;
                                                return (
                                                    <Tag> {theSkill} </Tag>
                                                )
                                            })}
                                        </Card>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    )
                })}
            </div>
        )
    }
}
