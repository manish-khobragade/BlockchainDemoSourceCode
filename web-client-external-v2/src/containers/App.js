import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import { Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Dashboard from '../components/Dashboard';
import CustomerReporting from '../components/CustomerReporting';
import CarrierReporting from '../components/CarrierReporting';
import CustomerTransaction from '../components/CustomerTransaction';
import TemperatureTransaction from '../components/TemperatureTransaction';
import GPSTransaction from '../components/GPSTransaction';
// import CustomerShipment from '../components/CustomerShipment';
import CarrierShipment from '../components/CarrierShipment';
import UserEmulate from "../components/UserEmulate";
import LoginModal from "../components/LoginModal";
import { userActions } from "../actions";
// import landingPageImage from '../components/carrier-landing-hero.jpg'
// import headerLogo from '../components/Emtec_Logo.png'
// import ReduxToastr from 'react-redux-toastr'
// import { toastr } from 'react-redux-toastr'
import constants from '../common';
import Notifications from '../components/Notifications';
import coyoteLogo from '../components/coyote-logo.jpg';
import ibmBlockchainLogo from '../components/ibm-blockchain-logo.jpg';
import ShipmentsContainer from '../components/ShipmentsContainer';
import Settings from '../components/settings';


const history = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);
    this.ShowNotification = this.ShowNotification.bind(this);
    var websocket = new WebSocket(constants.WEB_SOCKET_ENDPOINT);
    websocket.onclose = function (evt) { console.log("close : " + JSON.stringify(evt)); };
    websocket.onopen = function (evt) { console.log("open : " + JSON.stringify(evt)); };
    websocket.onmessage = (evt) => this.ShowNotification(evt.data);
    websocket.onerror = function (evt) { console.log("error : " + JSON.stringify(evt)); };
    console.log("now state : " + websocket.readyState)
    if (window.location.search === "?loggedIn=true") {
      sessionStorage.userLoggedIn = true;
    }
  }

  ShowNotification(event) {
    // var namespace = "org.acme.shipping.perishable.";
    var eventData = JSON.parse(event);
    const notification = {
      type: "",
      message: "",
      read: this.props.user.path==="/notifications",
      eventId: ''
    }
    let eventType = eventData['$class'].split('.').pop();
    let message;

    switch (eventType) {
      case "TemperatureThresholdEvent":
        console.log(eventData)
        // toastr.error(`Shipment : ${eventData.shipment.split('#')[1]}`, `Temperature threshold violated. Temperature was ${eventData.temperature}`);
        message = `Shipment : ${eventData.shipment.split('#')[1]} Temperature threshold violated. Temperature was ${eventData.temperature}`
        break;
      case "ShipmentAcceptedError":
        // toastr.error(`Shipment : ${eventData.shipment.split('#')[1]}`, `The shipment is already accepted`);
        message = `Shipment : ${eventData.shipment.split('#')[1]} The shipment is already accepted`;

        break;
      case "ShipmentHasArrived":
        // toastr.success(`Shipment : ${eventData.shipment.split('#')[1]}`, `Shipment has arrived. Shipment Amount : ${eventData.shipmentAmount}. Penalty : ${eventData.penalty}`);
        message = `Shipment : ${eventData.shipment.split('#')[1]} Shipment has arrived. Shipment Amount : ${eventData.shipmentAmount}. Penalty : ${eventData.penalty}`;

        break;
      case "ShipmentInPortEvent":
        // toastr.success(`Shipment : ${eventData.shipment.split('#')[1]}`, `Shipment Location updated`);
        message = `Shipment : ${eventData.shipment.split('#')[1]} Shipment Location updated`;
        break;
      default:
        break
    }

    Object.assign(notification, { message }, { type: eventType, eventId: eventData.eventId });

    this.props.receiveNotification(notification);
  }

  componentDidMount() {
    this.props.getCardDetailsPing();
    this.props.getAllShipments();

  }

  render() {
    let userLoggedIn =  sessionStorage.userLoggedIn || false;
    let cardUploaded = this.props.user.user;
    let path = this.props.user.path;
    console.log('path', this.props.path)
    return (
      <div>
        <div className="row" style={{marginLeft:10 + 'px', marginRight: 10 +'px'}}>
          {/* Bg Image */}
          {(!userLoggedIn || !cardUploaded) &&
            <LoginModal {...this.props} history={history} />
          }

          {/* Left Navigation */}
          <div className="col-4">
            {userLoggedIn && cardUploaded &&
              <UserEmulate changePath={this.props.changePath}
                setUserDetails={this.props.setUserDetails}
                history={history}
                currentUser={this.props.user.user}
                notifications={this.props.user.notifications}
                 path={path}
                 markAllNotificationsAsRead = {this.props.markAllNotificationsAsRead} />
            }
            {(!cardUploaded && userLoggedIn) &&
              <LoginModal {...this.props} showCard={true} history={history} />
            }
          </div>

          {/* Coyote Logo and Right Side Panel*/}
          <div className={userLoggedIn && cardUploaded ? "col-8" : ''} id="contact">
            <div className="w3-container w3-margin-bottom">
              {userLoggedIn && cardUploaded &&

                <div className="w3-container w3-margin">
                  <img alt="Not Found" src={ibmBlockchainLogo} style={{ height: 'auto', width: 20 + '%', float: 'right' }} />
                  <img alt="Not Found" src={coyoteLogo} style={{ height: 'auto', width: 20 + '%', float: 'right' }} />
                </div>
              }

              {(!userLoggedIn && !cardUploaded) &&
                <LoginModal history={history} showCard={false} {...this.props} />
              }
              {path === "/dashboard" &&
                <Dashboard />
              }
              {path === "/create-shipment" &&
                <ShipmentsContainer {...this.props} />
              }
              {path === "/accept-shipment" &&
                <CarrierShipment {...this.props} />
              }
              {path === "/customer-transaction" &&
                <CustomerTransaction {...this.props} />
              }
              {path === "/temperature-transaction" &&
                <TemperatureTransaction {...this.props} />
              }
              {path === "/gps-transaction" &&
                <GPSTransaction {...this.props} />
              }
              {path === "/customer-reporting" &&
                <CustomerReporting {...this.props} />
              }
              {path === "/carrier-reporting" &&
                <CarrierReporting {...this.props} />
              }
              {path === "/notifications" &&
                <Notifications notifications={this.props.user.notifications} removeNotification={this.props.removeNotification} />
              }
              {path === "/settings" &&
                <Settings {...this.props} />
              }
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps, matchDispatchToProps)(App);