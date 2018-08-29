import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { userActions } from "../actions";

class Dashboard extends React.Component {

  componentDidMount() {
    // this.props.getAllShipments();
  }
  render() { 
      if(this.props.user === null) {
          return(
              <div/>
          )
      }   
    return (
      <div>          
          <h2 className="w3-text-grey w3-padding-16"><i className="fa fa-th fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Hello! Welcome to BlockChain Network</h2>
      </div>  
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.User,    
  };
}

function matchDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(Object.assign({}, userActions), dispatch),
    dispatch
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(Dashboard);