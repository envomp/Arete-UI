
export const basicOptions = {
    maintainAspectRatio: false,
    legend: {
        display: false
    },
    responsive: true,
};


export let lineChartOptions = {
    ...basicOptions,
    tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
    },
    scales: {
        yAxes: [{
            barPercentage: 1.6,
            gridLines: {
                drawBorder: false,
                color: 'rgba(29,140,248,0.0)',
                zeroLineColor: "transparent",
            },
            ticks: {
                padding: 20,
                fontColor: "#9a9a9a"
            }
        }],

        xAxes: [{
            barPercentage: 1.6,
            gridLines: {
                drawBorder: false,
                color: 'rgba(225,78,202,0.1)',
                zeroLineColor: "transparent",
            },
            ticks: {
                padding: 20,
                fontColor: "#9a9a9a"
            }
        }]
    }
};

export let barChartOptions = {
    ...basicOptions,
    tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
    },
    scales: {
        yAxes: [{
            gridLines: {
                drawBorder: false,
                color: 'rgba(29,140,248,0.1)',
                zeroLineColor: "transparent",
            },
            ticks: {
                padding: 20,
                fontColor: "#9e9e9e"
            }
        }],
        xAxes: [{

            gridLines: {
                drawBorder: false,
                color: 'rgba(29,140,248,0.1)',
                zeroLineColor: "transparent",
            },
            ticks: {
                padding: 20,
                fontColor: "#9e9e9e"
            }
        }]
    }

};

export let invertedBarChartOptions = {
    ...basicOptions,
    tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
    },
    scales: {
        yAxes: [{
            gridLines: {
                drawBorder: false,
                color: 'rgba(29,140,248,0.1)',
                zeroLineColor: "transparent",
            },
            ticks: {
                padding: 20,
                fontColor: "#9e9e9e"
            }
        }],
        xAxes: [{
            gridLines: {
                drawBorder: false,
                color: 'rgba(29,140,248,0.1)',
                zeroLineColor: "transparent",
            },
            ticks: {
                padding: 20,
                fontColor: "#9e9e9e"
            }
        }]
    }

};