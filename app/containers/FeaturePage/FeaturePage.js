/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
export default class FeaturePage extends React.Component {
  render() {
    return (
      <div className="feature-page">
        <div className="indi-box">
          <h3> 8-bit Computer </h3>
          <h4> Description: Ben Eaters fully functional 8 bit computer with 7 basic components showing the transmission of data via bus and calculations shown by ALU.2 </h4>
          <div className="numberOfPeople"><p> 4 </p></div>
          <div className="cost"> 10,000 </div>
          <div className="last-modification"> last modified <br /> 9-09-19 12: 18</div>
        </div>
      </div>
    );
  }
}
