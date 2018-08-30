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
            <div>
                <div className="card border-light mt-4">
                    <div className="card-header bg-white"><i className="fa fa-search mr-2"></i>Temperature greater than:</div>
                    <div className="card-body">
                        <div className="input-group mb-3 mt-4">
                            <input type="text" className="form-control col-4" onChange={this.handleChange} value={this.state.inputTemperature} />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button" onClick={this.handleSubmit}>Search</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card border-light mt-4">
                    <div className="card-header bg-white">Shipments</div>
                    <div className="card-body">
                        {this.props.user.shipmentStatusQueryResult &&
                            this.props.user.shipmentStatusQueryResult.data.length ?
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
                            :
                            <h4>No Results Found !</h4>
                        }
                    </div>
                </div>
            </div>
        )

    }

}

export default CarrierReporting