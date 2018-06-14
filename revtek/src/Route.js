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
        this.state = { status: "alumni", user: null };
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
                            render={() => (<div> <Homepage /></div>)} />
                        <Route
                            path="/challenge-manager"
                            render={() => (<div><TopBar status="admin" /> <ChallengeManager /></div>)} />
                        <Route
                            path="/contract-submission"
                            render={() => (<div> <Contract /></div>)} />
                        <Route
                            path="/login"

                            render={() => (<div> <Login updateField={(newVal) => this.updateField(newVal)} /></div>)} />

                        <Route
                            path="/sign-up"
                            render={() => (<div><SignUp /></div>)} />
                        <Route
                            path="/daily-challenge"
                            render={() => (<div><TopBar status={this.state.status} /> <DailyChallenge /></div>)} />
                        <Route
                            path="/profile"
                            render={() => (<div>{console.log(this.state.user)}{console.log(this.state.user.status)}<TopBar status={this.state.user.status} /> <Profile /></div>)} />
                        <Route
                            path="/statistics"
                            render={() => (<div><Statistics /></div>)} />
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
