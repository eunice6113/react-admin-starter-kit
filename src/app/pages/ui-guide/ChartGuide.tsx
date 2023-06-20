import { Chart } from 'primereact';
import * as React from 'react';
import { BasePage } from '../../shared/components/base/BasePage';
import ClipboardCopy from '../../shared/components/clipboard-copy/ClipboardCopy';
import './ui-guide.css';

const ChartGuide: React.FC = () => {

    const [chartData] = React.useState({
        labels: ['A', 'B', 'C'],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: [
                    '#42A5F5',
                    '#66BB6A',
                    '#FFA726'
                ],
                hoverBackgroundColor: [
                    '#64B5F6',
                    '#81C784',
                    '#FFB74D'
                ]
            }
        ]
    });

    const [lightOptions] = React.useState({
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    });

    const [basicData] = React.useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: '#42A5F5',
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: 'My Second dataset',
                backgroundColor: '#FFA726',
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    });

    const [multiAxisData] = React.useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Dataset 1',
            backgroundColor: [
                '#EC407A',
                '#AB47BC',
                '#42A5F5',
                '#7E57C2',
                '#66BB6A',
                '#FFCA28',
                '#26A69A'
            ],
            yAxisID: 'y',
            data: [65, 59, 80, 81, 56, 55, 10]
        }, {
            label: 'Dataset 2',
            backgroundColor: '#78909C',
            yAxisID: 'y1',
            data: [28, 48, 40, 19, 86, 27, 90]
        }]
    });

    const [stackedData] = React.useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            type: 'bar',
            label: 'Dataset 1',
            backgroundColor: '#42A5F5',
            data: [65, 59, 80, 81, 56, 55, 40]
        }, {
            type: 'bar',
            label: 'Dataset 2',
            backgroundColor: '#66BB6A',
            data: [28, 48, 40, 19, 86, 27, 90]
        }, {
            type: 'bar',
            label: 'Dataset 3',
            backgroundColor: '#FFA726',
            data: [41,52,24,74,23,21,32]
        }]
    });

    const [lineStylesData] = React.useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                tension: .4,
                borderColor: '#42A5F5'
            },
            {
                label: 'Second Dataset',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderDash: [5, 5],
                tension: .4,
                borderColor: '#66BB6A'
            },
            {
                label: 'Third Dataset',
                data: [12, 51, 62, 33, 21, 62, 45],
                fill: true,
                borderColor: '#FFA726',
                tension: .4,
                backgroundColor: 'rgba(255,167,38,0.2)'
            }
        ]
    });

    const [radarChartData] = React.useState({
        labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: 'rgba(179,181,198,0.2)',
                borderColor: 'rgba(179,181,198,1)',
                pointBackgroundColor: 'rgba(179,181,198,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
                data: [65, 59, 90, 81, 56, 55, 40]
            },
            {
                label: 'My Second dataset',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                pointBackgroundColor: 'rgba(255,99,132,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255,99,132,1)',
                data: [28, 48, 40, 19, 96, 27, 100]
            }
        ]
    });

    const [combo] = React.useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            type: 'line',
            label: 'Dataset 1',
            borderColor: '#42A5F5',
            borderWidth: 2,
            fill: false,
            tension: .4,
            data: [50,25,12,48,56,76,42]
        }, {
            type: 'bar',
            label: 'Dataset 2',
            backgroundColor: '#66BB6A',
            data: [21,84,24,75,37,65,34],
            borderColor: 'white',
            borderWidth: 2
        }, {
            type: 'bar',
            label: 'Dataset 3',
            backgroundColor: '#FFA726',
            data: [41,52,24,74,23,21,32
            ]
        }]
    });

    const getLightTheme = () => {
        let basicOptions = {
            maintainAspectRatio: false,
            aspectRatio: .8,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057',
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        let horizontalOptions = {
            indexAxis: 'y',
            maintainAspectRatio: false,
            aspectRatio: .8,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057',
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        let stackedOptions = {
            maintainAspectRatio: false,
            aspectRatio: .8,
            plugins: {
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        let multiAxisOptions = {
            maintainAspectRatio: false,
            aspectRatio: .8,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                },
                tooltips: {
                    mode: 'index',
                    intersect: true
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        min: 0,
                        max: 100,
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: {
                        drawOnChartArea: false,
                        color: '#ebedef'
                    },
                    ticks: {
                        min: 0,
                        max: 100,
                        color: '#495057'
                    }
                }
            }
        };

        return {
            basicOptions,
            horizontalOptions,
            stackedOptions,
            multiAxisOptions
        }
    }

    const { basicOptions, horizontalOptions, multiAxisOptions, stackedOptions } = getLightTheme();


    return(
    <BasePage>
        <div className='previewBox'>
            <div className='card flex justify-content-center' style={{width:600}}>
                <h3>Pie</h3>
                <Chart type='pie' data={chartData} options={lightOptions} style={{ position: 'relative', width: '40%' }} />
                
                <h3>Doughnut</h3>
                <Chart type='doughnut' data={chartData} options={lightOptions} style={{ position: 'relative', width: '40%' }} />

                <h3>Vertical</h3>
                <Chart type='bar' data={basicData} options={basicOptions} />

                <h3>Horizontal</h3>
                <Chart type='bar' data={basicData} options={horizontalOptions} />

                <h3>Multi Axis</h3>
                <Chart type='bar' data={multiAxisData} options={multiAxisOptions} />

                <h3>Stacked</h3>
                <Chart type='bar' data={stackedData} options={stackedOptions} />

                <h3>Basic</h3>
                <Chart type='line' data={basicData} options={basicOptions} />

                <h3>Multi Axis</h3>
                <Chart type='line' data={multiAxisData} options={multiAxisOptions} />

                <h3>Line Styles</h3>
                <Chart type='line' data={lineStylesData} options={basicOptions} />

                <h3>PolarArea Chart</h3>
                <Chart type='polarArea' data={chartData} options={lightOptions} style={{ position: 'relative', width: '40%' }} />
                
                <h3>Radar Chart</h3>
                <Chart type='radar' data={radarChartData} options={lightOptions} style={{ position: 'relative', width: '40%' }} />

                <h3>Combo Chart</h3>
                <Chart type='bar' data={combo} options={lightOptions} />
            </div>
        </div>

        <ClipboardCopy rows={385} copyText={`
import { Chart } from 'primereact';
import * as React from 'react';
import { BasePage } from '../../shared/components/base/BasePage';

const ChartGuide: React.FC = () => {

    const [chartData] = React.useState({
        labels: ['A', 'B', 'C'],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: [
                    '#42A5F5',
                    '#66BB6A',
                    '#FFA726'
                ],
                hoverBackgroundColor: [
                    '#64B5F6',
                    '#81C784',
                    '#FFB74D'
                ]
            }
        ]
    });

    const [lightOptions] = React.useState({
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    });

    const [basicData] = React.useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: '#42A5F5',
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: 'My Second dataset',
                backgroundColor: '#FFA726',
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    });

    const [multiAxisData] = React.useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Dataset 1',
            backgroundColor: [
                '#EC407A',
                '#AB47BC',
                '#42A5F5',
                '#7E57C2',
                '#66BB6A',
                '#FFCA28',
                '#26A69A'
            ],
            yAxisID: 'y',
            data: [65, 59, 80, 81, 56, 55, 10]
        }, {
            label: 'Dataset 2',
            backgroundColor: '#78909C',
            yAxisID: 'y1',
            data: [28, 48, 40, 19, 86, 27, 90]
        }]
    });

    const [stackedData] = React.useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            type: 'bar',
            label: 'Dataset 1',
            backgroundColor: '#42A5F5',
            data: [65, 59, 80, 81, 56, 55, 40]
        }, {
            type: 'bar',
            label: 'Dataset 2',
            backgroundColor: '#66BB6A',
            data: [28, 48, 40, 19, 86, 27, 90]
        }, {
            type: 'bar',
            label: 'Dataset 3',
            backgroundColor: '#FFA726',
            data: [41,52,24,74,23,21,32]
        }]
    });

    const [lineStylesData] = React.useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                tension: .4,
                borderColor: '#42A5F5'
            },
            {
                label: 'Second Dataset',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderDash: [5, 5],
                tension: .4,
                borderColor: '#66BB6A'
            },
            {
                label: 'Third Dataset',
                data: [12, 51, 62, 33, 21, 62, 45],
                fill: true,
                borderColor: '#FFA726',
                tension: .4,
                backgroundColor: 'rgba(255,167,38,0.2)'
            }
        ]
    });

    const [radarChartData] = React.useState({
        labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: 'rgba(179,181,198,0.2)',
                borderColor: 'rgba(179,181,198,1)',
                pointBackgroundColor: 'rgba(179,181,198,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
                data: [65, 59, 90, 81, 56, 55, 40]
            },
            {
                label: 'My Second dataset',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                pointBackgroundColor: 'rgba(255,99,132,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255,99,132,1)',
                data: [28, 48, 40, 19, 96, 27, 100]
            }
        ]
    });

    const [combo] = React.useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            type: 'line',
            label: 'Dataset 1',
            borderColor: '#42A5F5',
            borderWidth: 2,
            fill: false,
            tension: .4,
            data: [50,25,12,48,56,76,42]
        }, {
            type: 'bar',
            label: 'Dataset 2',
            backgroundColor: '#66BB6A',
            data: [21,84,24,75,37,65,34],
            borderColor: 'white',
            borderWidth: 2
        }, {
            type: 'bar',
            label: 'Dataset 3',
            backgroundColor: '#FFA726',
            data: [41,52,24,74,23,21,32
            ]
        }]
    });

    const getLightTheme = () => {
        let basicOptions = {
            maintainAspectRatio: false,
            aspectRatio: .8,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057',
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        let horizontalOptions = {
            indexAxis: 'y',
            maintainAspectRatio: false,
            aspectRatio: .8,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057',
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        let stackedOptions = {
            maintainAspectRatio: false,
            aspectRatio: .8,
            plugins: {
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        let multiAxisOptions = {
            maintainAspectRatio: false,
            aspectRatio: .8,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                },
                tooltips: {
                    mode: 'index',
                    intersect: true
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        min: 0,
                        max: 100,
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: {
                        drawOnChartArea: false,
                        color: '#ebedef'
                    },
                    ticks: {
                        min: 0,
                        max: 100,
                        color: '#495057'
                    }
                }
            }
        };

        return {
            basicOptions,
            horizontalOptions,
            stackedOptions,
            multiAxisOptions
        }
    }

    const { basicOptions, horizontalOptions, multiAxisOptions, stackedOptions } = getLightTheme();


    return(
    <BasePage>
        <div className='card flex justify-content-center' style={{width:600}}>
            <h3>Pie</h3>
            <Chart type='pie' data={chartData} options={lightOptions} style={{ position: 'relative', width: '40%' }} />
            
            <h3>Doughnut</h3>
            <Chart type='doughnut' data={chartData} options={lightOptions} style={{ position: 'relative', width: '40%' }} />

            <h3>Vertical</h3>
            <Chart type='bar' data={basicData} options={basicOptions} />

            <h3>Horizontal</h3>
            <Chart type='bar' data={basicData} options={horizontalOptions} />

            <h3>Multi Axis</h3>
            <Chart type='bar' data={multiAxisData} options={multiAxisOptions} />

            <h3>Stacked</h3>
            <Chart type='bar' data={stackedData} options={stackedOptions} />

            <h3>Basic</h3>
            <Chart type='line' data={basicData} options={basicOptions} />

            <h3>Multi Axis</h3>
            <Chart type='line' data={multiAxisData} options={multiAxisOptions} />

            <h3>Line Styles</h3>
            <Chart type='line' data={lineStylesData} options={basicOptions} />

            <h3>PolarArea Chart</h3>
            <Chart type='polarArea' data={chartData} options={lightOptions} style={{ position: 'relative', width: '40%' }} />
            
            <h3>Radar Chart</h3>
            <Chart type='radar' data={radarChartData} options={lightOptions} style={{ position: 'relative', width: '40%' }} />

            <h3>Combo Chart</h3>
            <Chart type='bar' data={combo} options={lightOptions} />
        </div>
    </BasePage>)
}
export default ChartGuide
        `} />
    </BasePage>)
}
export default ChartGuide