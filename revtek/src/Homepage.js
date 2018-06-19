import "./App.js";
import Background from "./homepage-pic.jpg";
import "./Homepage.css";
import React, { Component } from "react";
import TopBar from "./top-bar";

import { Card, Row, Col, Button, Meta } from "antd";

export default class Homepage extends Component {
  render() {
    return (
      <div className="Homepage">
        <TopBar
          status="home"
          user={this.props.user}
          updateField={this.props.updateField}
        />
        <section>
          <section className="Homepage-box">
            <h1 className="Title">
              {" "}
              RevTek matches top talent with meaningful projects{" "}
            </h1>
            <p2>
              Our highly trained interns and alumni will work with you to build
              products to suit your ever-changing needs
            </p2>
          </section>
          <div className="Footer">
            <h2 className="Who"> Who are we? </h2>
            <Row type="flex" justify="center">
              <p color="FFFFFF" className="Description">
                {" "}
                At RevTek, we want to empower our employees to make meaningful
                change in the world around them through the implementation of
                world-class software.
              </p>
            </Row>
            <p className="Description">
              We have built a community of developers with the expertise to
              flawlessly carry out your projects and ideas. We are excited to
              see what we can accomplish together.
            </p>
          </div>
        </section>
      </div>
    );
  }
}
