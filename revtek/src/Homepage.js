import "./App.js";
import Background from "./homepage-pic.jpg";
import "./Homepage.css";
import React, { Component } from "react";
import TopBar from "./top-bar";

import { Card, Row, Col, Button, Meta } from "antd";

export default class Homepage extends Component {
  render() {
    return (
      <div>
        <TopBar status="home" user={this.props.user} updateField={this.props.updateField} />
        <section
          style={{
            backgroundImage: `url(${Background})`,
            height: 470,
            width: "100%",
            backgroundSize: "cover",
            overflow: "hidden"
          }}
        >
          >
          <Card
            style={{ width: "70%" }}
            title="RevTek matches top talent with meaningful projects"
          >
            <p>
              {" "}
              Our highly trained interns and alumni will work with you to build
              products to suit your ever-changing needs
            </p>
          </Card>
        </section>

        <Row type="flex" justify="center">
          <p> Who are we? </p>
        </Row>
        <Row type="flex" justify="center">
          <p>
            {" "}
            At RevTek, we want to empower our employees to make meaningful
            change in the world around them through the implementation of
            world-class software.
          </p>
        </Row>
        <Row type="flex" justify="center">
          We have built a community of developers with the expertise to
          flawlessly carry out your projects and ideas.
        </Row>
      </div>
    );
  }
}
