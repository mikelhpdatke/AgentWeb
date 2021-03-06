/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';
import ConnectedDrawers from './SettingManagement/Drawers';
import { drawerActions } from '../_actions/drawer.actions';
import { aisLogo, settingIcon } from './icon/Icon';
import { ip } from './Utils';
// import { map } from 'rsvp';

const ItemLink = ({ to, titleName }) => (
  <NavLink
    style={{ color: 'black', fontWeight: 'bold' }}
    className="nav-item nav-link"
    exact
    to={to}
    activeStyle={{
      fontWeight: 'bold',
      color: 'red',
      textDecoration: 'underline',
    }}
  >
    {titleName}
  </NavLink>
);

class Header extends Component {
  componentDidMount() {
    // notification
  }

  render() {
    // console.log(this.props);
    return (
      <div>
        <ConnectedDrawers />
        <nav
          className="navbar navbar-expand-lg bg-light"
          fill="true"
          variant="tabs"
          defaultActiveKey="/"
        >
          <a className="navbar-brand" href="/">
            <img
              src={aisLogo}
              width="70"
              height="50"
              style={{ margin: 0 }}
              alt=""
            />
          </a>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav mr-auto">
              <ItemLink to="/" titleName="Home" />
              <ItemLink to="/Dashboard" titleName="Dashboard" />
              <a
                style={{ color: 'black', fontWeight: 'bold' }}
                className="nav-item nav-link"
                exact
                rel="noopener noreferrer"
                target="_blank"
                href={ip.kibana}
                activeStyle={{
                  fontWeight: 'bold',
                  color: 'red',
                  textDecoration: 'underline',
                }}
              >
                Management
              </a>
            </ul>
            <img
              className="pull-right"
              src={settingIcon}
              width="50"
              height="25"
              onClick={() => {
                // console.log(this.props.dispatch);
                // eslint-disable-next-line react/destructuring-assignment
                this.props.opened(true);
              }}
              alt=""
            />
          </div>
        </nav>
      </div>
    );
  }
}

ItemLink.propTypes = {
  to: PropTypes.string.isRequired,
  titleName: PropTypes.string.isRequired,
};

Header.propTypes = {
  opened: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const user = state;
  return {
    user,
  };
}

const mapDispatchToProps = dispatch => ({
  opened: newStatus => {
    dispatch(drawerActions.opened(newStatus));
  },
  closed: newStatus => {
    dispatch(drawerActions.closed(newStatus));
  },
});

const ConnectedHeaderPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
export default ConnectedHeaderPage;
