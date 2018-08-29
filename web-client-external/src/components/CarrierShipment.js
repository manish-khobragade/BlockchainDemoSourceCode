import React from 'react';

class CarrierShipment extends React.Component {
    constructor(props) {
        super(props)

        this.shipmentId = React.createRef();
        this.acceptShipment = this.acceptShipment.bind(this);
    }
    acceptShipment(event) {
        event.preventDefault();
        const shipmentDetails = {
            shipment: this.shipmentId.current.value
        }
        this.props.acceptShipment(shipmentDetails);
    }
    render() {
        if (!this.props.user || !this.props.user.shipments) {
            return (
                <div />
            )
        }
        return (
            <div>
                <div className="w3-panel w3-leftbar w3-sand w3-padding-16">
                    <div className="col-5">
                        <h4>Accept Shipment</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="shipment">Shipment Name</label>
                                <input type="text" className="form-control" id="shipment" ref={this.shipmentId} />
                            </div>
                            <button type="submit" className="btn w3-teal" onClick={event => this.acceptShipment(event)}>Accept</button>
                        </form>
                    </div>
                </div>
                <hr />
                <div className="w3-container">
                    <div>
                        <h4>Shipments</h4>
                        <table className="table table-hover">
                            <thead className="w3-teal">
                                <tr>
                                    <th scope="col">Shipment Id</th>
                                    <th scope="col">Commodity</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Unit Count</th>
                                    <th scope="col">Contract</th>
                                    <th scope="col">Temperature Readings</th>
                                    <th scope="col">GPS Readings</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.user.shipments &&
                                    this.props.user.shipments.map((shipment) =>
                                        <tr key={shipment.shipmentId}>
                                            <th scope="row">{shipment.shipmentId}</th>
                                            <td>{shipment.type}</td>
                                            <td>{shipment.status}</td>
                                            <td>{shipment.unitCount}</td>
                                            <td>{shipment.contract.substring(shipment.contract.lastIndexOf("#") + 1)}</td>
                                            <td>{shipment.temperatureReadings.map((temperature) => temperature.centigrade + ", ")}</td>
                                            <td>{shipment.gpsReadings.map((gps) => "["+ gps.latitude + gps.latitudeDir + " " + gps.longitude + gps.longitudeDir +"], ")}</td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        )
    }

}

export default CarrierShipment