import React from 'react'
import { Helmet } from 'react-helmet'
import Chart6 from 'components/widgets/Charts/6'
import Chart4 from 'components/widgets/Charts/4'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { AutoComplete, Button } from 'antd';

class DashboardAnalytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      pyramid01: [],
      hospital: '',
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
        console.log(json, 'pyramid===');

      })
  }

  onChange() {
    fetch(`http://localhost:7000/pyramid`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          pyramid01: json,
        });
        console.log(json, '====010101');
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
            pyramid01: json,
            hospital: value
          });
          console.log(json, '====');
        })
    }
  }

  render() {
    const { pyramid01, dataSource, hospital } = this.state;
    const name = dataSource.map(object => object.name);
    const age = pyramid01.map(object => object.age);
    const countnull = pyramid01.map(object => object.countelse);
    const countall = pyramid01.map(object => object.countresult);
    const countw = pyramid01.map(object => object.countfemale);
    const countm = pyramid01.map(object => object.countmale);
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
          // placeholder="หน่วยงาน"
          placeholder={hospital}
          filterOption={(inputValue, option) =>
            option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      );
    }
    // กราฟ ปิรามิด
    Highcharts.setOptions({
      lang: {
        thousandsSep: ','
      }
    });
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
        text: null
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
      lang: {
        thousandsSep: ','
      },
      tooltip: {
        formatter() {
          return `<b>${this.series.name}, ช่วงอายุ ${this.point.category}</b><br/>` +
            `จำนวน:${Highcharts.numberFormat(Math.abs(this.point.y), 0)}`;
        }
      },
      series: [
        {
          name: "ชาย",
          data: male,
        },
        {
          name: "หญิง",
          data: female
        }
      ]
    }
    return (
      <div>
        <Helmet title="Dashboard: Analytics" />
        <div className="row">
          <div className="col-lg-4">
            {hospital}
          </div>
          {/* <div className="col-lg-4">
            <Complete />
          </div> */}
          <div className="col-lg-8">
            <Complete />&nbsp; &nbsp; &nbsp;
            <Button onClick={onSubmit}>หน่วยงานทั้งหมด</Button>
          </div>
        </div>
        <div className="col-xl-12">
          <br />
          <br />
          <br />
          <div className="card">
            <div className="card-body">
              <HighchartsReact highcharts={Highcharts} options={options1} style={{ width: "100%", height: "400px" }} />
              <div className="d-flex flex-wrap">
                <div className="mr-5 mb-2">
                  <div className="text-nowrap text-uppercase text-gray-4">
                    <div className="air__utils__donut air__utils__donut" style={{ borderColor: '#008ffb' }} />
                    ชาย
                  </div>
                  <div className="font-weight-bold font-size-18 text-dark">{countm}</div>
                </div>
                <div className="mr-5 mb-2">
                  <div className="text-nowrap text-uppercase text-gray-4">
                    <div className="air__utils__donut air__utils__donut--danger" />
                    หญิง
                  </div>
                  <div className="font-weight-bold font-size-18 text-dark">{countw}</div>
                </div>
                <div className="mr-5 mb-2">
                  <div className="text-nowrap text-uppercase text-gray-4">
                    <div className="air__utils__donut air__utils__donut--secondary" />
                    ไม่ระบุเพศ
                  </div>
                  <div className="font-weight-bold font-size-18 text-dark">{countnull}</div>
                </div>
                <div className="mr-5 mb-2">
                  <div className="text-nowrap text-uppercase text-gray-4">
                    <div className="air__utils__donut air__utils__donut--success" />
                    ประชากรทั้งหมด
                  </div>
                  <div className="font-weight-bold font-size-18 text-dark">{countall}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col-xl-6 col-lg-6">
            <h5 className="text-dark mb-4">อัตราส่วนผู้สูงอายุ</h5>
            <div className="card">
              <Chart6 />
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <h5 className="text-dark mb-4">อัตราส่วนผู้สูงอายุ</h5>
            <div className="card">
              <Chart4 />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DashboardAnalytics
