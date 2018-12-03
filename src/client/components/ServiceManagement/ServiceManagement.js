import React, { Component } from 'react'
import '../App.css'
import CountAccessServiceChart from './CountAccessServiceChart'
import './Service.css'
import FormSubmitServiceQuery from './FormSubmitServiceQuery'

const ServiceManagement = () => (
    <div>
        <h4 className="h4Title">Dự báo dịch chuyển xu hướng truy cập dịch vụ web được giám sát</h4>
        <br />
        <div id='formSubmitService'>
            <FormSubmitServiceQuery/>
        </div>
        
        <div id='chartCountAccessService'>
        </div>
        <div id='showRealtimeService'>
            <button type="button" class="btn btn-danger">Show Realtime</button>
        </div>
    </div>
)

export default ServiceManagement;
