// import React from 'react'
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import { Select } from 'antd';

// const { Option } = Select;


// class Chart3 extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       pyramid: [],
//       convert: [],
//     }
//   }

//   componentDidMount() {
//     fetch(`http://localhost:7000/pyramid/:orgId`)
//       .then(res => res.json())
//       .then(json => {
//         this.setState({
//           pyramid: json
//         });
//       })
//     fetch(`http://localhost:7000/convert`)
//       .then(res => res.json())
//       .then(json => {
//         this.setState({
//           convert: json
//         });
//       })
//   }

//   render() {
//     const { pyramid, convert } = this.state;
//     const age = pyramid.map(object => object.age);
//     const female = pyramid.map(object => object.female);
//     const male = pyramid.map(object => -Math.abs(object.male));
//     const name = convert.map(object => object.name);
//     const id = convert.map(object => object.id);
//     console.log(male, female, '=====');
//     console.log(pyramid, '098765432');
//     console.log(age, '------');
//     console.log(convert, 'orgId eee');
//     console.log(name, id, 'nameder');


//     const options = {
//       chart: {
//         type: 'bar',
//         // backgroundColor: '#FCFFC5',
//         backgroundImage: "url('resources/images/bg_pop.png')"
//         // backgroundImage: 'url(resources/images/bg_pop.png)'
//       },
//       colors: ['#008FFB', '#FF4560'],
//       title: {
//         text: 'ปิรามิดประชากร',
//       },
//       subtitle: {
//         text: ''
//       },
//       xAxis: [{
//         categories: age,
//         reversed: false,
//         labels: {
//           step: 1
//         }
//       }, { // อายุอีกฝั่ง
//         opposite: true,
//         reversed: false,
//         categories: age,

//         linkedTo: 0,
//         labels: {
//           step: 1
//         }
//       }],
//       yAxis: {
//         title: {
//           text: null
//         },
//         labels: {
//           formatter() {
//             return Math.abs(this.value);
//           }
//         },
//         // min: -100 *500,
//         // max: 100 *500,
//       },
//       plotOptions: {
//         series: {
//           stacking: 'normal',
//         }
//       },
//       tooltip: {
//         formatter() {
//           return `<b>${this.series.name}, ช่วงอายุ ${this.point.category}</b><br/>` +
//             `จำนวน:${Highcharts.numberFormat(Math.abs(this.point.y), 0)}`;
//         }
//       },
//       series: [
//         {
//           name: "ชาย",
//           data: male,
//           background: '#FCFFC5'
//         },
//         {
//           name: "หญิง",
//           data: female
//         }
//       ]
//     }
//     return (
//       <div className="position-relative">
//         <div className="card-body">
//           <div className="text-dark font-size-18 font-weight-bold mb-1">Population Pyramids</div>
//           {/* <div className="text-gray-6 mb-2">Revenue by location and date</div>
//           <div className="font-weight-bold font-size-36 text-dark">$437,246.00</div> */}
//         </div>
//         <div>
//           <Select defaultValue="name" style={{ width: 120 }}>
//             <Option value="disabled" disabled>Disabled</Option>
//             {/* <Option value="Yiminghe">yiminghe</Option>
//             <Option value="jack">Jack</Option> */}
//             <Option value="name">{name}</Option>
//           </Select>
//         </div>
//         <HighchartsReact highcharts={Highcharts} options={options} style={{ width: "100%", height: "400px" }} />
//       </div>
//     )
//   }
// }

// export default Chart3
