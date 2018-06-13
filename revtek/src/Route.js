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
import { BrowserRouter, Route, Redirect } from "react-router-dom";

export default class Router extends Component {
    render() {
        return (
            <div>

                <BrowserRouter>
                    <div>
                        <Redirect to="/home" />
                        <Route
                            path="/home"
                            render={() => <Homepage />} />
                        <Route
                            path="/challenge-manager"
                            render={() => <ChallengeManager />} />
                        <Route
                            path="/contract-submission"
                            render={() => <Contract />} />
                        <Route
                            path="/daily-challenge"
                            render={() => <DailyChallenge />} />
                        <Route
                            path="/profile"
                            render={() => <Profile />} />
                        <Route
                            path="/statistics"
                            render={() => <Statistics />} />
                        <Route
                            path="/user-list-admin"
                            render={() => <UserList />} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}