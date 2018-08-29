import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Dashboard from '../components/Dashboard';
import CustomerReporting from '../components/CustomerReporting';
import CarrierReporting from '../components/CarrierReporting';
import CustomerTransaction from '../components/CustomerTransaction';
import TemperatureTransaction from '../components/TemperatureTransaction';
import GPSTransaction from '../components/GPSTransaction';
import CustomerShipment from '../components/CustomerShipment';
import CarrierShipment from '../components/CarrierShipment';
import UserEmulate from "../components/UserEmulate";
import LoginModal from "../components/LoginModal";
import { userActions } from "../actions";
import landingPageImage from '../components/carrier-landing-hero.jpg'
import headerLogo from '../components/Emtec_Logo.png'
import ReduxToastr from 'react-redux-toastr'
import { toastr } from 'react-redux-toastr'
import constants from '../common';

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
    var namespace = "org.coyote.playground.blockchain.demo.";
    var eventData = JSON.parse(event);
    console.log(eventData);

    switch (eventData["$class"]) {
      case namespace + "TemperatureThresholdEvent":
        console.log(eventData)
        toastr.error(`Shipment : ${eventData.shipment.split('#')[1]}`, `Temperature threshold violated. Temperature was ${eventData.temperature}`);

        break;
      case namespace + "ShipmentAcceptedError":
        toastr.error(`Shipment : ${eventData.shipment.split('#')[1]}`, `The shipment is already accepted`);

        break;
      case namespace + "ShipmentHasArrived":
        toastr.success(`Shipment : ${eventData.shipment.split('#')[1]}`, `Shipment has arrived. Shipment Amount : ${eventData.shipmentAmount}. Penalty : ${eventData.penalty}`);

        break;
      case namespace + "ShipmentInPortEvent":
        toastr.success(`Shipment : ${eventData.shipment.split('#')[1]}`, `Shipment Location updated. ` + eventData["message"]);
        break;
      default:
        break
    }
  }

  componentDidMount() {
    this.props.getCardDetailsPing();
    this.props.getAllShipments();

  }

  render() {
    // const isCustomer = this.props.user.user.includes('Customer');  
    let userLoggedIn = sessionStorage.userLoggedIn;
    let cardUploaded = this.props.user.user;
    let path = this.props.user.path;
    return (
      <div>
        {/* {(!userLoggedIn || !cardUploaded) &&
          <img src={landingPageImage} style={{ height: 'auto', width: 100 + '%' }} />
        } */}
        <ReduxToastr
          timeOut={10000}
          newestOnTop={false}
          preventDuplicates
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar />
        <div className="w3-row-padding">
          {/* Bg Image */}
          {(!userLoggedIn || !cardUploaded) &&
            <img alt="Not found" src={landingPageImage} style={{ height: 'auto', width: 100 + '%' }} />
          }
          {/* Left Navigation */}
          <div className="w3-quarter">
            {userLoggedIn && cardUploaded &&
              <UserEmulate changePath={this.props.changePath} setUserDetails={this.props.setUserDetails} history={history} currentUser={this.props.user.user} />
            }
            {(!cardUploaded && userLoggedIn) &&
              <LoginModal {...this.props} showCard={true} history={history} />
            }
          </div>

          {/* Coyote Logo and Right Side Panel*/}
          <div className={userLoggedIn && cardUploaded ? "w3-threequarter w3-card w3-white right-div" : ''} id="contact">
            <div className="w3-container w3-margin-bottom">
              {userLoggedIn && cardUploaded &&

                <div className="w3-container w3-margin">
                  <div style={{ width: 80 + '%', float: 'left' }} >
                    
                  </div>
                  <h3>Welcome to Blockchain Network</h3>
                  {/* <img src={headerLogo} style={{ height: 'auto', width: 20 + '%', float: 'right' }} /> */}
                </div>
              }

              {(!userLoggedIn && !cardUploaded) &&
                <LoginModal history={history} showCard={false} {...this.props} />
              }
              {path === "/dashboard" &&
                <Dashboard />
              }
              {path === "/create-shipment" &&
                <CustomerShipment {...this.props} />
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