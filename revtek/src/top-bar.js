import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

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
            intern: ["Profile", "Daily Challenge", "Contracts", "Alumni", "Forum"],
            alumni: ["Profile", "Leaderboard", "Contracts", "Forum"],
            admin: ["Profile", "Challenge Manager", "Contracts", "Users", "Forum"]
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
                            {this.state.intern.map(item => <Button mini color="inherit">{item}</Button>)}
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
                            {this.state.alumni.map(item => <Button mini color="inherit">{item}</Button>)}
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
                            {this.state.admin.map(item => <Button mini color="inherit">{item}</Button>)}
                        </Toolbar>
                    </AppBar>
                </div>
            );
        }
    }
}
export default withStyles(styles)(TopBar);
