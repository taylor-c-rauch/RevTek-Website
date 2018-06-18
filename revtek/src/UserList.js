import React from 'react'; 
import ReactDom from 'react-dom'; 
import { Card } from 'antd';
import fire from "./fire.js";

export default class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alumni: []
        }
    }

    componentDidMount(){
        let usersRef = fire.database().ref('users');
        let users = {};
        let alum = [];
        usersRef.on('value', (snapshot) => {
            users = snapshot.val();
          });
        Object.keys(users).forEach((key) => {
            let status = users[key].status;
            if(status === "alumni") {
                alum.push(users[key]);
            }
        });
        this.setState({alumni: alum});
    }


    render() {
        let alum = this.state.alumni;
        return (
        alum.map(i => {
            return (
            <div style={{ background: '#ECECEC', padding: '30px'}}>
                <Card className="alumniProfs" title={i.fullname} bordered={false} style={{ width: 900 }}>
                    <p> {i.email} {i.username} </p>
                </Card>
            </div>
        )
        })
    )
    }
}