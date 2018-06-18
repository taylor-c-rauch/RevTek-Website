import React from 'react'; 
import ReactDom from 'react-dom'; 
import { Row, Col, Card } from 'antd';
import fire from "./fire.js";

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
            }
        });
        this.setState({alumni: alums});
    }


    render() {
        let alum = this.state.alumni;
        return (
        <div>
            <h1> Alumni Profiles </h1>
        {alum.map(i => {
            return (
            <div style={{ background: '#ECECEC', padding: '30px'}}>
                <Card className="alumniProfs" title={i.fullname} bordered={false} style={{ width: 900 }}>
                    <p> {i.email} {i.username} </p>
                </Card>
            </div>
        )
        })}
        </div>
    )
    }
}
