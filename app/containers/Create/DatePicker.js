import React, { Component } from 'react';
import { DatePicker, Radio } from 'antd';

const { RangePicker } = DatePicker;
export default class PickerSizes extends React.Component {
  dateUpdate = (e) =>{
    this.props.handleDateChange(e);
  }
    render() {
      return (
        <div>
          <br />
          <RangePicker size= {"small"} onCalendarChange = {this.dateUpdate}/>
          <p>*end date is time estimated by contributors to complete the project.</p>
        </div>
      );
    }
  }
