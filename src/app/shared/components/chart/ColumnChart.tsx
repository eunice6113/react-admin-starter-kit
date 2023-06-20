import * as am5 from'@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as React from 'react';

export const testdata = [
    {
        price:"5월",
        value: 200
    },
    {
        price:"6월",
        value: 120
    },
    {
        price:"7월",
        value: 150
    },
    {
        price:"8월",
        value: 190
    },
    {
        price:"9월",
        value: 360
    },
    {
        price:"10월",
        value: 350
    }
];

interface DivNm {
    divNm: string
}

const ColumnChart:React.FC<DivNm> = ({divNm}) => {
    React.useLayoutEffect(() => {
        am5.addLicense("AM5C360990579")
        
        let ColumnChartroot = am5.Root.new(divNm)

        ColumnChartroot.setThemes([am5themes_Animated.new(ColumnChartroot)]);

        let chart = ColumnChartroot.container.children.push(am5xy.XYChart.new(ColumnChartroot, {
            panY: false,
            paddingLeft: 0,
            paddingRight: 0,
        }));
        chart.gridContainer.set("opacity", 0)


       let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(ColumnChartroot, {
            renderer: am5xy.AxisRendererY.new(ColumnChartroot, {inside:true}),
            opacity: 0,
       }))

       let xRenderer = am5xy.AxisRendererX.new(ColumnChartroot,
        {   minGridDistance: 30,
            stroke: am5.color(0x737373),
            strokeOpacity: 1,
        });
        xRenderer.labels.template.setAll({paddingTop: 15, fill: am5.color(0x737373)})

       let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(ColumnChartroot, {
            renderer: xRenderer,
            categoryField: "price",
            marginBottom: -10,
            opacity: 1,
            marginTop: 3,
            bullet: function(root, axis, dataItem ) {
                return am5xy.AxisBullet.new(root, {
                    location: 0.5,
                    sprite: am5.Line.new(root, {
                        draw: function(display) {
                            display.moveTo(0,0)
                            display.lineTo(0, 10)
                        },
                        stroke: am5.color(0x737373),
                    })
                })
            },
       }))
       xAxis.data.setAll(testdata)

       let series = chart.series.push(am5xy.ColumnSeries.new(ColumnChartroot, {
            name: "비용현황",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            categoryXField: "price",
            fill: am5.color(0x79d87b),
       }))
       series.columns.template.setAll({width: 30, cornerRadiusTL:2, cornerRadiusTR:2})
       series.columns.template.setAll({tooltipText: "{categoryX}: {valueY}만원", tooltipY: 0, strokeOpacity: 0.7})
       series.data.setAll(testdata)

       series.appear(1000)

        return () => {
            ColumnChartroot.dispose();
        }

    }, []);

    return (
        <div id={divNm} style={{width: '100%', height: "224px"}}></div>
    )
}
export default ColumnChart
