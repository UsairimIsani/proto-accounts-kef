/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable object-curly-newline */
/* eslint-disable lines-between-class-members */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable indent */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable arrow-parens */
/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import { Form, Input, Button, Select } from 'antd';
import Payments from './Payments';

class AddProjectLogs extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  state = {
    projectTitle: 'first',
    item: '',
    price: '100',
    shop: '',
  };
  // ============================= //

  handlePayments = e => {
    this.setState({
      ...this.state,
      payments: e,
    });
  };
  // ============================= //

  selectProjectList = () => {
    const { projects } = this.props;
    return projects.length ? (
      projects.map(project => {
        return (
          <Select.Option key={project.id} value={project.title}>
            {project.title}
          </Select.Option>
        );
      })
    ) : (
      <Select.Option key="no-projects" disabled>
        no projects!
      </Select.Option>
    );
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { projectTitle, item, price, shop } = this.state;
    //   this.state.payments.length ?(
    // ):(alert('Empty Payments'))
    this.props.addLog(projectTitle, item, price, shop, this.state.payments);

    // clear inputs (and state)
    this.setState({
      projectTitle: '',
      item: '',
      price: '',
      shop: '',
    });
  };

  render() {
    const projectList = this.selectProjectList();
    return (
      <div className="feature-page">
        <Form onSubmit={this.handleSubmit}>
          <label>Project Title</label>
          <Select
            value={this.state.projectTitle}
            placeholder="select a project"
            onChange={e => {
              this.setState({
                projectTitle: e,
              });
            }}
          >
            {projectList}
          </Select>
          <label>Item Name</label>
          <Input
            name="item"
            value={this.state.item}
            onChange={this.handleChange}
            allowClear
            required
          />
          <label>Price</label>
          <Input
            type="number"
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
            min={1}
            style={{ width: '100%' }}
          />
          <label>Shop name</label>
          <Input
            name="shop"
            onChange={this.handleChange}
            value={this.state.shop}
            allowClear
            required
            placeholder="eg: general electronics"
          />
          <label>Payments</label>
          <Payments handlePayments={this.handlePayments} />
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.global.projects,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addLog: (projectTitle, item, price, shop, payments) => {
      dispatch({
        type: 'PROJECT_LOG',
        projectTitle,
        item,
        price,
        shop,
        payments,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddProjectLogs);
