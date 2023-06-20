import * as am5 from'@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as React from 'react';

export const testdata = [
    {
        resource:"CPU",
        maxValue: 2650,
        currentValue: 1537
    },
    {
        resource:"Memory",
        maxValue: 24538,
        currentValue: 11025
    },
    {
        resource:"Block Storage",
        maxValue: 122720,
        currentValue: 30680
    },
    {
        resource:"NAS",
        maxValue: 29125,
        currentValue: 14521
    },
];

interface DivNm {
    divNm: string
}

const StackedColumnChart:React.FC<DivNm> = ({divNm}) => {  

    React.useLayoutEffect(() => {
        am5.addLicense("AM5C360990579")

        let StackedColumnChartroot = am5.Root.new(divNm)

        StackedColumnChartroot.setThemes([am5themes_Animated.new(StackedColumnChartroot)]);

        let chart = StackedColumnChartroot.container.children.push(am5xy.XYChart.new(StackedColumnChartroot, {
            paddingLeft: 0,
            paddingRight: 0,
            paddingBottom: 0,
        }));
        chart.gridContainer.set("opacity", 0)

        let xRenderer = am5xy.AxisRendererX.new(StackedColumnChartroot, { minGridDistance: 30, opposite: true,});
        xRenderer.labels.template.setAll({paddingBottom: 20, fill: am5.color(0x737373), scale:0.85})

        let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(StackedColumnChartroot, {
            categoryField: "resource",
            renderer: xRenderer,
            paddingBottom: 0,
        }))

        xAxis.data.setAll(testdata);

        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(StackedColumnChartroot, {
            min: 0,
            max: 100,
            numberFormat: "#'%'",
            strictMinMax: true,
            calculateTotals: true, 
            renderer: am5xy.AxisRendererY.new(StackedColumnChartroot, {inside:true}),
            opacity: 0, 
        }))


        let currentSeries = chart.series.push(am5xy.ColumnSeries.new(StackedColumnChartroot, {
            stacked: true,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "currentValue",
            valueYShow: "valueYTotalPercent",
            categoryXField: "resource",
            fill: am5.color(0xf0c52c)
        }))

        currentSeries.data.setAll(testdata)

        currentSeries.appear(1000);

        currentSeries.bullets.push(function () {
                return am5.Bullet.new(StackedColumnChartroot, {
                    sprite: am5.Label.new(StackedColumnChartroot, {
                            
                            text: "{valueY}",
                            centerX: am5.p50,
                            centerY: am5.p50, 
                            populateText: true
                        }
                    )
                })
            })
        

        let substractSeries = chart.series.push(am5xy.ColumnSeries.new(StackedColumnChartroot, {
            stacked: true,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "substractValue",
            valueYShow: "valueYTotalPercent",
            categoryXField: "resource",
            fill: am5.color(0xe6e6e6)
        }))

        substractSeries.data.setAll(testdata)

        substractSeries.appear(1000);

        substractSeries.bullets.push(function () {
                return am5.Bullet.new(StackedColumnChartroot, {
                    sprite: am5.Label.new(StackedColumnChartroot, {
                            text: "{maxValue}",
                            centerX: am5.p50,
                            // centerY: am5.p100,
                            populateText: true,
                        }
                    )
                })
            })
    
        // makeSeries("MaxValue", "maxValue",0xe6e6e6 )
        

        chart.appear(1000, 100)

        return () => {
            StackedColumnChartroot.dispose();
        }
    }, [])

    return (
        <div id={divNm} style={{width: '100%', height: "300px"}}></div>
    )
}
export default StackedColumnChart
