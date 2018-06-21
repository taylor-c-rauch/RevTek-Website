import React from 'react';
import ReactDom from 'react-dom';
import * as V from 'victory';
import TopBar from "./top-bar";
import fire from "./fire.js";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryStack, VictoryTheme, VictoryLegend} from 'victory';
import './Statistics.css';

export default class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Reactjs_Beginner: 0,
            Reactjs_Intermediate: 0,
            Reactjs_Advanced: 0,
            GitGithub_Beginner: 0,
            GitGithub_Intermediate: 0,
            GitGithub_Advanced: 0,
            Firebase_Beginner: 0,
            Firebase_Intermediate: 0,
            Firebase_Advanced: 0,
            Java_Beginner: 0,
            Java_Intermediate: 0,
            Java_Advanced: 0,
            Javascript_Beginner: 0,
            Javascript_Intermediate: 0,
            Javascript_Advanced: 0,
            Python_Beginner: 0,
            Python_Intermediate: 0,
            Python_Advanced: 0,
            Cpp_Beginner: 0,
            Cpp_Intermediate: 0,
            Cpp_Advanced: 0,
            C_Beginner: 0,
            C_Intermediate: 0,
            C_Advanced: 0,
            CSS_Beginner: 0,
            CSS_Intermediate: 0,
            CSS_Advanced: 0,
            Nodejs_Beginner: 0,
            Nodejs_Intermediate: 0,
            Nodejs_Advanced: 0
        }
    }

    componentDidMount() {
        const skillsRef = fire.database().ref(' skills');
        let skillsSnapshot = {};
        let skills = [];
        skillsRef.on('value', (snapshot) => {
            skillsSnapshot = snapshot.val();
            if(skillsSnapshot) {
                Object.keys(skillsSnapshot).forEach((key) => {
                    let curSkill = (skillsSnapshot[key]).skill;
                    curSkill = curSkill.replace(".", "");
                    curSkill = curSkill.replace("(", "");
                    curSkill = curSkill.replace(")", "");
                    curSkill = curSkill.replace(" ", "_");
                    curSkill = curSkill.replace("/", "");
                    curSkill = curSkill.replace("+", "p");
                    skills.push(curSkill);
                });
            }
            let newState = {};
            for(let i = 0; i < skills.length; i++){
                let curSkill = skills[i];
                if(newState[curSkill]) {
                    newState[curSkill] += 1;
                }
                else {
                    newState[curSkill] = 1;
                }
            }
            this.setState(newState);       
        });
    }

    render() {
        console.log("2: " + this.state.Javascript_Advanced);
        console.log("1: " + this.state.GitGithub_Intermediate);
        console.log("1: " + this.state.Firebase_Intermediate);
        
        const beginnerData = [
            { skill: "React.js (Beginner)", numUsers: this.state.Reactjs_Beginner},
            { skill: "Git/Github (Beginner)", numUsers: this.state.GitGithub_Beginner},
            { skill: "Firebase (Beginner)", numUsers: this.state.Firebase_Beginner},
            { skill: "Java (Beginner)", numUsers: this.state.Java_Beginner},
            { skill: "Javascript (Beginner)", numUsers: this.state.Javascript_Beginner},
            { skill: "Python (Beginner)", numUsers: this.state.Python_Beginner},
            { skill: "C++ (Beginner)", numUsers: this.state.Cpp_Beginner},
            { skill: "C (Beginner)", numUsers: this.state.C_Beginner},
            { skill: "CSS (Beginner)", numUsers: this.state.CSS_Beginner},
            { skill: "Node.js (Beginner)", numUsers: this.state.Nodejs_Beginner}
        ]

        const intermediateData = [
            { skill: "React.js (Intermediate)", numUsers: this.state.Reactjs_Intermediate},      
            { skill: "Git/Github (Intermediate)", numUsers: this.state.GitGithub_Intermediate},
            { skill: "Firebase (Intermediate)", numUsers: this.state.Firebase_Intermediate},
            { skill: "Java (Intermediate)", numUsers: this.state.Java_Intermediate},
            { skill: "Javascript (Intermediate)", numUsers: this.state.Javascript_Intermediate},
            { skill: "Python (Intermediate)", numUsers: this.state.Python_Intermediate},         
            { skill: "C++ (Intermediate)", numUsers: this.state.Cpp_Intermediate},
            { skill: "C (Intermediate)", numUsers: this.state.C_Intermediate},
            { skill: "CSS (Intermediate)", numUsers: this.state.CSS_Intermediate},
            { skill: "Node.js (Intermediate)", numUsers: this.state.Nodejs_Intermediate}
        ]

        const advancedData = [
            { skill: "React.js (Advanced)", numUsers: this.state.Reactjs_Advanced}, 
            { skill: "Git/Github (Advanced)", numUsers: this.state.GitGithub_Advanced},
            { skill: "Firebase (Advanced)", numUsers: this.state.Firebase_Advanced},
            { skill: "Java (Advanced)", numUsers: this.state.Java_Advanced},
            { skill: "Javascript (Advanced)", numUsers: this.state.Javascript_Advanced},
            { skill: "Python (Advanced)", numUsers: this.state.Python_Advanced}, 
            { skill: "C++ (Advanced)", numUsers: this.state.Cpp_Advanced},
            { skill: "C (Advanced)", numUsers: this.state.C_Advanced},
            { skill: "CSS (Advanced)", numUsers: this.state.CSS_Advanced},
            { skill: "Node.js (Advanced)", numUsers: this.state.Nodejs_Advanced}
        ]

        return (
            <div>
                <TopBar person={this.props.person} updateField={this.props.updateField} status="home" user={this.props.user} />
                <h1 className="statsHeader">Developer Skill Statistics </h1>
                <VictoryChart height={400} width={900}
                    // domainPadding will add space to each side of VictoryBar to prevent it from overlapping the axis
                    domainPadding={20}
                    theme={VictoryTheme.material}>
                    <VictoryAxis
                        // tickValues specifies both the number of ticks and where
                        // they are placed on the axis
                        tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                        tickFormat={["React.js", "Git/Github", "Firebase", "Java", "JavaScript",
                        "Python", "C++", "C", "CSS", "Node.js"]}
                        fixLabelOverlap={true}
                        width={600}
                    />
                    <VictoryAxis
                        dependentAxis
                        height={300}
                        // tickFormat specifies how ticks should be displayed
                        
                    />
                    <VictoryStack
                        colorScale={["#2D9CDB", "#ccebff", "#99d6ff"]}
                    >
                    <VictoryBar
                        data={beginnerData}
                        x="skill"
                        y="numUsers"
                    />
                    <VictoryBar
                        data={intermediateData}
                        x="skill"
                        y="numUsers"
                    />
                    <VictoryBar
                        data={advancedData}
                        x="skill"
                        y="numUsers"
                    />
                    </VictoryStack>
                </VictoryChart>
                <VictoryLegend x={170} y={50}
                        title="Legend"
                        centerTitle
                        orientation="horizontal"
                        gutter={100}
                        style={{ border: { stroke: "black" }, 
                        title: {fontSize: 20 }}}
                        data={[
                        { name: "Beginner", symbol: { fill: "#2D9CDB" } },
                        { name: "Intermediate", symbol: { fill: "#ccebff" } },
                        { name: "Advanced", symbol: { fill: "#99d6ff" } }
                        ]}
                        height={400} width={900}/>
            </div>
        );
    }
}
