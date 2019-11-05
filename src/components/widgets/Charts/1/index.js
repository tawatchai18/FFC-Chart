import React from 'react'
// import { Select, Spin } from 'antd';
// import debounce from 'lodash/debounce';
import { AutoComplete } from 'antd';

// function onSelect(value) {
//   console.log('onSelect', value);
// }

// const { Option } = Select;

class Chart1 extends React.Component {
  state = {
    // value: '',
    dataSource: [],
  };

  componentDidMount() {
    fetch(`http://localhost:7000/convert`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          dataSource: json
        });
      })
  }

  render() {
    const { dataSource } = this.state;
    const name = dataSource.map(object => object.name);
    function Complete() {
      return (
        <AutoComplete
          style={{ width: 400 }}
          dataSource={name}
          placeholder="Search"
          filterOption={(inputValue, option) =>
            option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      );
    }
    return (
      <div style={{marginLeft:800}}>
        <Complete />
      </div>
    )
  }
}

export default Chart1
