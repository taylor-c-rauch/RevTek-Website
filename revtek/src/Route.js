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
import AlumniList from "./alumniList";
import NotApproved from "./notApproved";
import ContractEditor from "./ContractEditor";
import Leaderboard from "./Leaderboard";

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
                    render={() => (<div><TopBar person={this.props.userInfo} approved={this.props.approved} updateField={this.props.updateField} user={this.props.user} status="admin" /> <ChallengeManager approved={this.props.approved} person={this.props.userInfo} /></div>)} />
                <Route
                    path="/contract-submission"
                    render={() => (<div> <Contract updateField={this.props.updateField} user={this.props.user} person={this.props.userInfo} /></div>)} />
                <Route
                    path="/login"
                    render={() => (<div> <Login approved={this.props.approved} updateField={this.props.updateField} user={this.props.user} person={this.props.userInfo} /></div>)} />
                <Route
                    path="/sign-up"
                    render={() => (<div><SignUpForm updateField={this.props.updateField} user={this.props.user} person={this.props.userInfo} /></div>)} />
                <Route
                    path="/daily-challenge"
                    render={() => (<div><TopBar person={this.props.userInfo} approved={this.props.approved} user={this.props.user} updateField={this.props.updateField} status={this.props.status} /> <DailyChallenge approved={this.props.approved} person={this.props.userInfo} userID={this.props.userID} /></div>)} />
                <Route
                    path="/profile"
                    render={() => (this.props.approved ? <div><TopBar person={this.props.userInfo} approved={this.props.approved} user={this.props.user} updateField={this.props.updateField} status={this.props.status} /> <Profile approved={this.props.approved} person={this.props.userInfo} userID={this.props.userID} /></div> : <NotApproved updateField={this.props.updateField} user={this.props.user} person={this.props.userInfo} />)} />
                <Route
                    path="/alumni-list"
                    render={() => (<div><TopBar person={this.props.userInfo} approved={this.props.approved} user={this.props.user} updateField={this.props.updateField} status="intern" /> <AlumniList approved={this.props.approved} person={this.props.userInfo} userID={this.props.userID} /></div>)} />
                <Route
                    path="/statistics"
                    render={() => (<div><Statistics updateField={this.props.updateField} user={this.props.user} person={this.props.userInfo} /></div>)} />
                <Route
                    path="/user-list"
                    render={() => (<div><TopBar person={this.props.userInfo} approved={this.props.approved} user={this.props.user} updateField={this.props.updateField} status={this.props.status} /> <UserList approved={this.props.approved} person={this.props.userInfo} /></div>)} />
                <Route
                    path="/signup-message"
                    render={() => (<div> <UserMessage updateField={this.props.updateField} user={this.props.user} person={this.props.userInfo} /></div>)} />
                <Route
                    path="/contract-bidding"
                    render={() => (<div><TopBar person={this.props.userInfo} approved={this.props.approved} user={this.props.user} updateField={this.props.updateField} status={this.props.status} /> <BiddingPage approved={this.props.approved} person={this.props.userInfo} userID={this.props.userID} /></div>)} />
                <Route
                    path="/not-approved"
                    render={() => (<div> <NotApproved updateField={this.props.updateField} user={this.props.user} person={this.props.userInfo} /></div>)} />
                <Route
                    path="/contract-editor"
                    render={() => (<div><TopBar person={this.props.userInfo} approved={this.props.approved} user={this.props.user} updateField={this.props.updateField} status="administrator" /> <ContractEditor approved={this.props.approved} person={this.props.userInfo} /></div>)} />
                <Route
                    path="/leaderboard"
                    render={() => (<div><TopBar person={this.props.userInfo} pproved={this.props.approved} user={this.props.user} updateField={this.props.updateField} status={this.props.status} /> <Leaderboard approved={this.props.approved} person={this.props.userInfo} /></div>)} />

            </div>

        );
    }
}
