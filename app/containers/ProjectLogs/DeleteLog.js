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
  // state = {};

  handleDelete = () => {
    let currentLog = this.props.projects.find(proj => {
      return this.props.project.title === proj.title;
    });
    currentLog = currentLog.logs.filter(log => {
      return log.id !== this.props.logId;
    });
    this.props.deleteLog(currentLog, this.props.project.title);
  };

  render() {
    return (
      <div>
        <Button
          type="danger"
          ghost
          size="small"
          shape="round"
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

const mapStateToProps = state => {
  return {
    projects: state.global.projects,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteLog: (updatedLogs, projectTitle) => {
      dispatch({
        type: 'DELETE_LOG',
        updatedLogs,
        projectTitle,
      });
    },
  };
};

// ========================== //

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteLog);
