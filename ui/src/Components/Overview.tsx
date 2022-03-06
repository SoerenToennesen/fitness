import React, {Component} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "../Containers/css/Overview.css"

interface MyProps {
}
interface MyStates {
    chartData: any,
}

export class Overview extends Component<MyProps, MyStates>  {
    constructor(props: any) {
        super(props);
        this.state={
            chartData: [
                {
                  name: 'Page A',
                  activeUser: 4000,
                  activeUserAvg: 2400,
                },
                {
                  name: 'Page B',
                  activeUser: 3000,
                  activeUserAvg: 1398,
                },
                {
                  name: 'Page C',
                  activeUser: 2000,
                  activeUserAvg: 9800,
                },
                {
                  name: 'Page D',
                  activeUser: 2780,
                  activeUserAvg: 3908,
                },
                {
                  name: 'Page E',
                  activeUser: 1890,
                  activeUserAvg: 4800,
                },
                {
                  name: 'Page F',
                  activeUser: 2390,
                  activeUserAvg: 3800,
                },
                {
                  name: 'Page G',
                  activeUser: 3490,
                  activeUserAvg: 4300,
                },
            ],
        }
    }

    FeaturedInfo = () => {
        return (
            <div className="featured">
                <div className="featured-item">
                    <span className="featuredTitle">
                        Reveneu
                    </span>
                    <div className="featured-money-container">
                        <span className="featured-money">
                            $3,415
                        </span>
                        <span className="featured-money-rate">
                            -11.4
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                            </svg>
                        </span>
                    </div>
                    <span className="featured-sub">
                        Compared to last month
                    </span>
                </div>
                <div className="featured-item">
                    <span className="featured-title">
                        Sales
                    </span>
                    <div className="featured-money-container">
                        <span className="featured-money">
                            $1,234
                        </span>
                        <span className="featured-money-rate">
                            5.4
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                            </svg>
                        </span>
                    </div>
                    <span className="featured-sub">
                        Compared to last month
                    </span>
                </div>
                <div className="featured-item">
                    <span className="featured-title">
                        Cost
                    </span>
                    <div className="featured-money-container">
                        <span className="featured-money">
                            $54
                        </span>
                        <span className="featured-money-rate">
                            -23
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                            </svg>
                        </span>
                    </div>
                    <span className="featured-sub">
                        Compared to last month
                    </span>
                </div>
            </div>
        );
    }

    Chart = () => {
        return (
            <div className="chart">
                <h3 className="chart-title">
                    User analytics 
                </h3>
                <ResponsiveContainer width="100%" aspect={4 / 1}>
                    <LineChart data={this.state.chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" stroke="black" />
                        <YAxis stroke="black" />
                        <Line type="monotone" dataKey="activeUser" stroke="red" />
                        <Line type="monotone" dataKey="activeUserAvg" stroke="green" />
                        <Tooltip />
                        <Legend />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    }


    render() {
        return (
            <div className="overview">
                <this.FeaturedInfo />
                <this.Chart />
            </div>
        )
    }
}