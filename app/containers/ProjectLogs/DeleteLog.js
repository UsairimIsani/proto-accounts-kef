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
import { Button } from 'antd';
import { connect } from 'react-redux';

class DeleteLog extends Component {
  handleDelete = () => {
    this.props.deleteLog(this.props.log.id, this.props.projectTitle);
  };

  render() {
    return (
      <div>
        <Button
          type="danger"
          ghost
          onClick={() => {
            this.handleDelete();
          }}
        >
          Delete
        </Button>
      </div>
    );
  }
}

// =============== Redux =============== //

const mapDispatchToProps = dispatch => {
  return {
    deleteLog: (id, projTitle) => {
      dispatch({
        type: 'DELETE_LOG',
        id,
        projTitle,
      });
    },
  };
};

// ========================== //

export default connect(
  null,
  mapDispatchToProps,
)(DeleteLog);
