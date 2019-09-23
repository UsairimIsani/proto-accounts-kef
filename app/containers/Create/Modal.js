import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'antd';
import { Input } from 'antd';
import Select from './Select';
//import DatePicker from './DatePicker';
import PickerSizes from './DatePicker';
import { Tag, Tooltip, Icon } from 'antd';
import EstimatedCost from './Cost';
// import Moment from 'react-moment';
// import moment from 'moment';
import { connect } from 'react-redux';

class ProjectForm extends Component {
  state = {
    visible: true,
    costValue: '',
    tags: [],
    tagValue: '',
    inputValue: '',
    dateValue: [],
    costSlider: 25,
    // inputVisible: false,
    // inputValue: '',
  };

  onChangeCost = costValue => {
    this.setState({ costValue });
  };

  handleCostSlider = costSlider => {
    this.setState({ costSlider });
  };

  handleTagRemove = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });
  };

  handleTagChange = tagValue => this.setState({ tagValue });

  handleTagSubmit = () => {
    const { tagValue, tags } = this.state;
    if (tagValue && tags.indexOf(tagValue) === -1) {
      const newTags = [...tags, tagValue];
      this.setState({ tags: newTags, tagValue: '' });
    }
  };
  // MODAL FUNCTIONS
  // showModal = () => {
  //   this.setState({
  //     visible: true,
  //   });
  handleDateChange = dateValue => {
    this.setState({ dateValue });
    //console.log(dateValue[0].toString());
  };

  onValueChange = e => {
    //console.log(e.target.value);
    this.setState({ inputValue: e.target.value });
  };

  handleOk = e => {
    const { inputValue, tags, dateValue, costSlider, costValue } = this.state;
    this.props.Projects(inputValue, tags, dateValue, costSlider, costValue);
    this.handleCancel();
  };

  handleCancel = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleCancel}>Add another </Button>
        <form>
          <Modal
            title="Protodrop create project form"
            visible={this.state.visible}
            onOk={this.handleOk}
            okText="load project to PROTODROP database"
            onCancel={this.handleCancel}
            cancelText="X"
          >
            <Input
              placeholder="Enter Project Name"
              onChange={this.onValueChange}
            />
            <br />
            <Select
              handleTagRemove={this.handleTagRemove}
              tags={this.state.tags}
              tagValue={this.state.tagValue}
              handleTagChange={this.handleTagChange}
              handleTagSubmit={this.handleTagSubmit}
            />
            <PickerSizes
              dateValue={this.state.dateValue}
              handleDateChange={this.handleDateChange}
            />
            <EstimatedCost
              onChange={this.onChangeCost}
              value={this.state.costValue}
              costSlider={this.state.costSlider}
              handleCostSlider={this.handleCostSlider}
            />
          </Modal>
        </form>
      </div>
    );
  }
}

// const mapStateToProps = (state) =>{
//   return {
//     reduxState:state.global
//   }
// }
const mapDispatchToProps = dispatch => {
  return {
    Projects: (inputValue, tags, dateValue, costSlider, costValue) => {
      dispatch({
        type: 'PROJECT_INFO',
        inputValue,
        tags,
        dateValue,
        costSlider,
        costValue,
        //id,
      });
    },
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(ProjectForm);
