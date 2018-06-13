import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

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
            intern: [{ label: "Profile", place: "/profile" }, { label: "Daily Challenge", place: "/daily-challenge" }, { label: "Contracts", place: "/" }, { label: "Alumni", place: "/" }, { label: "Forum", place: "/" }],
            alumni: [{ label: "Profile", place: "/profile" }, { label: "Leaderboard", place: "/" }, { label: "Contracts", place: "/" }, { label: "Forum", place: "/" }],
            admin: [{ label: "Profile", place: "/profile" }, { label: "Challenge Manager", place: "/challenge-manager" }, { label: "Contracts", place: "/" }, { label: "Users", place: "/user-list-admin" }, { label: "Forum", place: "/" }],
            home: [{ label: "Clients", place: "/" }, { label: "Members", place: "/" }]
        };
    }
    render() {
        const { classes } = this.props;
        if (this.props.status === "intern") {
            return (
                <div className={classes.root}>
                    <AppBar position="static" style={{ backgroundColor: "#2D9CDB" }}>
                        <Toolbar>
                            <Typography variant="display1" color="inherit" className={classes.flex}>
                                <i>RevTek</i>
                            </Typography>
                            {this.state.intern.map(item => <Link to={item.place}><Button mini ><Typography>{item.label}</Typography></Button></Link>)}
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
                                <i>RevTek</i>
                            </Typography>
                            {this.state.alumni.map(item => <Link to={item.place}><Button mini color="inherit"><Typography>{item.label}</Typography></Button></Link>)}
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
                                <i>RevTek</i>
                            </Typography>
                            {this.state.admin.map(item => <Link to={item.place}><Button mini color="inherit"><Typography>{item.label}</Typography></Button></Link>)}
                        </Toolbar>
                    </AppBar>
                </div>
            );
        }
    }
}
export default withStyles(styles)(TopBar);
