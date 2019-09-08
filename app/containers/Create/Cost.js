import React, { Component } from 'react';
import { Slider } from 'antd';
import { Radio } from 'antd';

export default class EstimatedCost extends Component {
    state = {  value: 1,
    }
    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
        });
      };
    render() { 
        return ( 
        <div>
            <br />
            <p>*set an estimated amount for project</p>
        <Slider defaultValue={10} />
        <Radio.Group onChange={this.onChange} value={this.state.value}>
            <p>*choose amount unit.</p>
        <Radio value={1}>Hundred</Radio>
        <Radio value={2}>Thousand</Radio>
        <Radio value={3}>Million</Radio>
        <Radio value={4}>Billion</Radio>
        </Radio.Group>
        </div>
        );
    }
}