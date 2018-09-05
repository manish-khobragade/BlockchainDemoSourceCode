import axios from "axios";
import constants from "../common";
import { toastr } from 'react-redux-toastr'

axios.defaults.withCredentials = true;
// const logQueryPrefix = 'resource:org.coyote.playground.blockchain.demo.Shipment#';

export const setUserDetails = details => {
    return {
        type: "CHANGE_USER",
        payload: details.participant
    };
}

export const getAllShipments = () => {
    let apirequest = constants.API_BASE_URL + constants.GET_CREATE_SHIPMENTS;
    return dispatch => {
        axios.request({
            method: 'get',
            url: apirequest
        }).then(response => {
            dispatch(receivedAllShipments(response.data));
        }).catch(err =>
            console.log(err)
        );
    }
}

const receivedAllShipments = shipments => {
    return {
        type: "RECEIVE_SHIPMENTS",
        payload: shipments
    }
}

export const createShipment = shipment => {
    return (dispatch) => {
        axios.request({
            method: 'post',
            url: `${constants.API_BASE_URL}${constants.GET_CREATE_SHIPMENTS}`,
            data: shipment
        }).then(() => {
            toastr.success('Success', 'Shipment created successfully')
            dispatch(getAllShipments());
        }).catch(err =>
            toastr.error('Error', err.message)
        );
    }
}

export const acceptShipment = shipmentId => {
    const shipment = {
        "$class": "org.coyote.playground.blockchain.demo.ShipmentAccepted",
        "shipment": shipmentId,
        "timestamp": new Date().toISOString()
    }

    return (dispatch) => {
        axios.request({
            method: 'post',
            url: `${constants.API_BASE_URL}${constants.ACCEPT_SHIPMENT}`,
            data:
                shipment

        }).then(() => {
            toastr.success('Success', 'Shipment accepted successfully');
            dispatch(getAllShipments());
        }).catch(err =>
            toastr.error('Error', err.message)
        );
    }
}

export const getCardDetailsPing = () => {
    return dispatch => {
        axios.request({
            method: 'get',
            url: `${constants.API_BASE_URL}${constants.GET_CARD_PING}`
        }).then(response => {
            dispatch(setUserDetails(response.data));
        }).catch(err =>
            console.log("error", err.message)
        );
    }
}

export const importCard = (cardDetails) => {
    return dispatch => {
        axios.request({
            method: 'post',
            url: `${constants.API_BASE_URL}${constants.CARD_IMPORT}?name=${cardDetails.get('name')}`,
            data: cardDetails,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        }).then(response => {
            console.log(response)
            dispatch(setDefaultCard(cardDetails));
        }).catch(err =>
            console.log(err.message)
        );
    }
}

export const setDefaultCard = (cardDetails) => {
    return dispatch => {
        axios.request({
            method: 'post',
            url: `${constants.API_BASE_URL}wallet/${cardDetails.get('name')}/setDefault`,
        }).then(() => {
            dispatch(getCardDetailsPing());
        }).catch(err =>
            console.log(err.message)
        );
    }
}

export const pickupShipment = (shipment, actualPickupTime) => {
    actualPickupTime = actualPickupTime.replace("T", " ") + ":00";
    return (dispatch) => {
        axios.request({
            method: 'post',
            url: `${constants.API_BASE_URL}${constants.PICKUP_SHIPMENT}`,
            data: {
                shipment,
                actualPickupTime
            }
        }).then(() => {
            toastr.success('Success', 'Shipment picked up successfully');
            dispatch(getAllShipments());
        }).catch(err =>
            toastr.error('Error', err.message)
        );
    }
}

export const receiveShipment = (shipment, actualDeliveredTime) => {
    actualDeliveredTime = actualDeliveredTime.replace("T", " ") + ":00";
    return (dispatch) => {
        axios.request({
            method: 'post',
            url: `${constants.API_BASE_URL}${constants.RECEIVE_SHIPMENT}`,
            data: {
                shipment,
                actualDeliveredTime
            }
        }).then(() => {
            toastr.success('Success', 'Shipment received successfully');
            dispatch(getAllShipments());
        }).catch(err =>
            toastr.error('Error', err.message)
        );
    }
}

export const submitTemperature = (formData) => {
    return (dispatch) => {
        axios.request({
            method: 'post',
            url: `${constants.API_BASE_URL}${constants.SUBMIT_TEMPERATURE}`,
            data: formData
        }).then(() => {
            toastr.success('Success', 'Temperature submitted successfully');
            dispatch(getAllShipments());
        }).catch(err =>
            toastr.error('Error', err.message)
        );
    }
}

export const submitGPS = (formData) => {
    return (dispatch) => {
        axios.request({
            method: 'post',
            url: `${constants.API_BASE_URL}${constants.SUBMIT_GPS}`,
            data: formData
        }).then(() => {
            toastr.success('Success', 'GPS Location submitted successfully');
            dispatch(getAllShipments());
        }).catch(err =>
            toastr.error('Error', err.message)
        );
    }
}

const setTemperatureQueryResult = (result) => {
    return {
        type: "TEMPERATURE_QUERY_FETCHED",
        payload: result
    }
}

const setShipmentStatusQueryResult = (result) => {
    return {
        type: "SHIPMENT_STATUS_QUERY_FETCHED",
        payload: result
    }
}

export const getCarrierTemperatureQueryResult = (inputTemperature) => {
    return dispatch => {
        axios.request({
            method: 'get',
            url: `${constants.API_BASE_URL}${constants.GET_TEMPERATURE}${inputTemperature}`
        }).then(response => {
            dispatch(setTemperatureQueryResult(response));
        }).catch(err =>
            console.log(err.message)
        );
    }
}

export const getCustShipmentStatusQueryResult = (inputStatus) => {
    return dispatch => {
        axios.request({
            method: 'get',
            url: `${constants.API_BASE_URL}${constants.GET_SHIPMENTS_BY_STATUS}${inputStatus}`
        }).then(response => {
            dispatch(setShipmentStatusQueryResult(response));
        }).catch(err =>
            console.log(err.message)
        );
    }
}

export const changePath = (path) => {
    return {
        type: "CHANGE_PATH",
        payload: path
    }
}

export const removeNotification = (notificationEventId) => {
    return {
        type: "REMOVE_NOTIFICATION",
        payload: notificationEventId
    }
}

export const receiveNotification = (notification) => {
    return {
        type: "RECEIVE_NOTIFICATION",
        payload: notification
    }
}

export const markAllNotificationsAsRead = () => {
    return {
        type: "MARK_ALL_NOTIFICATIONS_READ"
    }
}

//https://stackoverflow.com/questions/492994/compare-two-dates-with-javascript
export const convert = (d) => {
    // Converts the date in d to a date-object. The input can be:
    //   a date object: returned without modification
    //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
    //   a number     : Interpreted as number of milliseconds
    //                  since 1 Jan 1970 (a timestamp) 
    //   a string     : Any format supported by the javascript engine, like
    //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
    //  an object     : Interpreted as an object with year, month and date
    //                  attributes.  **NOTE** month is 0-11.
    return (
        d.constructor === Date ? d :
            d.constructor === Array ? new Date(d[0], d[1], d[2]) :
                d.constructor === Number ? new Date(d) :
                    d.constructor === String ? new Date(d) :
                        typeof d === "object" ? new Date(d.year, d.month, d.date) :
                            NaN
    );
}

export const dateCompare = (a, b) => {
    // Compare two dates (could be of any type supported by the convert
    // function above) and returns:
    //  -1 : if a < b
    //   0 : if a = b
    //   1 : if a > b
    // NaN : if a or b is an illegal date
    // NOTE: The code inside isFinite does an assignment (=).
    return (
        isFinite(a = this.convert(a).valueOf()) &&
            isFinite(b = this.convert(b).valueOf()) ?
            (a > b) - (a < b) :
            NaN
    );
}

export const getShipmentLogs = (shipmentId, contractId) => {
    let prefix = "resource:org.coyote.playground.blockchain.demo.Shipment#";
    let shipment = prefix + shipmentId;
    shipment = encodeURIComponent(shipment);
    let shipmentLog = [];
    let key = 0;
    return (dispatch) => {

        axios.all([
            axios.get(`${constants.API_BASE_URL}${constants.GET_CONTRACT}${contractId}`),
            axios.get(`${constants.API_BASE_URL}${constants.QUERY_ACCEPTED_BY_SHIPMENT}${shipment}`),
            axios.get(`${constants.API_BASE_URL}${constants.QUERY_DELIVERY_BY_SHIPEMENT}${shipment}`),
            axios.get(`${constants.API_BASE_URL}${constants.QUERY_PICKUP_BY_SHIPMENT}${shipment}`),
            axios.get(`${constants.API_BASE_URL}${constants.QUERY_TEMP_BY_SHIPMENT}${shipment}`),
            axios.get(`${constants.API_BASE_URL}${constants.GET_SHIPMENT_BY_ID}${shipmentId}`),
        ])
            .then(axios.spread(function (contract, acceptedByShipment, deliveryByShipment, pickUpByShipment, tempByShipment, shipmentData) {
                let minTemp = contract.data.minTemperature;
                let maxTemp = contract.data.maxTemperature;                

                if (tempByShipment.data.length > 0) {
                    tempByShipment.data.forEach(querydata => {
                        if (querydata.centigrade < minTemp || querydata.centigrade > maxTemp) {
                            shipmentLog.push(
                                {
                                    key: key++,
                                    invokingParticipant: 'Admin',
                                    state: querydata.centigrade < minTemp ? 'Low Temperature' : 'High Temperature',
                                    timeStamp: querydata.timestamp,
                                    type: 'event'
                                });
                        }
                    });
                }


                if (acceptedByShipment.data.length > 0) {
                    shipmentLog.push(
                        {
                            key: key++,
                            invokingParticipant: 'Admin',
                            state: 'Accepted',
                            timeStamp: acceptedByShipment.data[0].timestamp,
                            type: 'transaction'
                        });
                }

                if (pickUpByShipment.data.length > 0) {
                    let violationPrefix = '';
                    if (shipmentData.data.loadStops.length > 0) {
                        let appointmentTime = shipmentData.data.loadStops[0].appointmentTime;
                        let actualPickupTime = pickUpByShipment.data[pickUpByShipment.data.length - 1].actualPickupTime;
                        if (dateCompare(appointmentTime, actualPickupTime) === -1) {
                            violationPrefix = 'Late ';
                        }
                    }

                    shipmentLog.push(
                        {
                            key: key++,
                            invokingParticipant: 'Admin',
                            state: violationPrefix + 'Picked Up',
                            timeStamp: pickUpByShipment.data[pickUpByShipment.data.length - 1].timestamp,
                            type: violationPrefix === '' ? 'transaction' : 'event'
                        });
                }

                if (deliveryByShipment.data.length > 0) {
                    let violationPrefix = '';
                    if (shipmentData.data.loadStops.length > 0) {
                        let appointmentTime = shipmentData.data.loadStops[0].appointmentTime;
                        let actualDeliveredTime = deliveryByShipment.data[pickUpByShipment.data.length - 1].actualDeliveredTime;
                        if (dateCompare(actualDeliveredTime, appointmentTime) === 1) {
                            violationPrefix = 'Late ';
                        }
                    }

                    shipmentLog.push(
                        {
                            key: key++,
                            invokingParticipant: 'Admin',
                            state: violationPrefix + 'Delivered',
                            timeStamp: deliveryByShipment.data[deliveryByShipment.data.length - 1].timestamp,
                            type: violationPrefix === '' ? 'transaction' : 'event'
                        });
                }


                shipmentLog.sort((log1, log2) => {
                    var d1 = Date.parse(log1.timeStamp);
                    var d2 = Date.parse(log2.timeStamp);
                    if (d1 > d2) {
                        return 1;
                    }
                    if (d1 < d2) {
                        return -1;
                    }
                    return 0;
                });
                dispatch(shipmentLogReceived(shipmentLog));
            }));

    }
}


export const shipmentLogReceived = (shipmentLog) => {
    return {
        type: "SHIPMENT_LOG_RECEIVED",
        payload: shipmentLog
    }
}
