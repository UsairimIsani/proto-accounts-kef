import React, { Component } from 'react';
import { DatePicker, Radio } from 'antd';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
export default class PickerSizes extends React.Component {
    state = {
      size: 'small',
    };
  
    render() {
      const { size } = this.state;
      return (
        <div>
        <br />
          <DatePicker size={size} />
          <br />
          <MonthPicker size={size} placeholder="Select Month" />
          <br />
          <RangePicker size={size} />
          <p>*end date is time estimated by contributors to complete the project.</p>
        </div>
      );
    }
  }