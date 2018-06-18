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

    removeItem(userID) {
        console.log(userID);
        const userRef = fire.database().ref(`/users/${userID}`);
        userRef.remove();
    }

    componentDidMount(){
        let usersRef = fire.database().ref('users');
        usersRef.on('value', (snapshot) => {
            let users = snapshot.val();
            let allUsers = []; 
            for (let user in users) {
                allUsers.push({
                  id: user, 
                  name: users[user].fullname, 
                  email: users[user].email, 
                  username: users[user].username,
                }); 
            }
            console.log(allUsers)
            this.setState({
                allUsers: allUsers
              });
        });
    }
         
   

    render() {
        const isClicked = this.state.clicked; 
        return (
            <div>
                 <Row gutter={16}>
                 <Col span={8}>
                 <h1> User Profiles </h1> 
                     {isClicked ? <Button size="medium" onClick={this.handleClick}>Done</Button> : <Button size="medium" onClick={this.handleClick}>Edit</Button>} 
                     <div style={{ background: '#ECECEC', padding: '30px' }}>
                        {this.state.allUsers.map((user) => {
                            return (
                                <Card title={user.fullname} bordered={false} style={{ marginTop: 8 }}>
                                    <p>Username: {user.username}</p>
                                    <p>Email: {user.email}</p>
                                    {isClicked ?  <Button size="medium" onClick={() => this.removeItem(user.id)}>Remove User</Button> : null}
                                </Card>
                            )
                        })}
                     </div> 
                 </Col> 
                 </Row> 
             </div> 
         ); 
    }
}
