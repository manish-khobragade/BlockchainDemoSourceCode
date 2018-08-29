import React from 'react';

class CustomerTransaction extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stopType: "0"
        }
        this.handleChange = this.handlechange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handlechange(event) {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.state.stopType === "0"
            ? this.props.pickupShipment(this.state.shipment, this.state.actualPickupTime)
            : this.props.receiveShipment(this.state.shipment, this.state.actualDeliveredTime);
    }
    render() {
        var shipments;
        this.state.stopType === "0" 
        ? shipments = this.props.user.shipments.filter( shipment => shipment.status ===  "ACCEPTED")      
        : shipments = this.props.user.shipments.filter( shipment => shipment.status ===  "PICKEDUP")      
        
        return (
            <div>
                <div className="card border-light mt-4">
                    <div className="card-header bg-white">Shipment Transactions</div>
                    <div className="card-body">
                        <form className="w-75">
                            
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <input defaultChecked onClick={this.handleChange} type="radio" id="stopType" name="stopType" value="0" /> Pick Up&nbsp;&nbsp;
                                        <input onClick={this.handleChange} type="radio" id="stopType" name="stopType" value="1" /> Delivery
                                    </div>                            
                                </div>                                
                            </div>
                            <div className="form-group">
                                <label htmlFor="shipment">Shipment</label>
                                <select className="form-control" id="shipment" onChange={this.handleChange}>
                                    <option defaultValue>Select Shipment...</option>
                                    {shipments && shipments.map(shipment =>
                                        <option value={shipment.shipmentId} key={shipment.shipmentId}>{shipment.shipmentId}</option>
                                    )}
                                </select>
                            </div>
                            { this.state.stopType === "0" ?
                            <div>
                                <div className="row">
                                    <h5 className="col font-weight-bold">Pickup</h5>
                                </div>
                                <div className="row">
                                    {/* <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="pickupFacility">Facility</label>
                                            <input type="text" className="form-control" id="pickupFacility" onChange={event => this.handleChange(event)} />
                                        </div>
                                    </div> */}
                                    <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="actualPickupTime">Arrival Time</label>
                                            <input type="datetime-local" id="actualPickupTime" className="form-control" onChange={event => this.handleChange(event)}/>
                                        </div>
                                    </div>
                                </div>
                            </div>                             
                            :
                            <div>
                                <div className="row">
                                    <h5 className="col font-weight-bold">Delivery</h5>
                                </div>
                                <div className="row">
                                    {/* <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="deliveryFacility">Facility</label>
                                            <input type="text" className="form-control" id="deliveryFacility" onChange={event => this.handleChange(event)} />
                                        </div>
                                    </div> */}
                                    <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="actualDeliveredTime">Arrival Time</label>
                                            <input type="datetime-local" id="actualDeliveredTime" className="form-control" onChange={event => this.handleChange(event)}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            }

                            <button className="btn coyote-green" onClick={(event) => this.handleSubmit(event)}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

export default CustomerTransaction