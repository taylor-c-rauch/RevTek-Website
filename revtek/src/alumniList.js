import React from 'react'; 
import ReactDom from 'react-dom'; 
import { Row, Col, Card, Tag} from 'antd';
import fire from "./fire.js";
import './alumniList.css';

export default class AlumniList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alumni: []
        }
    }

    componentDidMount(){
        let usersRef = fire.database().ref('users');
        let users = {};
        let alums = [];
        usersRef.on('value', (snapshot) => {
            users = snapshot.val();
          });
        Object.keys(users).forEach((key) => {
            let status = users[key].status;
            if(status === 'alumni') {
                alums.push(users[key])
                console.log(users[key])
            }
        });
        this.setState({alumni: alums});
    }


    render() {
        let alum = this.state.alumni;
        return (
        <div className="alumniProfs">
            <h1 className="alumniHeader"> Alumni Profiles </h1>
        {alum.map(i => {
            let skills = [];
            let curSkills = i.skills;
            if(curSkills) {
                Object.keys(curSkills).forEach((key) => {
                    let skill = curSkills[key].skill;
                    skills.push(skill)
                    console.log(skill)
                    
                });
            }
            return (
            <div style={{ background: '#ECECEC', padding: '30px'}}>
                <Card className="alumniCards" 
                      title={<h1 className="cardTitle">{i.fullname} </h1>} 
                      extra={<img width="100px" height="100px" alt="example" src={i.profilepic}/>} 
                      bordered={false}>
                    GitHub: <a href={i.gitHub}> {i.gitHub} </a>
                    <br/>
                    LinkedIn: <a href={i.linkedIn}> {i.linkedIn} </a>
                    <br/>
                    Skills: {skills.map(skill => {
                        let theSkill = skill;
                        return (
                        <Tag> {theSkill} </Tag>
                        )
                    })}
                </Card>
            </div>
        )
        })}
        </div>
    )
    }
}
