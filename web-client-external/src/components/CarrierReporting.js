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
                    <div className="">
                        <button className="w3-button w3-teal" type="button" onClick={this.handleSubmit}><i class="fa fa-search fa-lg" aria-hidden="true"></i></button>
                    </div>
                </div>

                <table className="table table-hover mt-4">
                    <thead className="w3-teal">
                        <tr>
                            <th scope="col">Shipment Id</th>
                            <th scope="col">Centigrate</th>
                            <th scope="col">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.user.temperatureQueryResult &&
                            this.props.user.temperatureQueryResult.data.map((result) =>
                                <tr>
                                    <th scope="row">{result.shipment.split('#')[1]}</th>
                                    <td>{result.centigrade} &deg;C</td>
                                    <td>{result.timestamp}</td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CarrierReporting