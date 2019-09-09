import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'antd';
import { Input } from 'antd';
import Select from './Select';
import DatePicker from './DatePicker';
import PickerSizes from './DatePicker';
import EstimatedCost from './Cost'

export default class ProjectForm extends Component {
  state = { visible: true};

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };



  render() {
    return (
      <div>
        <Modal
          title="Protodrop create project form"
          visible={this.state.visible}
          onOk={this.handleOk}
          okText="load project to PROTODROP database"
          onCancel={this.handleCancel}
          cancelText='x'
        >
          <Input placeholder="Enter Project Name" />
          <br />
          <Select />
          <PickerSizes/>
          <EstimatedCost/>
        </Modal>
      </div>
    );
  }
}

