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
            <div className="log-details">
              <div> Items:</div>
              <span>
                {log.item.map((item, i) => {
                  return <span key={i}> {item} , </span>;
                })}
              </span>
            </div>
            <hr />
            <div className="log-details">
              <div>Total Price:</div> <span>{log.price}</span>
            </div>
            <div className="log-details">
              <div> Shop:</div> <span> {log.shop}</span>
            </div>
            <hr />
            <div className="log-details">
              <div> last modified:</div>
              <span>
                {log.date.toDateString()} <br /> at:{' '}
                {log.date.toLocaleTimeString()}
              </span>
            </div>
            <hr />
            <div className="log-details">
              <div> Payments: </div>
              <span>
                {log.payments ? (
                  log.payments.map(payer => {
                    return (
                      <p key={Math.random()} style={{ margin: '0' }}>
                        {payer.name} payed Rs {payer.amount}
                      </p>
                    );
                  })
                ) : (
                  <div style={{ color: 'red' }}>No payments!</div>
                )}
              </span>
            </div>
            <hr />
            <div className="log-details">
              <div>Logged by:</div>
              <span>{log.username}</span>
            </div>
            <hr />
            {/* props passed in order to delete them */}
            <div style={{ display: 'flex' }}>
              <div style={{ width: '50%' }}>
                <DeleteLog log={log} projectTitle={project.title} />
              </div>
              <div style={{ width: '50%' }}>
                <EditLog log={log} projectTitle={project.title} />
              </div>
            </div>
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
        <h1 className="projectTitle">{project.title.toUpperCase()}</h1>
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
      <div>
        <div className="head">
          <h2> Proto Logs </h2>
          {/* ============ filter button ========= */}
          <Select
            className="selectTag"
            placeholder="Select a project"
            onChange={this.handleProjectFilter}
          >
            <Select.Option value="all">All</Select.Option>
            {this.projectFilterButton()}
          </Select>
        </div>
        <div className="main">
          {/* ====================  */}
          <div> {this.mapProjectLogs()}</div>
        </div>
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
