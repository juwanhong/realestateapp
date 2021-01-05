import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./components/Layout/Layout";
import Dashboard from "./containers/Dashboard/Dashboard";
import AddNew from "./containers/AddNew/AddNew";
import NewData from "./containers/AddNew/NewData/NewData";
import Manage from "./containers/Manage/Manage";
import EditProperty from "./containers/Manage/EditProperty/EditProperty";
// import Checkout from "./containers/Checkout/Checkout";
// import Orders from "./containers/Orders/Orders";
// import Auth from "./containers/Auth/Auth";
// import Logout from "./containers/Auth/Logout/Logout";

// import * as actions from "./store/actions/index";

class App extends Component {
  componentDidMount() {
    // this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/manage" exact component={Manage} />
        <Route
          path="/manage/manage-property"
          exact
          render={(props) => <EditProperty {...props} />}
        />
        <Route path="/addnew" exact component={NewData} />
        {/* <Route path="/auth" component={Auth} /> */}
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={Dashboard} />
          {/* <Route path="/checkout" component={Checkout} /> */}
          {/* <Route path="/orders" component={Orders} /> */}
          {/* <Route path="/logout" component={Logout} /> */}
          {/* <Route path="/auth" component={Auth} /> */}
          <Redirect to="/" />
        </Switch>
      );
    }
    return <Layout>{routes}</Layout>;
  }
}

// const mapStateToProps = (state) => {
//   return {
//     isAuthenticated: state.auth.token !== null,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onTryAutoSignup: () => dispatch(actions.authCheckState()),
//   };
// };

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
export default withRouter(App);
