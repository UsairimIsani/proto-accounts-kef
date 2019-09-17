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
import { Select, Input, Button } from 'antd';

class Payments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payments: [],
      protoGang: this.props.users,
    };
    this.protoGangCopy = this.props.users;
    this.baseState = this.state;
  }
  // ========================= //

  // this function is invoked in parent component using ref
  clearInputs = () => {
    // reseting stata after form submition
    this.setState(this.baseState);
  };

  // =============================================== //

  mapDatasource = () => {
    const { protoGang } = this.state;
    return protoGang.length
      ? protoGang.map(proto => {
          return (
            <Select.Option key={proto.username} value={proto.username}>
              {proto.name}
            </Select.Option>
          );
        })
      : null;
  };

  mapPayment = () => {
    const { payments } = this.state;
    return payments.length
      ? payments.map(payer => {
          return (
            <div key={payer.username}>
              <span> {payer.name}</span>
              <div>
                <Input
                  style={{ width: '90%' }}
                  required
                  value={payer.amount}
                  type="number"
                  name={payer.username}
                  onChange={this.handleIndividualPayment}
                />
                <Button
                  style={{ width: '10%' }}
                  type="danger"
                  onClick={() => {
                    this.handleDelete(payer.username);
                  }}
                >
                  x
                </Button>
              </div>
            </div>
          );
        })
      : null;
  };

  // ============= Data handlers ================== //

  handleDelete = username => {
    // find the user that is deleted
    let deletedPayer = this.state.payments.find(
      payer => payer.username === username,
    );
    // restore deleted user details to user array
    let restoreUser = this.protoGangCopy.find(
      db => deletedPayer.username === db.username,
    );

    this.setState({
      payments: this.state.payments.filter(
        payer => payer.username !== username,
      ),
      protoGang: [...this.state.protoGang, restoreUser],
    });
  };

  handleSelect = e => {
    const { protoGang, payments } = this.state;
    let newPayer = protoGang.find(db => {
      return db.username === e;
    });
    newPayer.amount = 0;

    this.setState({
      payments: [...payments, newPayer],
      protoGang: protoGang.filter(db => {
        return db.username !== e;
      }),
    });
    this.props.handlePayments(this.state.payments);
  };

  handleIndividualPayment = e => {
    const { payments } = this.state;
    const payer = payments.find(p => {
      return e.target.name === p.username;
    });
    payer.amount = e.target.value;
    const updatePayments = payments;
    updatePayments[payments.indexOf(payer)] = payer;
    this.setState({
      payments: updatePayments,
    });
    this.props.handlePayments(this.state.payments);
  };

  // ================================================== //

  render() {
    return (
      <div>
        <Select onSelect={this.handleSelect}>{this.mapDatasource()}</Select>
        {this.mapPayment()}
      </div>
    );
  }
}

// ================================= //

export default Payments;
