import React, {Component} from 'react';
import { Input, Card, Row, Col, Button, Checkbox, InputNumber, Form, Modal, Icon } from 'antd';

export default class ToDoItem extends Component {
  render() {
    return(
      <div>
        {this.props.list.map((todo) => {
            return (
                <Card style={{ marginTop: 8, backgroundColor: '#d1e2ff' }} key={todo.id}>
                  <Row>
                    <Col span={20} style={{paddingBottom: 10}}>
                      <Checkbox checked={todo.completed} value={todo.id} onClick={() => this.props.complete(todo.id)}>{todo.task}</Checkbox>
                    </Col>
                    <Col span={4}>
                      <Card style={{backgroundColor: 'white', paddingTop: -5, paddingBottom: -5}}>
                        <h4>Hours: {todo.hours}</h4>
                      </Card>
                    </Col>
                    <div>
                      <Button onClick={() => this.props.remove(todo.id)} type="danger">Remove Task</Button>
                    </div>
                  </Row>
                </Card>
            )
        })}
      </div>
      )
  }
}
