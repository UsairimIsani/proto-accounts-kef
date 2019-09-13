/* eslint-disable radix */
/* eslint-disable no-unused-expressions */
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
// eslint-disable react/prefer-stateless-function

import React from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import { Form, Input, Button, Select } from 'antd';
import Payments from './Payments';

class AddProjectLogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectTitle: this.props.projects[0].title,
      item: [],
      price: '100',
      shop: '',
      totalItems: 1,
    };
    // using ref for clearing the payment inputs in Payments component
    this.paymentsComponent = React.createRef();
  }

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

  // =================== handlers ===================== //

  handleItemChange = (e, index) => {
    const updatedItem = this.state.item;
    updatedItem[parseInt(index)] = e.target.value;
    this.setState({
      item: updatedItem,
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  comparePrice = (totalPrice, payments) => {
    let totalPayment = 0;
    payments.forEach(payment => {
      totalPayment += parseInt(payment.amount);
    });
    if (totalPayment !== totalPrice) {
      alert('Price and payments not match');
      return false;
    }
    return true;
  };

  handleSubmit = e => {
    e.preventDefault();
    const { projectTitle, item, price, shop, payments } = this.state;

    // checking if payment details are added
    if (
      payments.length &&
      this.comparePrice(parseInt(this.state.price), payments)
    ) {
      // log to redux store
      this.props.addLog(projectTitle, item, price, shop, this.state.payments);
      // reset inputs (and state)
      this.setState({
        item: [],
        price: '',
        shop: '',
        totalItems: 1,
        clearPayment: true,
      });
      // reset payment inputs using ref
      this.paymentsComponent.current.clearInputs();
    } else if (!payments.length) {
      alert('Please add payment details');
    }
  };

  // ================ item inputs handlers ===================== //

  handleTotalItems = e => {
    this.setState({
      totalItems: e.target.value,
    });
  };

  handleNumberOfItems = () => {
    let itemsInput = [];
    for (let i = 0; i < this.state.totalItems; i++) {
      const item = (
        <Input
          key={i}
          name="item"
          value={this.state.item[i]}
          onChange={e => {
            this.handleItemChange(e, i);
          }}
          allowClear
          required
        />
      );
      itemsInput = [...itemsInput, item];
    }
    return itemsInput;
  };

  // =============================== //

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
          <label>Number of Items</label>
          <Input
            type="number"
            required
            defaultValue="1"
            min="1"
            value={this.state.totalItems}
            onChange={this.handleTotalItems}
          />
          {/* Input for item names */}
          <label>Item Name</label>
          <div style={{ display: 'flex' }}> {this.handleNumberOfItems()}</div>
          {/* ================  */}

          <label>Total Price</label>
          <Input
            type="number"
            name="price"
            value={this.state.price}
            required
            onChange={this.handleChange}
            min={1}
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
          {/* payment component */}
          <label>Payments</label>
          <Payments
            handlePayments={this.handlePayments}
            ref={this.paymentsComponent}
            users={this.props.users}
          />
          {/* =============== */}

          <Button type="primary" htmlType="submit">
            Add Log
          </Button>
        </Form>
      </div>
    );
  }
}

// ==================================================== //

const mapStateToProps = state => {
  return {
    projects: state.global.projects,
    // users details to be passed to Payment component
    users: state.global.users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addLog: (projectTitle, item, price, shop, payments) => {
      dispatch({
        type: 'ADD_PROJECT_LOG',
        projectTitle,
        item,
        price,
        shop,
        payments,
      });
    },
  };
};

// ================================ //

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddProjectLogs);
