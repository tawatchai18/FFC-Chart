
import React, { Component } from "react";
import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";

import PieChart from "highcharts-react-official";

class Chart4 extends Component {
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
        text: 'อัตราส่วนผู้สูงอายุ'
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
          name: 'ติดบ้าน',
          y: 61.41,
          sliced: true,
          selected: true
        },
        { name: 'ติดเตียง', y: 10.85 },
        { name: 'ติดสังคม', y: 4.67 },
        { name: 'ยังไม่ประเมิน', y: 4.18 },
        ]
      }]

      // chart: {
      //   plotBackgroundColor: null,
      //   plotBorderWidth: null,
      //   plotShadow: false,
      //   type: 'pie'
      // },
      // title: {
      //   text: 'อัตราส่วนผู้สูงอายุ'
      // },
      // tooltip: {
      //   pointFormat: '{series.name}: <b>{point.percentage:.1f}</b>'
      // },
      // plotOptions: {
      //   pie: {
      //     allowPointSelect: true,
      //     cursor: 'pointer',
      //     dataLabels: {
      //       enabled: true,
      //       format: '<b>{point.name}</b>: {point.percentage:.1f} ',
      //       connectorColor: 'silver'
      //     }
      //   }
      // },
      // series: [{
      //   name: 'จำนวน',
      //   data: [
      //     // { name: name, y: 61.41 },
      //     { name: 'ติดบ้าน', y: 11.84 },
      //     { name: 'ติดเตียง', y: 10.85 },
      //     { name: 'ติดสังคม', y: 4.67 },
      //     { name: 'ยังไม่ประเมิน', y: 4.18 },
      //   ]
      // }]
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

export default Chart4