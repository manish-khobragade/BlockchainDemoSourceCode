import React from 'react';

class ReportingComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputStatus: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit() {
        this.props.getCustShipmentStatusQueryResult(this.state.inputStatus);
    }

    handleChange(event) {
        this.setState({ inputStatus: event.target.value })
    }

    render() {
        return (
            <div>
                <div className="card border-light mt-4">
                    <div className="card-header bg-white"><i className="fa fa-search mr-2"></i>Shipments With Status:</div>
                    <div className="card-body">
                        <div className="input-group mt-4">
                            <select className="custom-select col-4" id="status" onChange={this.handleChange}>
                                <option  defaultValue>Select status...</option>
                                <option value="CREATED">CREATED</option>
                                <option value="ACCEPTED">ACCEPTED</option>
                                <option value="PICKEDUP">PICKEDUP</option>
                                <option value="DELIVERED">DELIVERED</option>
                                <option value="INVOICED">INVOICED</option>
                            </select>
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary btn-secondary" type="button" onClick={this.handleSubmit}>Search</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card border-light mt-4">
                    <div className="card-header bg-white">Shipments</div>
                    <div className="card-body">
                    {this.props.user.shipmentStatusQueryResult && 
                        this.props.user.shipmentStatusQueryResult.data.length ?
                        <table className="table table-hover">
                        <thead className="thead-light rounded">
                                <tr>
                                    <th scope="col">Shipment Id</th>
                                    <th scope="col">Commodity</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Unit Count</th>
                                    <th scope="col">Contract</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.user.shipmentStatusQueryResult &&
                                    this.props.user.shipmentStatusQueryResult.data.map((shipment) =>
                                        <tr key={shipment.shipmentId}>
                                            <th scope="row">{shipment.shipmentId}</th>
                                            <td>{shipment.type}</td>
                                            <td>{shipment.status}</td>
                                            <td>{shipment.unitCount}</td>
                                            <td>{shipment.contract.substring(shipment.contract.lastIndexOf("#") + 1)}</td>
                                        </tr>
                                    )}
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

export default ReportingComponent