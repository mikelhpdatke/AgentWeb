import React, { Component } from 'react';
import '../App.css';
import ServiceAccessChart from './ServiceAccessChart';
import './Log.css';

const LogManagement = () => (
  <div>
    <h4 className="h4Title">Quản lý log truy cập theo thời gian thực</h4>
    <br />
    <div className="container">
      <div className="row" style={{ marginLeft: '100px' }}>
        <div className="col-md-3">
          <label className="bold">Date:</label> &nbsp;&nbsp;
          <input id="date" type="date" value="2018-10-10" />
        </div>
        <div className="col-md-3">
          <label className="bold">Time Begin:</label>{' '}
          <input id="time_start" type="time" required />
        </div>
        <div className="col-md-3">
          <label className="bold">Time End:</label>{' '}
          <input id="time_end" type="time" required />
        </div>
        <div className="col-md-3">
          <button type="button" className="btn btn-info">
            Info
          </button>
        </div>
      </div>
    </div>
    <div id="chartLog">
      <ServiceAccessChart />
    </div>
    <div id="showRealtime">
      <button type="button" className="btn btn-danger">
        Show Realtime
      </button>
    </div>
  </div>
);

export default LogManagement;
