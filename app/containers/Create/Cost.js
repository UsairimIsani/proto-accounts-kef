import React, { Component } from 'react';
import { Slider } from 'antd';
import { Radio } from 'antd';

export default class EstimatedCost extends Component {
    // onChange = e => {
    //     console.log('radio checked', e.target.value);
    //     this.setState({
    //       value: e.target.value,
    //     });
    //   };
    handleChange = e =>{
        this.props.onChange(e.target.value);
       // console.log(e.target.value);
    };

    handleSliderChange = (e) =>{
        this.props.handleCostSlider(e);
    //    console.log(e);
    };
    render() { 
        return ( 
        <div>
            <br />
            <p>*set an estimated amount for project</p>
        <Slider defaultValue={this.props.costSlider} onChange ={this.handleSliderChange} />
        <Radio.Group onChange={this.handleChange} >
            <p>*choose amount unit.</p>
        <Radio value={'hundred'}>Hundred</Radio>
        <Radio value={'thousand'}>Thousand</Radio>
        <Radio value={'million'}>Million</Radio>
        <Radio value={'billion'}>Billion</Radio>
        </Radio.Group>
        </div>
        );
    }
}

