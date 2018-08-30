import React from 'react';

class ShipmentDetails extends React.Component {

    componentDidMount() {
        let shipment = "resource:org.coyote.playground.blockchain.demo.Shipment#" + this.props.shipment.shipmentId;
        this.props.getShipmentLogs(shipment, this.props.shipment.contract.split('#')[1]);
    }
    render() {

        return (
            <div>
                <a className="btn  font-weight-bold" onClick={this.props.showShipments}><i className="fa fa-arrow-left font-weight-bold"></i> Back</a>
                <div className="card border-light mt-4">
                    <div className="card-header bg-white">Shipment ID: {this.props.shipment.shipmentId}</div>
                    <div className="card-body">
                        <form>
                            <div className="form-group row">
                                <div className="col">
                                    <label htmlFor="staticEmail" className="col-form-label font-weight-bold">Commodity</label>
                                    <div className="col-sm-4">
                                        <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={this.props.shipment.type} />
                                    </div>
                                </div>
                                <div className="col">
                                    <label htmlFor="staticEmail" className="col-form-label font-weight-bold">Contract</label>
                                    <div className="col-sm-16">
                                        <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={this.props.shipment.contract.split('#')[1]} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col">
                                    <label htmlFor="staticEmail" className="col-form-label font-weight-bold">Status</label>
                                    <div className="col-sm-4">
                                        <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={this.props.shipment.status} />
                                    </div>
                                </div>
                                <div className="col">
                                    <label htmlFor="staticEmail" className="col-form-label font-weight-bold">Temperature Readings</label>
                                    <div className="col-sm-16">
                                        <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={this.props.shipment.temperatureReadings.map((temperature) => temperature.centigrade + ", ")} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col">
                                    <label htmlFor="staticEmail" className="col-form-label font-weight-bold">Unit Count</label>
                                    <div className="col-sm-4">
                                        <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={this.props.shipment.unitCount} />
                                    </div>
                                </div>
                                <div className="col">
                                    <label htmlFor="staticEmail" className="col-form-label font-weight-bold">GPS Readings</label>
                                    <div className="col-sm-16">
                                        <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={this.props.shipment.gpsReadings.map((gps) => "[" + gps.latitude + gps.latitudeDir + " " + gps.longitude + gps.longitudeDir + "], ")} />
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
                <div className="card border-light mt-4">
                    <div className="card-header bg-white">Log</div>
                    <div className="card-body log-container">

                        <div className="container">
                            <div className="row log-row">
                                {this.props.shipmentLog &&
                                    this.props.shipmentLog.map(log => {
                                        return (
                                            <div className="card text-center col3 log-card" key={log.key}>
                                                <div className="card-body">
                                                    <p className="card-text"><i className={`${log.type === 'transaction' ? 'fa fa-list-ul text-muted' : 'fa fa-exclamation-circle'}`}></i></p>
                                                    <p className="card-text">{log.timeStamp}</p>
                                                    <p className="card-text"><b>{log.state}</b></p>
                                                    {/* <p className="card-text">{log.invokingParticipant}</p> */}
                                                </div>
                                            </div>)
                                    })
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default ShipmentDetails;