import React from 'react';

class TemperatureTransaction extends React.Component {
    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = {
            centigrade: this.state.centigrade,
            shipment: this.state.shipment
        }
        this.props.submitTemperature(formData);
    }
    render() {
        return (
            <div className="card border-light mt-4">
                <div className="card-header bg-white"><i className="fa fa-thermometer-full mr-2"></i>Temperature Reading</div>
                <div className="card-body">
                    <form className="w-50">
                        <div className="form-group">
                            <label htmlFor="shipment">Shipment</label>
                            <select className="form-control" id="shipment" onChange={event => this.handleChange(event)}>
                                <option defaultValue>Select Shipment...</option>
                                {this.props.user.shipments &&
                                    this.props.user.shipments.filter(shipment => shipment.status === "PICKEDUP"
                                    ).map(shipment =>
                                        <option value={shipment.shipmentId} key={shipment.shipmentId}>{shipment.shipmentId}</option>
                                    )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="centigrade">Temperature</label>
                            <input type="text" className="form-control" id="centigrade" onChange={event => this.handleChange(event)} />
                        </div>
                        <button type="submit" className="btn coyote-green" onClick={event => this.handleSubmit(event)}>Submit Temperature</button>
                    </form>
                </div>

            </div>
        )
    }

}

export default TemperatureTransaction