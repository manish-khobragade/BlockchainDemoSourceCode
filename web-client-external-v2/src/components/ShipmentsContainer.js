import React from 'react';
import CustomerShipment from './CustomerShipment';
import ShipmentDetails from './ShipmentDetails';
import CarrierShipment from './CarrierShipment'

class ShipmentsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedShipment: {}
        }
        this.showShipmentDetails = this.showShipmentDetails.bind(this);
        this.showShipments = this.showShipments.bind(this);
    }
    showShipmentDetails(shipment) {
        this.setState({ selectedShipment: shipment });
    }
    showShipments() {
        this.setState({ selectedShipment: {} })
    }
    render() {
        return (
            this.state.selectedShipment.shipmentId ?
                <ShipmentDetails getShipmentLogs={this.props.getShipmentLogs} shipment={this.state.selectedShipment} showShipments={this.showShipments} shipmentLog={this.props.user.shipmentLog} />
                :
                this.props.user.user.includes("Customer") ?
                    <CustomerShipment {...this.props} showShipmentDetails={this.showShipmentDetails} />
                    :
                    <CarrierShipment {...this.props} showShipmentDetails={this.showShipmentDetails} />

        );
    }
}

export default ShipmentsContainer;