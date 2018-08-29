import React from 'react';

class CustomerTransaction extends React.Component {
    constructor(props) {
        super(props)

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
        this.props.receiveShipment(this.state.shipmentId);
    }
    render() {
        return (
            <div>
                <h2 className="w3-text-grey w3-padding-16"><i className="fa fa-sticky-note fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Transactions</h2>
                <div className="w3-panel w3-leftbar w3-sand w3-padding-16">
                <div className="col-5">
                    <h4>Confirm arrival of a Shipment</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="shipmentId">Shipment Id</label>
                            <select className="form-control" id="shipmentId" onChange={this.handleChange}>
                                <option defaultValue>Select Shipment...</option>
                                {this.props.user.shipments && this.props.user.shipments.map(shipment =>
                                    <option value={shipment.shipmentId} key={shipment.shipmentId}>{shipment.shipmentId}</option>
                                )}
                            </select>

                            {/* <input type="text" className="form-control" id="shipmentId" onChange={(event) => this.handlechange(event)} /> */}
                        </div>
                            <button className="btn w3-teal" onClick={(event) => this.handleSubmit(event)}>Shipment Arrived</button>
                    </form>
                    </div>
                </div>
            </div>
        )
    }

}

export default CustomerTransaction