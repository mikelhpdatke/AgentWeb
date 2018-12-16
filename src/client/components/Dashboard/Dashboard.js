import React from 'react';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <iframe
          title="Dashboard"
          src="http://192.168.0.109:5601/app/kibana#/dashboard/a30b7490-f788-11e8-b35b-b1e14b823965?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3A'2018-11-30T17%3A00%3A00.000Z'%2Cmode%3Aabsolute%2Cto%3A'2018-12-29T16%3A59%3A59.999Z'))"
          height="600"
          width="800"
        />
      </div>
    );
  }
}

export default Dashboard;
