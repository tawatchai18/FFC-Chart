import React from 'react'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { AutoComplete, Button } from 'antd';


class Chart7 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      pyramid01: []
    }
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    fetch(`http://localhost:7000/convert`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          dataSource: json
        });
      })
    fetch(`http://localhost:7000/pyramid`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          pyramid01: json
        });
      })
  }

  onChange() {
    fetch(`http://localhost:7000/pyramid`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          pyramid01: json
        });
        console.log(json, '====');
      })
  }

  handleValidSubmit(value) {
    const { dataSource } = this.state;
    const organization = dataSource.find((item) => {
      return item.name === value
    })
    if (organization !== undefined) {
      const idOption = organization.id
      console.log(idOption, 'ooooo');
      fetch(`http://localhost:7000/pyramid/${idOption}`)
        .then(res => res.json())
        .then(json => {
          this.setState({
            pyramid01: json
          });
          console.log(json, '====');
        })
    }
  }

  render() {
    const { pyramid01, dataSource } = this.state;
    const name = dataSource.map(object => object.name);
    const age = pyramid01.map(object => object.age);
    const female = pyramid01.map(object => object.female);
    const male = pyramid01.map(object => -Math.abs(object.male));
    const submit = this.handleValidSubmit;
    const onSubmit = this.onChange

    function Complete() {
      return (
        <AutoComplete
          style={{ width: 400 }}
          onChange={submit}
          dataSource={name}
          placeholder="เลือกหน่วยงาน"
          filterOption={(inputValue, option) =>
            option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      );
    }
    const options1 = {
      chart: {
        type: 'bar',
        backgroundImage: "url('resources/images/bg_pop.png')"
      },
      colors: ['#008FFB', '#FF4560'],
      title: {
        text: 'ปิรามิดประชากร',
      },
      subtitle: {
        text: ''
      },
      xAxis: [{
        categories: age,
        reversed: false,
        labels: {
          step: 1
        }
      }, { // อายุอีกฝั่ง
        opposite: true,
        reversed: false,
        categories: age,

        linkedTo: 0,
        labels: {
          step: 1
        }
      }],
      yAxis: {
        title: {
          text: null
        },
        labels: {
          formatter() {
            return Math.abs(this.value);
          }
        },
        // min: -100 *500,
        // max: 100 *500,
      },
      plotOptions: {
        series: {
          stacking: 'normal',
        }
      },
      tooltip: {
        formatter() {
          return `<b>${this.series.name}, ช่วงอายุ ${this.point.category}</b><br/>` +
            `จำนวน:${Highcharts.numberFormat(Math.abs(this.point.y).toFixed(3), 0)}`;
        }
      },
      series: [
        {
          name: "ชาย",
          data: male,
          background: '#FCFFC5'
        },
        {
          name: "หญิง",
          data: female
        }
      ]
    }
    return (
      <div className="position-relative">
        <div>
          <Complete />
          <Button>ค้นหา</Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button onClick={onSubmit}>หน่วยงานทั้งหมด</Button>
        </div>
        <HighchartsReact highcharts={Highcharts} options={options1} style={{ width: "100%", height: "400px" }} />
      </div>
    )
  }
}

export default Chart7
