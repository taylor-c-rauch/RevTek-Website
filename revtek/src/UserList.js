import React from 'react'; 
import ReactDom from 'react-dom'; 
import { Row, Col, Card, Button } from 'antd';
import fire from "./fire.js";

export default class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allUsers: [], 
            clicked: false, 
        }
    }

    handleClick = e => {
        this.setState({
            clicked: !this.state.clicked,
        })
    }

    removeItem(itemId) {
        const itemRef = fire.database().ref('users/' + this.props.userID);
        itemRef.remove();
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
        if (this.state.clicked == true) {
            return (
               <div>
                     <Row gutter={16}>
                     <Col span={8}>
                     <h1> User Profiles </h1> 
                         <Button size="medium" onClick={this.handleClick}>Done</Button>
                         {this.state.allUsers.map((user) => {
                             return (
                                 <div style={{ background: '#ECECEC', padding: '30px' }}>
                                 <Card title={user.fullname} bordered={false} style={{ width: 200 }}>
                                     <p>Username: {user.username}</p>
                                     <p>Email: {user.email}</p>
                                     <Button size="medium" onClick={() => this.removeItem(user.id)}>Remove User</Button>
                                 </Card>
                                 </div> 
                             )
                         })}
                     </Col> 
                     </Row> 
                 </div> 
            )
        }
        else {
            return (
                <div>
                     <Row gutter={16}>
                     <Col span={8}>
                     <h1> User Profiles </h1> 
                         <Button size="medium" onClick={this.handleClick}>Edit</Button>
                         {this.state.allUsers.map((user) => {
                             return (
                                 <div style={{ background: '#ECECEC', padding: '30px' }}>
                                 <Card title={user.fullname} bordered={false} style={{ marginTop: 8 }}>
                                     <p>Username: {user.username}</p>
                                     <p>Email: {user.email}</p>
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
}
