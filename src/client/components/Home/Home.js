/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import Button from '@material-ui/core/Button';
import ConnectedCard from './Card';

const styles = {
  h1: {
    textAlign: 'center',
    backgroundColor: 'rgba(45, 45, 45, 0.1)',
    padding: '2px',
    color: 'red',
    fontSize: '40px',
    marginTop: '3px',
  },
  contrainer: {
    marginTop: '50px',
    display: 'flex',
    justifyContent: 'space-around',
  },
};
export async function HuanFetch(url, json) {
  const myRequest = new Request(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(json),
  });
  await fetch(myRequest)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
      console.debug('Something went wrong on api server!');
    })
    .then(response => response)
    .catch(error => {
      console.debug(error);
    });
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [
        {
          ip: '192.168.0.107',
          port: '22',
          address: 'ffff:192.168.0.107:22',
          active: false,
        },
        {
          ip: '192.168.0.1',
          port: '80',
          address: 'ffff:192.168.0.1:80',
          active: false,
        },
      ],
    };
    this.myInterval = setInterval(() => {
      HuanFetch('/api/getClients', {}).then(res => {
        console.log(res);
        this.setState({ arr: res.arr });
      });
    }, 10000);
  }

  componentWillMount() {
    HuanFetch('/api/getClients', {}).then(res => {
      console.log(res);
      this.setState({ arr: res.arr });
    });
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <h1 className={classes.h1}>Controller</h1>

        <div className={classes.contrainer}>
          {this.state.arr.map(x => (
            <ConnectedCard
              name={x.address}
              ip={x.ip}
              port={x.port}
              card={x.address}
              status={x.active === true ? 'ACTIVE' : 'INACTIVE'}
            />
          ))}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
