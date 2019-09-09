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
import { Button, AutoComplete } from 'antd';

class DeleteLog extends Component {
  state = {
  };
  handleDelete = log => {
    alert(log);
  };

  deleteLogButton = log => {
    return (
      <Button
        type="danger"
        ghost
        size="small"
        shape="round"
        onClick={() => {
          this.handleDelete(log);
        }}
      >
        Delete
      </Button>
    );
  };

  //   ============================== //

  //   handleChange = e => {
  //     this.setState({
  //       payment: [...this.state.payment, e],
  //     });
  //     e = '';
  //   };

  //   Complete = dataSource => {
  //     return (
  //       //      <select name="" id="">
  //       <AutoComplete
  //         onSelect={this.handleChange}
  //         style={{ width: 200 }}
  //         dataSource={dataSource}
  //         placeholder="try to type `b`"
  //         defaultValue="Anees"
  //         filterOption={(inputValue, option) => {
  //           return (
  //             option.props.children
  //               .toUpperCase()
  //               .indexOf(inputValue.toUpperCase()) !== -1
  //           );
  //         }}
  //       />
  //       //    </select>
  //     );
  //   };

  //   mapPayments = () => {
  //     return this.state.payment.length
  //       ? this.state.payment.map(pay => {
  //           return <div key={Math.random()}>{pay}</div>;
  //         })
  //       : null;
  //   };

  //  =========================== //
  render() {
    // const ;
    return (
      <div>
        {/* {this.Complete(this.state.dataSource)} */}
        {/* {this.mapPayments()} */}
        {this.deleteLogButton('Itni Jaldi bhi kia he delete krne ki??')}
      </div>
    );
  }
}

export default DeleteLog;
