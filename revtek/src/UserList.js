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
        let newMap = alum.map(i => {
            return (<div style={{ background: '#ECECEC', padding: '30px'}}>
            <Card title={i.fullname} bordered={false} style={{ width: 300 }}>
                <p>{Object.keys(i)}</p>
            </Card>
        </div>)
        });
        return(newMap);
    }
}