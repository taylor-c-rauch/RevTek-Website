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
import Login from "./Login";
import SignUp from "./SignUp";
import fire from "./fire";

import { BrowserRouter, Route, Redirect } from "react-router-dom";

export default class Router extends Component {
    constructor() {
        super();
        this.state = { email: "", user: null, users: [], userID: "", userInfo: {}, status: "" };
    };
    updateField = (field, newVal) => {
        this.setState({ [field]: newVal });
    };

    render() {
        console.log(this.state);
        return (
            <div>

                <BrowserRouter>
                    <div>
                        <Redirect to="/home" />
                        <Route
                            path="/home"
                            render={() => (<div> <Homepage person={this.state.userInfo} /></div>)} />
                        <Route
                            path="/challenge-manager"
                            render={() => (<div><TopBar status="admin" /> <ChallengeManager person={this.state.userInfo} /></div>)} />
                        <Route
                            path="/contract-submission"
                            render={() => (<div> <Contract person={this.state.userInfo} /></div>)} />
                        <Route
                            path="/login"

                            render={() => (<div> <Login person={this.state.userInfo} updateField={(field, newVal) => this.updateField(field, newVal)} /></div>)} />

                        <Route
                            path="/sign-up"
                            render={() => (<div><SignUp person={this.state.userInfo} /></div>)} />
                        <Route
                            path="/daily-challenge"
                            render={() => (<div><TopBar status={this.state.status} /> <DailyChallenge person={this.state.userInfo} /></div>)} />
                        <Route
                            path="/profile"
                            render={() => (<div><TopBar status={this.state.status} /> <Profile person={this.state.userInfo} userID={this.state.userID} /></div>)} />
                        <Route
                            path="/statistics"
                            render={() => (<div><Statistics person={this.state.userInfo} /></div>)} />
                        <Route
                            path="/user-list"
                            render={() => (<div><TopBar status={this.state.status} /> <UserList person={this.state.userInfo} /></div>)} />
                        <Route
                            path="/contract-bidding"
                            render={() => (<div><TopBar status={this.state.status} /> <BiddingPage person={this.state.userInfo} /></div>)} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
