import axios from "axios";
import constants from "../common";
import { toastr } from 'react-redux-toastr'
require('es6-promise/auto');

axios.defaults.withCredentials = true;

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

export const acceptShipment = shipment => {
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

// const cardUploaded=()=>{
//     return {
//         type: "CARD_UPLOADED",        
//         payload: true
//     }
// }

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

export const receiveShipment = (shipmentId) => {
    return (dispatch) => {
        axios.request({
            method: 'post',
            url: `${constants.API_BASE_URL}${constants.RECEIVE_SHIPMENT}`,
            data: {
                shipment: shipmentId
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

// export const setUserLogInDetails = () => {
//     return {
//         type: "USER_LOGGEDIN",
//         payload: true
//     }
// }

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

export const getCustShipmentStatusQueryResult =(inputStatus) =>{
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

export const changePath =(path)=>{
    return{
        type:"CHANGE_PATH",
        payload:path
    }
}