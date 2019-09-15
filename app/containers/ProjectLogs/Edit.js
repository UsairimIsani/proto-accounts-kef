/* eslint-disable radix */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
/* eslint-disable no-else-return */
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

import React, { Component } from 'react';
import { Button, Form, Input, Modal } from 'antd';

import { connect } from 'react-redux';

import Payments from './Payments';

class EditLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      enableEdit: false,
      item: this.props.log.item,
      shop: this.props.log.shop,
      payments: [],
      price: this.props.log.price,
    };
    this.baseState = this.state;

    this.paymentsComponent = React.createRef();
  }

  // ================= handlers =================== //

  handleEdit = () => {
    this.setState({
      enableEdit: true,
      modalVisible: true,
    });
  };

  handleCancel = () => {
    this.setState({ modalVisible: false, enableEdit: false });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    // checking if payment details are added
    const { item, price, shop, payments } = this.state;
    if (
      payments.length &&
      this.comparePrice(parseInt(this.state.price), payments)
    ) {
      const log = { item, price, shop, payments, id: this.props.log.id };
      this.props.editLog(this.props.projectTitle, log);

      // clear inputs
      this.setState(this.baseState);

      // hide Modal box
      this.handleCancel();

      this.paymentsComponent.current.clearInputs();
    } else if (!payments.length) {
      alert('Please add payment details');
    }
  };

  handlePayments = e => {
    this.setState({
      ...this.state,
      payments: e,
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

  // ==================================== //

  showEditForm = () => {
    return (
      <Form onSubmit={this.handleSubmit}>
        <label>Project</label>
        <Input
          type="text"
          name="projectTitle"
          value={this.props.projectTitle}
          disabled
        />
        <label> Item name</label>
        {this.state.item.map((item, index) => {
          return (
            <Input
              key={index}
              type="text"
              name="item"
              value={this.state.item[index]}
              onChange={e => {
                const editedItem = this.state.item.filter(item => {
                  return true;
                });
                editedItem[index] = e.target.value;
                this.setState({
                  item: editedItem,
                });
              }}
              required
            />
          );
        })}
        <label>Price</label>
        <Input
          type="number"
          min="0"
          name="price"
          value={this.state.price}
          onChange={this.handleChange}
          required
        />
        <label> Shop Name</label>
        <Input
          type="text"
          name="shop"
          value={this.state.shop}
          onChange={this.handleChange}
          required
        />
        <label>Payments</label>
        <Payments
          handlePayments={this.handlePayments}
          ref={this.paymentsComponent}
          users={this.props.users}
        />
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    );
  };

  // ============================ //

  render() {
    const editComponent = !this.state.enableEdit ? (
      <Button
        style={{ padding: '0 25%' }}
        type="primary"
        size="small"
        ghost
        onClick={this.handleEdit}
      >
        Edit
      </Button>
    ) : (
      <Modal
        title="Edit"
        onCancel={this.handleCancel}
        visible={this.state.modalVisible}
      >
        {this.showEditForm()}
      </Modal>
    );
    return <div>{editComponent}</div>;
  }
}

// ========================== //

const mapStateToProps = state => {
  return {
    projects: state.global.projects,
    users: state.global.users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editLog: (projectTitle, log) => {
      dispatch({
        type: 'EDIT_LOG',
        log,
        projectTitle,
      });
    },
  };
};

// ============================== //

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditLog);
