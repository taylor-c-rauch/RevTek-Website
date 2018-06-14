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

import { BrowserRouter, Route, Redirect } from "react-router-dom";

export default class Router extends Component {
    constructor() {
        super();
        this.state = { user: null };
    };
    updateField = (newVal) => {
        this.setState({ user: newVal });
    };

    render() {
        return (
            <div>

                <BrowserRouter>
                    <div>
                        <Redirect to="/home" />
                        <Route
                            path="/home"
                            render={() => (<div> <Homepage person={this.state.user} /></div>)} />
                        <Route
                            path="/challenge-manager"
                            render={() => (<div><TopBar status="admin" /> <ChallengeManager person={this.state.user} /></div>)} />
                        <Route
                            path="/contract-submission"
                            render={() => (<div> <Contract person={this.state.user} /></div>)} />
                        <Route
                            path="/login"

                            render={() => (<div> <Login person={this.state.user} updateField={(newVal) => this.updateField(newVal)} /></div>)} />

                        <Route
                            path="/sign-up"
                            render={() => (<div><SignUp person={this.state.user} /></div>)} />
                        <Route
                            path="/daily-challenge"
                            render={() => (<div><TopBar status={this.state.user.status} /> <DailyChallenge person={this.state.user} /></div>)} />
                        <Route
                            path="/profile"
                            render={() => (<div><TopBar status={this.state.user.status} /> <Profile person={this.state.user} /></div>)} />
                        <Route
                            path="/statistics"
                            render={() => (<div><Statistics person={this.state.user} /></div>)} />
                        <Route
                            path="/user-list"
                            render={() => (<div><TopBar status={this.state.user.status} /> <UserList person={this.state.user} /></div>)} />
                        <Route
                            path="/contract-bidding"
                            render={() => (<div><TopBar status={this.state.user.status} /> <BiddingPage person={this.state.user} /></div>)} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
