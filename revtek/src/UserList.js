import React from 'react'; 
import ReactDom from 'react-dom'; 
import { Card } from 'antd';

export default class UserList extends React.Component {
    render() {
        return(
            <div style={{ background: '#ECECEC', padding: '30px'}}>
                <Card title="Jane Doe" bordered={false} style={{ width: 300 }}>
                    <p>Card content</p>
                </Card>
            </div>
        )
    }
}