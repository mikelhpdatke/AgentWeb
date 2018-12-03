import React, { Component } from 'react'
import '../App.css'
import ServiceAccessChart from './ServiceAccessChart'
import './Log.css'
const LogManagement = () => (
    <div>
        <h4 className="h4Title">Quản lý log truy cập theo thời gian thực</h4>
        <br />
        <div class="container">
            <div class="row" style={{ marginLeft: "100px" }}>
                <div class="col-md-3">
                    <label className='bold'>Date:</label> &nbsp;&nbsp;
                    <input id="date" type="date" value="2018-10-10" />
                </div>
                <div class="col-md-3">
                    <label className='bold'>Time Begin:</label> &nbsp;&nbsp; <input id="time_start" type="time" required />
                </div>
                <div class="col-md-3">
                    <label className='bold'>Time End:</label> &nbsp;&nbsp; <input id="time_end" type="time" required />
                </div>
                <div class="col-md-3">
                    <button type="button" class="btn btn-info">Info</button>
                </div>
            </div>
        </div>
        <div id='chartLog'>
                <ServiceAccessChart/>
        </div>
        <div id='showRealtime'>
                    <button type="button" class="btn btn-danger">Show Realtime</button>
                </div>
    </div>
)

export default LogManagement;
