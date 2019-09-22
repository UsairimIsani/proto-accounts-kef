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

import { Descriptions } from 'antd';

import { Link } from 'react-router-dom';

import { Select, Modal } from 'antd';
import './style.scss';

import DeleteLog from './Delete';
import EditLog from './Edit';
import IndividualLog from './IndividualLog';
import PrevLogs from './PrevLogs';

class AllLogs extends Component {
  state = {
    projectTitle: '',
    showLogDetails: false,
    showDeletedLogs: false,
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

  // ======================================= //

  changeLogDeleteVisibility = () => {
    this.setState({
      showDeletedLogs: !this.state.showDeletedLogs,
    });
  };

  changeLogDetailsVisibility = () => {
    this.setState({
      showLogDetails: !this.state.showLogDetails,
    });
  };

  //   =============== Logs ============= //

  handleEachLog = project => {
    const logArray = project.logs;
    if (logArray.length) {
      return logArray.map(log => {
        return (
          <div key={log.id} className="border">
            <ul className="log-list">
              <li className="log-list-item">
                {/* ============ Show details of Log ============ */}
                <Modal
                  visible={this.state.showLogDetails}
                  onCancel={this.changeLogDetailsVisibility}
                  onOk={this.changeLogDetailsVisibility}
                >
                  <IndividualLog
                    editable
                    log={log}
                    projectTitle={project.title}
                  />
                </Modal>
                {/* ====================== */}
                <a
                  style={{ width: '35%' }}
                  onClick={this.changeLogDetailsVisibility}
                >
                  <div>
                    {log.item.map((item, i) => {
                      if (i < 2) {
                        return log.item[i].length < 15 ? (
                          <div key={i}>{log.item[i]}</div>
                        ) : (
                          <div key={i}>{log.item[i].slice(15) + '...'}</div>
                        );
                      } else if (i === 2) {
                        return <div>....</div>;
                      }
                    })}
                  </div>
                </a>
                <div style={{ width: '20%' }}>{log.price}</div>
                <div style={{ width: '35%' }}>
                  {log.date.toDateString()} {log.date.toLocaleTimeString()}
                </div>

                {/* props passed in order to delete them */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '100%' }}>
                    <DeleteLog log={log} projectTitle={project.title} />
                  </div>
                  <div style={{ width: '100%' }}>
                    <EditLog log={log} projectTitle={project.title} />
                  </div>
                </div>
              </li>
              <PrevLogs projectTitle={project.title} prevLogs={log.prevLogs} />
            </ul>
          </div>
        );
      });
    } else {
      return <h3>No logs !</h3>;
    }
  };

  showDeletedLogs = project => {
    const newMaps = project.deletedLogs.map((log, index) => {
      return (
        <div key={index}>
          <IndividualLog
            editable={false}
            log={log}
            projectTitle={project.title}
          />
          <hr />
          <hr />
          <hr />
        </div>
      );
    });
    return newMaps;
  };

  handleLogs = project => {
    return (
      <div key={project.id} className="projectLogs">
        <h1 className="projectTitle">{project.title.toUpperCase()}</h1>

        {project.deletedLogs.length ? (
          <div>
            <a onClick={this.changeLogDeleteVisibility}> See Deleted</a>
            <Modal
              visible={this.state.showDeletedLogs}
              onCancel={this.changeLogDeleteVisibility}
              onOk={this.changeLogDeleteVisibility}
            >
              <h2>Deleted Logs</h2>
              {this.showDeletedLogs(project)}
            </Modal>
          </div>
        ) : null}
          <Descriptions title="Project Description" layout={'horizontal'} bordered
            size={'small'}>
          <Descriptions.Item label="Contributors:" span ={6}></Descriptions.Item>
          <Descriptions.Item label="Start Date:" span={4}></Descriptions.Item>
          <Descriptions.Item label="End Date:" span={4}></Descriptions.Item>
          <Descriptions.Item label="Expected Cost:" span={4}></Descriptions.Item>
        </Descriptions>,
        <strong
          style={{
            fontSize: '100%',
            display: 'flex',
            textAlign: 'left',
            borderBottom: '0.3px solid grey',
            paddingBottom: '5%',
          }}
        >
          <div style={{ width: '30%' }}>Items</div>
          <div style={{ width: '25%' }}> Price</div>
          <div style={{ width: '35%' }}>Last Modified</div>
        </strong>
        {this.handleEachLog(project)}
      </div>
    );
  };

  // ==================================== //

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
      <div style={{ display: 'flex' }}>
        {/* <Route path="project/logs/:logId" component={IndividualLog} /> */}
        <div className="side-bar">
          <h1> Proto Logs </h1>
          <h2>
            <Link to="/project/logs/add">Add Log</Link>
          </h2>
        </div>
        <div className="log-box">
          {/* ============ filter button ========= */}
          <div className="selectTag">
            <Select
              style={{ width: '100%', padding: '0 3%' }}
              placeholder="Select a project"
              onChange={this.handleProjectFilter}
            >
              <Select.Option value="all">All</Select.Option>
              {this.projectFilterButton()}
            </Select>
          </div>
          <hr />

          <div className="log">
            {/* ====================  */}
            <div> {this.mapProjectLogs()}</div>
          </div>
        </div>{' '}
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