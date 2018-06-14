import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { MuiThemeProvider, createMuiTheme, Menu, MenuItem, AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import fire from './fire';

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class TopBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: this.props.status,
            intern: [{ label: "Profile", place: "/profile" }, { label: "Daily Challenge", place: "/daily-challenge" }, { label: "Contracts", place: "/contract-bidding" }, { label: "Alumni", place: "/user-list" }, { label: "Forum", place: "/" }, { label: "Logout", place: "/" }],
            alumni: [{ label: "Profile", place: "/profile" }, { label: "Leaderboard", place: "/" }, { label: "Contracts", place: "/contract-bidding" }, { label: "Forum", place: "/" }, { label: "Logout", place: "/" }],
            admin: [{ label: "Profile", place: "/profile" }, { label: "Challenge Manager", place: "/challenge-manager" }, { label: "Contracts", place: "/contract-bidding" }, { label: "Users", place: "/user-list" }, { label: "Forum", place: "/" }, { label: "Logout", place: "/" }],
            anchor1: null,
            anchor2: null,
            auth1: true,
            auth2: true
        };
    }
    handleChange1 = (event, checked) => {
        this.setState({ auth1: checked });
    };

    handleMenu1 = event => {
        this.setState({ anchor1: event.currentTarget });
    };

    handleClose1 = () => {
        this.setState({ anchor1: null });
    };
    handleChange2 = (event, checked) => {
        this.setState({ auth2: checked });
    };

    handleMenu2 = event => {
        this.setState({ anchor2: event.currentTarget });
    };

    handleClose2 = () => {
        this.setState({ anchor2: null });
    };

    logout() {
        console.log("log out");
        fire.auth().signOut();
      }
    render() {
        const { classes } = this.props;
        const { auth1, anchor1, auth2, anchor2 } = this.state;
        const open1 = Boolean(anchor1);
        const open2 = Boolean(anchor2);
        if (this.props.status === "home") {
            return (
                <div className={classes.root}>
                    <AppBar position="static" style={{ backgroundColor: "#2D9CDB" }}>
                        <Toolbar>
                            <Typography variant="display1" color="inherit" className={classes.flex}>
                                <Link to="/home" style={{ textDecoration: "none", color: "#fff" }}><i>RevTek</i></Link>
                            </Typography>
                            <Button mini onClick={this.handleMenu1}><Typography><font color="white">Clients</font></Typography></Button>
                            <Menu

                                anchorEl={anchor1}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                getContentAnchorEl={null}

                                open={open1}
                                onClose={this.handleClose1}
                            >
                                <Link to="/contract-submission" style={{ textDecoration: "none" }}><MenuItem onClick={this.handleClose1}>Submit Contract</MenuItem></Link>
                                <Link to="/statistics" style={{ textDecoration: "none" }}><MenuItem onClick={this.handleClose1}>Developer Stats</MenuItem></Link>
                            </Menu>

                            <Button mini onClick={this.handleMenu2}><Typography><font color="white">Members</font></Typography></Button>

                            <Menu
                                anchorEl={anchor2}

                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}

                                getContentAnchorEl={null}
                                open={open2}
                                onClose={this.handleClose2}
                            >
                                <Link to="/login" style={{ textDecoration: "none" }}><MenuItem onClick={this.handleClose2}>Login</MenuItem></Link>
                                <Link to="/sign-up" style={{ textDecoration: "none" }}><MenuItem onClick={this.handleClose2}>Sign-Up</MenuItem></Link>
                            </Menu>
                        </Toolbar>
                    </AppBar>
                </div >
            );
        }
        else if (this.props.status === "intern") {
            return (
                <div className={classes.root}>
                    <AppBar position="static" style={{ backgroundColor: "#2D9CDB" }}>
                        <Toolbar>
                            <Typography variant="display1" color="inherit" className={classes.flex}>
                                <Link to="/home" style={{ testDecoration: "none", color: "#fff" }}><i>RevTek</i></Link>
                            </Typography>
                            {this.state.intern.map(item => <Link to={item.place}><Button mini ><Typography><font color="white">{item.label}</font></Typography></Button></Link>)}
                            <Link to="/login" style={{ textDecoration: "none" }}><MenuItem onClick={() => this.logout()}>Logout</MenuItem></Link>

                        </Toolbar>
                    </AppBar>
                </div>
            );
        }
        else if (this.props.status === "alumni") {
            return (
                <div className={classes.root}>
                    <AppBar position="static" style={{ backgroundColor: "#2D9CDB" }}>
                        <Toolbar>
                            <Typography variant="display1" color="inherit" className={classes.flex}>
                                <Link to="/home" style={{ testDecoration: "none", color: "#fff" }}><i>RevTek</i></Link>
                            </Typography>
                            {this.state.alumni.map(item => <Link to={item.place}><Button mini color="inherit"><Typography><font color="white">{item.label}</font></Typography></Button></Link>)}
                            <Link to="/login" style={{ textDecoration: "none" }}><MenuItem onClick={() => this.logout()}>Logout</MenuItem></Link>
                        </Toolbar>
                    </AppBar>
                </div>
            );
        }
        else {
            return (
                <div className={classes.root}>
                    <AppBar position="static" style={{ backgroundColor: "#2D9CDB" }}>
                        <Toolbar>
                            <Typography variant="display1" color="inherit" className={classes.flex}>
                                <Link to="/home" style={{ testDecoration: "none", color: "#fff" }}><i>RevTek</i></Link>
                            </Typography>
                            {this.state.admin.map(item => <Link to={item.place}><Button mini color="inherit"><Typography><font color="white">{item.label}</font></Typography></Button></Link>)}
                            <Link to="/login" style={{ textDecoration: "none" }}><MenuItem onClick={() => this.logout()}>Logout</MenuItem></Link>
                        </Toolbar>
                    </AppBar>
                </div>
            );
        }
    }
}
export default withStyles(styles)(TopBar);
