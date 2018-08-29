import React from 'react';

class CustomerShipment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: "CREATED"
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = {
            unitCount: this.state.unitCount,
            type: this.state.type,
            status: this.state.status,
            contract: this.state.contract,
            shipmentId: this.state.shipmentId,
            loadStops: [
                {
                    "facility": this.state.pickupFacility,
                    "stopType": "PICKUP",
                    "appointmentTime": this.state.pickupFacilityApptTime,
                    "actualTime": ""
                },
                {
                    "facility": this.state.deliveryFacility,
                    "stopType": "DELIVERY",
                    "appointmentTime": this.state.deliveryFacilityApptTime,
                    "actualTime": ""
                }
            ]
        }
        this.props.createShipment(formData);
    }

    render() {

        return (
            <div>
                <div className="card border-light mb-3">
                    <div className="card-header bg-white">Create Shipment</div>
                    <div className="card-body">
                        <form className="w-75">
                            <div className="form-group">
                                <label htmlFor="shipmentId">Shipment</label>
                                <input type="text" className="form-control" id="shipmentId" onChange={event => this.handleChange(event)} />
                            </div>
                            <div className="row">
                                <h5 className="col font-weight-bold">Pickup</h5>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="pickupFacility">Facility</label>
                                        <input type="text" className="form-control" id="pickupFacility" onChange={event => this.handleChange(event)} />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="pickupFacilityApptTime">Appointment Time</label>
                                        <input type="datetime-local" id="pickupFacilityApptTime" className="form-control" onChange={event => this.handleChange(event)} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <h5 className="col font-weight-bold">Delivery</h5>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="deliveryFacility">Facility</label>
                                        <input type="text" className="form-control" id="deliveryFacility" onChange={event => this.handleChange(event)} />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="deliveryFacilityApptTime">Appointment Time</label>
                                        <input type="datetime-local" id="deliveryFacilityApptTime" className="form-control" onChange={event => this.handleChange(event)} />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="type">Commodity</label>
                                        <select className="form-control" id="type" onChange={this.handleChange}>
                                            <option defaultValue>Select Commodity</option>
                                            <option value="APPLES">APPLES</option>
                                            <option value="BANANAS">BANANAS</option>
                                            <option value="PEACHES">PEACHES</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="unitCount">Units</label>
                                        <input type="text" className="form-control" id="unitCount" onChange={event => this.handleChange(event)} />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="contract" >Contract</label>
                                        <input type="text" className="form-control" id="contract" onChange={event => this.handleChange(event)} />
                                    </div>
                                </div>
                            </div>

                            <hr />
                            <button type="submit" className="btn coyote-green" onClick={event => this.handleSubmit(event)}>Create Shipment</button>
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
            </div >
        )
    }
}

export default CustomerShipment;