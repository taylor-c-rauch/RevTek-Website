import React from 'react';
import ReactDom from 'react-dom';
import * as V from 'victory';
import TopBar from "./top-bar";
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';

const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 }
]

export default class Statistics extends React.Component {
    render() {

        return (
            <div>
                <TopBar status="home" />
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
                        x="quarter"
                        y="earnings"
                    />
                </VictoryChart>
            </div>
        )
    }
}