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
import { Select } from 'antd';
import './style.scss';

import DeleteLog from './DeleteLog';
import EditLog from './EditLog';

class AllLogs extends Component {
  state = {
    projectTitle: '',
  };

  //   ============= Filter button ============= //

  handleProjectFilter = e => {
    this.setState({
      projectTitle: e,
    });
  };

  projectFilterButton = () => {
    return this.props.projects.map(project => {
      return (
        <Select.Option key={project.id} value={project.title}>
          {project.title}
        </Select.Option>
      );
    });
  };

  //   =============== Logs ============= //

  handleEachLog = project => {
    const logArray = project.logs;
    if (logArray.length) {
      return logArray.map(log => {
        return (
          <div key={log.id} className="border">
            Items:
            {log.item.map((item, i) => {
              return <span key={i}> {item} , </span>;
            })}
            <br />
            Total Price: {log.price}
            <br />
            Shop: {log.shop}
            <br />
            last modified:{' '}
            <span>
              {log.date.toDateString()} at: {log.date.toLocaleTimeString()}
            </span>
            {log.payments ? (
              log.payments.map(payer => {
                return (
                  <div key={Math.random()}>
                    {payer.name} payed Rs
                    {payer.amount}
                  </div>
                );
              })
            ) : (
              <div style={{ color: 'red' }}>No payments!</div>
            )}
            <br />
            {/* props passed in order to delete them */}
            <DeleteLog logId={log.id} projectTitle={project.title} />
            <br />
            <EditLog logId={log.id} projectTitle={project.title} />
            <br />
            logged by: {log.username}
          </div>
        );
      });
    } else {
      return <h3>No logs !</h3>;
    }
  };

  handleLogs = project => {
    return (
      <div key={project.id} className="projectLogs">
        <strong>{project.title}</strong>
        {this.handleEachLog(project)}
      </div>
    );
  };

  mapProjectLogs = () => {
    if (this.state.projectTitle === 'all') {
      return this.props.projects.map(project => {
        return this.handleLogs(project);
      });
    } else if (this.state.projectTitle === '') {
      return <h2>Please select a project</h2>;
    } else {
      return this.props.projects.map(project => {
        if (this.state.projectTitle === project.title) {
          return this.handleLogs(project);
        }
      });
    }
  };

  //  ================================ //

  render() {
    return (
      <div className="main">
        {/* ============ filter button ========= */}
        <div className="top-right">
          <Select
            placeholder="Select a project"
            onChange={this.handleProjectFilter}
            style={{ width: '30%' }}
          >
            <Select.Option value="all">All</Select.Option>
            {this.projectFilterButton()}
          </Select>
        </div>
        {/* ====================  */}
        <div className="logs-box"> {this.mapProjectLogs()}</div>
      </div>
    );
  }
}

// =========== Redux =========== //

const mapStateToProps = state => {
  return {
    projects: state.global.projects,
  };
};

const areStatesEqual = (prevState, newState) => {
  const result =
    prevState.global.projects[0].logs === newState.global.projects[0].logs;
  return result;
};

export default connect(
  mapStateToProps,
  null,
  null,
  { areStatesEqual },
)(AllLogs);
