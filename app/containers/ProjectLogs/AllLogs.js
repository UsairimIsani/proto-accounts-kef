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

  handleEachLog = logArray => {
    if (logArray.length) {
      return logArray.map(log => {
        return (
          <div key={log.id} style={{ 'border-bottom': '0.2px black double' }}>
            Item: {log.item}
            <br />
            Price: {log.price}
            <br />
            Shop: {log.shop}
            <br />
            On: {log.date.toDateString()}
            <br />
            at: {log.date.toLocaleTimeString()}
            <br />
            by: {log.username}
          </div>
        );
      });
    } else {
      return <h3>No logs !</h3>;
    }
  };

  handleLogs = project => {
    return (
      <div
        key={project.id}
        style={{
          color: 'black',
          'border-bottom': '1px black double',
        }}
      >
        <strong style={{ 'font-size': '150%' }}>{project.title}</strong>
        {this.handleEachLog(project.logs)}
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
        {/* filter button */}
        <div>
          <Select
            placeholder="Select a project"
            onChange={this.handleProjectFilter}
            style={{ width: '50%' }}
          >
            <Select.Option value="all">All</Select.Option>
            {this.projectFilterButton()}
          </Select>
        </div>
        {/* filter button */}

        <div style={{ width: '70%' }}> {this.mapProjectLogs()}</div>
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

export default connect(mapStateToProps)(AllLogs);
