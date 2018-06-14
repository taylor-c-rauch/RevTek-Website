import React, { Component } from "react";
import "./App.css";
import TopBar from "./top-bar";
import ChallengeManager from "./ChallengeManager";
import Contract from "./ContractSubmission";
import DailyChallenge from "./DailyChallenge";
import Profile from "./profilepage";
import Statistics from "./Statistics";
import UserList from "./UserList";
import Homepage from "./Homepage";
import BiddingPage from "./BiddingPage";
import Authentication from "./Authentication";
import SignUp from "./SignUp";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

export default class Router extends Component {
    constructor() {
        super();
        this.state = { status: "alumni" };
    }
    render() {
        return (
            <div>

                <BrowserRouter>
                    <div>
                        <Redirect to="/profile" />
                        <Route
                            path="/home"
                            render={() => (<div><TopBar status="home" /> <Homepage /></div>)} />
                        <Route
                            path="/challenge-manager"
                            render={() => (<div><TopBar status="admin" /> <ChallengeManager /></div>)} />
                        <Route
                            path="/contract-submission"
                            render={() => (<div><TopBar status="home" /> <Contract /></div>)} />
                        <Route
                            path="/login"
                            render={() => (<div><TopBar status="home" /> <Authentication /></div>)} />
                        <Route
                            path="/sign-up"
                            render={() => (<div><TopBar status="home" /> <SignUp /></div>)} />
                        <Route
                            path="/daily-challenge"
                            render={() => (<div><TopBar status={this.state.status} /> <DailyChallenge /></div>)} />
                        <Route
                            path="/profile"
                            render={() => (<div><TopBar status={this.state.status} s /> <Profile /></div>)} />
                        <Route
                            path="/statistics"
                            render={() => (<div><TopBar status="home" /> <Statistics /></div>)} />
                        <Route
                            path="/user-list"
                            render={() => (<div><TopBar status={this.state.status} /> <UserList /></div>)} />
                        <Route
                            path="/contract-bidding"
                            render={() => (<div><TopBar status={this.state.status} /> <BiddingPage /></div>)} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
