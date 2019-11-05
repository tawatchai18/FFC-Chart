
import React, { Component } from "react";
import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";

import PieChart from "highcharts-react-official";

class Chart5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],

    }
  }

  componentDidMount() {
    fetch(`http://localhost:8081/ratold_pie`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          user: json
        });
      })
  }

  render() {
    const { user } = this.state;
    const name = user.map(object => object.name);
    // const count = user.map(object => object.count);

    console.log(user, name, 'lrjfk');
    const options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'รายงานสะสมโรค NCD'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
          name: 'โรคเบาหวาน',
          y: 31.41,
          sliced: true,
          selected: true
        },
        { name: 'โรคหลอดเลือดสมองและหัวใจ', y: 10.85 },
        { name: 'โรคถุงลมโป่งพอง', y: 4.67 },
        { name: 'โรคมะเร็ง', y: 15.18 },
        { name: 'โรคความดันโลหิตสูง', y: 8.18 },
        { name: 'โรคความอ้วนลงพุง', y: 10.18 },
        ]
      }]
    };

    return (
      <div>
        <center>
          <PieChart highcharts={Highcharts} options={options} />
        </center>
      </div>
    );
  }
}

export default Chart5