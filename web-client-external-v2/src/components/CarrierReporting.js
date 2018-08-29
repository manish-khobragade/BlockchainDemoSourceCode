import React from 'react';


class CarrierReporting extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputTemperature: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        this.props.getCarrierTemperatureQueryResult(this.state.inputTemperature);
    }

    handleChange(event) {
        this.setState({ inputTemperature: event.target.value })
    }
    render() {
        return (
            <div className="w3-panel w3-leftbar w3-sand w3-padding-16">
                <h4>Select all transactions having temperature greater than:</h4>
                <div className="input-group mb-3 mt-4">
                    <input type="text" className="form-control col-4" placeholder="Enter temperature..." onChange={this.handleChange} value={this.state.inputTemperature} />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={this.handleSubmit}>Get</button>
                    </div>
                </div>

                <table className="table table-hover" style={{ visibility: 'hidden' }}>
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
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CarrierReporting