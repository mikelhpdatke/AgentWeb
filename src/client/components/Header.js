import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { AIS_logo, settingIcon } from "./icon/Icon";
import "./App.css";
import { connect } from "react-redux";
import ConnectedDrawers from "./SettingManagement/Drawers";
import { drawerActions } from "../_actions/drawer.actions";
import { map } from "rsvp";
const ItemLink = props => {
  return (
    <NavLink
      style={{ color: "black", fontWeight: "bold" }}
      className="nav-item nav-link"
      exact
      to={props.to}
      activeStyle={{
        fontWeight: "bold",
        color: "red",
        textDecoration: "underline"
      }}
    >
      {props.titleName}
    </NavLink>
  );
};

class Header extends Component {
  componentDidMount() {
    //notification
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <ConnectedDrawers/>
        <nav
          className="navbar navbar-expand-lg bg-light"
          fill="true"
          variant="tabs"
          defaultActiveKey="/"
        >
          <a className="navbar-brand" href="/">
            <img
              src={AIS_logo}
              width="70"
              height="50"
              style={{ margin: 0 }}
              alt=""
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav mr-auto">
              <ItemLink to="/" titleName="Home" />
              <img
                className="pull-right"
                src={settingIcon}
                width="50"
                height="25"
                onClick={() => {
                  //console.log(this.props.dispatch);
                  this.props.opened(true);
                }}
              />
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const user = state;
  return {
    user
  };
}

const mapDispatchToProps = dispatch => {
  return {
    opened: newStatus => {
      dispatch(drawerActions.opened(newStatus));
    },
    closed: newStatus => {
      dispatch(drawerActions.closed(newStatus));
    }
  };
};
const connectedHeaderPage = connect(mapStateToProps, mapDispatchToProps)(Header);
export { connectedHeaderPage };
