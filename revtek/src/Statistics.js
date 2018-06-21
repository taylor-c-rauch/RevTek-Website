import React from 'react';
import ReactDom from 'react-dom';
import * as V from 'victory';
import TopBar from "./top-bar";
import fire from "./fire.js";
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';

export default class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            skills: []
        }
    }

    componentDidMount() {
        const skillsRef = fire.database().ref(' skills');
        //let theSkills = {};
        //let allSkills = [];
        skillsRef.on('value', (snapshot) => {
            console.log(snapshot.val());
        });
        /*
        if(theSkills){
            Object.keys(theSkills).forEach((key) => {
                allSkills.push(theSkills[key])
                console.log(theSkills[key])
            });
        }
        this.setState({ skills: allSkills });*/
    }

    render() {
        const data = [
            { skill: "ReactJS (Beginner)", numUsers: this.state.ReactJSB },
            { skill: 2, numUsers: 16500 },
            { skill: 3, numUsers: 14250 },
            { skill: 4, numUsers: 19000 }
        ]
        /*
        skills.map(skill => {
            let theSkill = skill;
            return (
                console.log(theSkill)
            )
        })*/
        return (
            <div>
                <TopBar person={this.props.person} updateField={this.props.updateField} status="home" user={this.props.user} />
                <VictoryChart
                    // domainPadding will add space to each side of VictoryBar to prevent it from overlapping the axis
                    domainPadding={20}
                >
                    <VictoryAxis
                        // tickValues specifies both the number of ticks and where
                        // they are placed on the axis
                        tickValues={[1, 2, 3, 4]}
                        tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
                    />
                    <VictoryAxis
                        dependentAxis
                        // tickFormat specifies how ticks should be displayed
                        tickFormat={(x) => (`$${x / 1000}k`)}
                    />
                    <VictoryBar
                        data={data}
                        x="skill"
                        y="numUsers"
                    />
                </VictoryChart>
            </div>
        );
    }
}