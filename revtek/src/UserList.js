import React from 'react'; 
import ReactDom from 'react-dom'; 
import { Row, Col, Card } from 'antd';
import fire from "./fire.js";

export default class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allUsers: []
        }
    }

    componentDidMount(){
        let usersRef = fire.database().ref('users');
        let users = {};
        let allUsers = [];
        usersRef.on('value', (snapshot) => {
            users = snapshot.val();
          });
        Object.keys(users).forEach((key) => {
            let status = users[key].status;
            allUsers.push(users[key])
        });
        this.setState({allUsers: allUsers});
    }


    render() {
        return (
           <div>
                <Row gutter={16}>
                <Col span={8}>
                <h1> User Profiles </h1> 
                    {this.state.allUsers.map((user) => {
                        return (
                            <div style={{ background: '#ECECEC', padding: '30px' }}>
                            <Card title={user.fullname} bordered={false} style={{ width: 200 }}>
                                <p>{user.email}</p>
                                <p>{user.username}</p>
                            </Card>
                            </div> 
                        )
                    })}
                </Col> 
                </Row> 
            </div> 
        ); 
    }
}
