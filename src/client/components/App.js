import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import './App.css';
// import { Link } from 'react-router-dom';
// import { Router } from 'react-router-dom';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import connectedHeaderPage from './Header';
import Home from './Home/Home';
import LogManagement from './LogManagement/LogManagement';
import ServiceManagement from './ServiceManagement/ServiceManagement';
// import Setting from './SettingManagement/Setting';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from './PrivateRoute';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';
// import connectedDrawers from './SettingManagement/Drawers';
import ConnectedServices from './Home/Services';

class App extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    history.listen(() => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    const showHeader = () => {
      if (
        history.location.pathname === '/login' ||
        history.location.pathname === '/register'
      ) {
        return <div />;
      }
      return <connectedHeaderPage />;
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

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  alert: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert,
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
