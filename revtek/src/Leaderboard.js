import React from 'react';
import ReactDom from 'react-dom';
import { Row, Col, Card, Tag } from 'antd';
import fire from "./fire.js";

export default class Leaderboard extends React.Component {
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
            if (status === 'alumni') {
                alums.push(users[key])
                console.log(users[key])
            }
        });
        this.setState({ alumni: alums });
    }

    render() {
        return (
            <p> hey</p>
        );
    }
}