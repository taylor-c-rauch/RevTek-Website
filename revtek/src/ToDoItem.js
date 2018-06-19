import React, {Component} from 'react';
import { Input, Card, Row, Col, Button, Checkbox, InputNumber, Form, Modal, Icon } from 'antd';

export default class ToDoItem extends Component {
  render() {
    return(
      <div>
        {this.props.list.map((todo) => {
            return (
                <Card style={{ marginTop: 8 }} key={todo.id}>
                    <Checkbox checked={this.props.check} value={todo.id} onClick={() => this.props.complete(todo.id)}> {todo.task}</Checkbox>
                    <br/>
                    Hours: {todo.hours}
                    <br/>
                    <Button onClick={() => this.props.remove(todo.id)}>Remove Contract</Button>
                </Card>
            )
        })}
      </div>
      )
  }
}
