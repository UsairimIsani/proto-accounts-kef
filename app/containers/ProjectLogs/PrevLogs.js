/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prefer-template */
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
import { connect } from 'react-redux';

import { Modal } from 'antd';

import IndividualLog from './IndividualLog';

class PrevLogs extends Component {
  state = {
    logVisible: false,
  };

  changeLogVisibility = () => {
    this.setState({
      logVisible: !this.state.logVisible,
    });
  };

  render() {
    const prevLogs = this.state.logVisible ? (
      <Modal visible onCancel={this.changeLogVisibility}>
        <h2>Edited Log</h2>
        {this.props.prevLogs.map((log, index) => {
          return (
            <div key={index}>
              <IndividualLog
                editable={false}
                log={log}
                projectTitle={this.props.projectTitle}
              />
              <hr />
              <hr />
              <hr />
            </div>
          );
        })}
      </Modal>
    ) : (
      <div>
        <a onClick={this.changeLogVisibility}>show history...</a>
      </div>
    );
    return <div>{this.props.prevLogs.length ? prevLogs : null}</div>;
  }
}

// ========================= //

const mapStateToProps = state => {
  return {
    prevLog: state.global,
  };
};

export default connect(mapStateToProps)(PrevLogs);
