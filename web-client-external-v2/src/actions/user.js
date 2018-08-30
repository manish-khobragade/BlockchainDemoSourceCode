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

export const getShipmentLogs = (shipmentId, contractId) => {
    shipmentId = encodeURIComponent(shipmentId);
    let shipmentLog = [];
    let key = 0;
    return (dispatch) => {

        axios.all([
            axios.get(`${constants.API_BASE_URL}${constants.GET_CONTRACT}${contractId}`),
            axios.get(`${constants.API_BASE_URL}${constants.QUERY_ACCEPTED_BY_SHIPMENT}${shipmentId}`),
            axios.get(`${constants.API_BASE_URL}${constants.QUERY_DELIVERY_BY_SHIPEMENT}${shipmentId}`),
            axios.get(`${constants.API_BASE_URL}${constants.QUERY_PICKUP_BY_SHIPMENT}${shipmentId}`),
            axios.get(`${constants.API_BASE_URL}${constants.QUERY_TEMP_BY_SHIPMENT}${shipmentId}`),
        ])
            .then(axios.spread(function (contract, acceptedByShipment, deliveryByShipment, pickUpByShipment, tempByShipment) {
                let minTemp = contract.data.minTemperature;
                let maxTemp = contract.data.maxTemperature;
                let voilationType = '';

                let temperatureTransactions = tempByShipment.data.map(value => {
                    if (value.centigrade < minTemp) { voilationType = 'Low Temperature' }
                    else if (value.centigrade > maxTemp) { voilationType = 'High Temperature' }

                    return {
                        key: key++,
                        invokingParticipant: 'Admin',
                        state: voilationType,
                        timeStamp: value.timestamp,
                        type: 'event'
                    }
                })

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
                    shipmentLog.push(
                        {
                            key: key++,
                            invokingParticipant: 'Admin',
                            state: 'Picked Up',
                            timeStamp: pickUpByShipment.data[0].timestamp,
                            type: 'transaction'
                        });
                }

                if (deliveryByShipment.data.length > 0) {
                    shipmentLog.push(
                        {
                            key: key++,
                            invokingParticipant: 'Admin',
                            state: 'Delivered',
                            timeStamp: deliveryByShipment.data[0].timestamp,
                            type: 'transaction'
                        });
                }

                if (temperatureTransactions.length > 0) {
                    temperatureTransactions.forEach(querydata => {
                        shipmentLog.push(
                            {
                                key: key++,
                                invokingParticipant: 'Admin',
                                state: querydata.state,
                                timeStamp: querydata.timeStamp,
                                type: querydata.state
                            });
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
                console.log(shipmentLog);
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
