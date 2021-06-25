import React from "react";
import { Redirect} from "react-router-dom";
import { connect } from "react-redux";
// import { getToken } from "../../Redux/token-selectors";

// let mapStateToPropsForRedirect = state => ({
//     token: getToken(state)
//   });

export const withAuthRedirect = Component => {

  class RedirectComponent extends React.Component {
    render() {
      if (!this.props.token) return <Redirect to={"/login"} />;
      return <Component {...this.props} />;
    }
  }
  
  let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

  return ConnectedAuthRedirectComponent;
};
