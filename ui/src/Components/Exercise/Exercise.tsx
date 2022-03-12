import React, {Component} from 'react';
import Chart from "react-apexcharts";
import {api_urls} from '../../Api_urls'

interface MyProps {
}
interface MyStates {
    exercises: any,
    modalTitle: string,
    ExerciseId: number,
    ExerciseName: string,
    ExerciseIdFilter: string,
    ExerciseNameFilter: string,
    exercisesWithoutFilter: [],
    options: any,
    series: any,
}

export class Exercise extends Component<MyProps, MyStates> {

    constructor(props: any) {
        super(props);
        this.state={
            exercises: [],
            modalTitle: "",
            ExerciseId: 0,
            ExerciseName: "",

            ExerciseIdFilter: "",
            ExerciseNameFilter: "",
            exercisesWithoutFilter: [],

            // y color strength values are taken relative to each other
            series: [{
                name: 'Sun',
                data: this.generateData(52)
            },
            {
                name: 'Mon',
                data: this.generateData(52)
            },
            {
                name: 'Tue',
                data: this.generateData(52)
            },
            {
                name: 'Wed',
                data: this.generateData(52)
            },
            {
                name: 'Thu',
                data: this.generateData(52)
            },
            {
                name: 'Fri',
                data: this.generateData(52)
            },
            {
                name: 'Sat',
                data: this.generateData(52)
            }],
            options: {
                yaxis: {
                    labels: {
                        offsetX: 5,
                    },
                },
                xaxis: {
                    labels: {
                        offsetY: -5,
                    },
                    title: {
                        text: 'Week no.',
                        offsetX: 0,
                        offsetY: -15,
                        style: {
                            color: undefined,
                            fontSize: '12px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 700,
                            cssClass: 'apexcharts-xaxis-title',
                        },
                    },
                    tooltip: {
                        enabled: false,
                    },
                },
                plotOptions: {
                    heatmap: {
                        radius: 6,
                    }
                },
                chart: {
                    type: 'heatmap',
                    toolbar: {
                        show: false,
                    },
                    events: {
                        dataPointSelection: (event: any, chartContext: any, config: any) => {
                            //value: config.w.config.series[config.seriesIndex].data[config.dataPointIndex].y
                            // x-index: config.seriesIndex
                            // y-index: config.dataPointIndex
                        }
                    }

                },
                dataLabels: {
                    enabled: false
                },
                colors: ["#9A2625"],
            },
        }
    }

    generateData(numEntries: number) : any {
        var generatedData: any = [];
        for (var i = 1; i <= numEntries; i++) {
            generatedData.push(
                {
                    x: '' + i,
                    y: Math.floor(Math.random() * (10 - 0 + 1) + 0)
                }
            );
        }
        return generatedData;
    }

    refreshList() {
    }

    componentDidMount() {
        this.refreshList();
    }

    render() {
        return (
            <div>
                <div className="page-header">Exercise</div>
                <div className="page-section-header">Activity</div>
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="heatmap"
                    height={240}
                />
            </div>
        )
    }
}