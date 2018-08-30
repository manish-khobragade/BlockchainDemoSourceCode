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
        return (
            <div>
 
                <div className="card border-light mb-3">
                    <div className="card-header bg-white">Accept Shipment</div>
                    <div className="card-body">
                        <form className="w-50">
                            <div className="form-group">
                                <label htmlFor="shipment">Shipment Name</label>
                                <select className="form-control" id="shipment" onChange={this.handleChange}>
                                    <option defaultValue>Select Shipment...</option>
                                    {this.props.user.shipments &&
                                        this.props.user.shipments.filter(shipment => shipment.status === "CREATED"
                                        ).map(shipment =>
                                            <option ref={this.shipmentId} value={shipment.shipmentId} key={shipment.shipmentId}>{shipment.shipmentId}</option>
                                        )}
                                </select>
                            </div>
                            <button type="submit" className="btn coyote-green" onClick={event => this.acceptShipment(event)}>Accept</button>
                        </form>
                    </div>
                </div>

                <div className="card border-light mt-4">
                    <div className="card-header bg-white">Shipments</div>
                    <div className="card-body table-responsive" style={{ overflowY: 'hidden' }}>
                        <table className="table table-hover">
                            <thead className="thead-light rounded">
                                <tr>
                                    <th scope="col">Shipment Id</th>
                                    <th scope="col">Commodity</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Unit Count</th>
                                    <th scope="col">Contract</th>
                                    <th scope="col">Temperature Readings</th>
                                    <th scope="col">GPS Readings</th>
                                    <th scope="col"></th>
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
                                            <td>{shipment.gpsReadings.map((gps) => "[" + gps.latitude + gps.latitudeDir + " " + gps.longitude + gps.longitudeDir + "], ")}</td>
                                            <td><button className="btn coyote-green" onClick={() => this.props.showShipmentDetails(shipment)}>view</button></td>
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