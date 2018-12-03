import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import { Link } from "react-router-dom";
import { connectedHeaderPage as Header } from "./Header";
import Home from "./Home/Home";
import LogManagement from "./LogManagement/LogManagement";
import ServiceManagement from "./ServiceManagement/ServiceManagement";
import Setting from "./SettingManagement/Setting";
import { HashRouter, Router } from "react-router-dom";
import { connect } from "react-redux";
import { history } from "../_helpers";
import { alertActions } from "../_actions";
import { PrivateRoute } from "./PrivateRoute";
import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";
import { withRouter } from "react-router-dom";
import connectedDrawers from "./SettingManagement/Drawers";
import ConnectedServices from "./Home/Services";
class App extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    const showHeader = history => {
      if (
        history.location.pathname == "/login" ||
        history.location.pathname == "/register"
      )
        return <div />;
      else return <Header />;
    };
    return (
      <div>
        <div>
          <div>
            {alert.message && (
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            )}
            <Router history={history}>
              <div>
                {showHeader(history)}
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <PrivateRoute
                    exact
                    path="/log_management"
                    component={LogManagement}
                  />
                  <PrivateRoute
                    exact
                    path="/services"
                    component={ConnectedServices}
                  />
                  <PrivateRoute
                    exact
                    path="/service_management"
                    component={ServiceManagement}
                  />
                  <Route path="/login" component={LoginPage} />
                  <Route path="/register" component={RegisterPage} />
                </Switch>
              </div>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
