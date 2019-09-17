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

import './style.scss';

import DeleteLog from './Delete';
import EditLog from './Edit';
import PrevLogs from './PrevLogs';

class IndividualLog extends Component {
  showLogDetails = log => {
    const { projectTitle } = this.props;
    return (
      <div>
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
        <hr />
        <div className="log-details">
          <div> Shop:</div> <span> {log.shop}</span>
        </div>
        <hr />
        <div className="log-details">
          <div> last modified:</div>
          <span>
            {log.date.toDateString()} <br /> at: {log.date.toLocaleTimeString()}
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

        {log.modifiedBy ? (
          <div className="log-details">
            <div>Modified by:</div>
            <span>{log.modifiedBy}</span>
          </div>
        ) : null}

        <hr />
        <div className="log-details">
          <div>See History..</div>
          <span>
            <PrevLogs projectTitle={projectTitle} prevLogs={log.prevLogs} />
          </span>
        </div>
        <hr />

        {/* props passed in order to delete them */}

        {this.props.editable ? (
          <div style={{ display: 'flex' }}>
            <div style={{ width: '50%' }}>
              <DeleteLog log={log} projectTitle={projectTitle} />
            </div>
            <div style={{ width: '50%' }}>
              <EditLog log={log} projectTitle={projectTitle} />
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  render() {
    return <div>{this.showLogDetails(this.props.log)}</div>;
  }
}

// ===================== //

export default IndividualLog;
