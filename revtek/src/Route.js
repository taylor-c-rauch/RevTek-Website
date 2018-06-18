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
import SignUpForm from "./SignUpForm";
import fire from "./fire";
import UserMessage from "./UserMessage";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

export default class Router extends Component {

    render() {
        return (

            <div>
                <Redirect to="/home" />
                <Route
                    path="/home"
                    render={() => (<div> <Homepage updateField={this.props.updateField} user={this.props.user} person={this.props.userInfo} /></div>)} />
                <Route
                    path="/challenge-manager"
                    render={() => (<div><TopBar updateField={this.props.updateField} user={this.props.user} status="admin" /> <ChallengeManager person={this.props.userInfo} /></div>)} />
                <Route
                    path="/contract-submission"
                    render={() => (<div> <Contract updateField={this.props.updateField} user={this.props.user} person={this.props.userInfo} /></div>)} />
                <Route
                    path="/login"
                    render={() => (<div> <Login updateField={this.props.updateField} user={this.props.user} person={this.props.userInfo} /></div>)} />
                <Route
                    path="/sign-up"
                    render={() => (<div><SignUpForm updateField={this.props.updateField} user={this.props.user} person={this.props.userInfo} /></div>)} />
                <Route
                    path="/daily-challenge"
                    render={() => (<div><TopBar user={this.props.user} updateField={this.props.updateField} status={this.props.status} /> <DailyChallenge person={this.props.userInfo} userID={this.props.userID} /></div>)} />
                <Route
                    path="/profile"
                    render={() => (<div><TopBar user={this.props.user} updateField={this.props.updateField} status={this.props.status} /> <Profile person={this.props.userInfo} userID={this.props.userID} /></div>)} />

                <Route
                    path="/statistics"
                    render={() => (<div><Statistics updateField={this.props.updateField} user={this.props.user} person={this.props.userInfo} /></div>)} />
                <Route
                    path="/user-list"
                    render={() => (<div><TopBar user={this.props.user} updateField={this.props.updateField} status={this.props.status} /> <UserList person={this.props.userInfo} /></div>)} />
                <Route
                    path="/signup-message"
                    render={() => (<div> <UserMessage updateField={this.props.updateField} user={this.props.user} person={this.props.userInfo} /></div>)} />
                <Route
                    path="/contract-bidding"
                    render={() => (<div><TopBar user={this.props.user} updateField={this.props.updateField} status={this.props.status} /> <BiddingPage person={this.props.userInfo} /></div>)} />
            </div>

        );
    }
}
