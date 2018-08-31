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

                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="staticEmail" className="col-form-label font-weight-bold">Commodity</label>
                                        </div>
                                        <div className="col d-inline-block">
                                            <label type="text" readOnly className="form-control-plaintext" id="staticEmail"> {this.props.shipment.type}</label>
                                        </div>
                                    </div>

                                </div>

                                <div className="col">

                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="staticEmail" className="col-form-label font-weight-bold">Contract</label>
                                        </div>
                                        <div className="col  d-inline-block">
                                            <label type="text" readOnly className="form-control-plaintext" id="staticEmail">{this.props.shipment.contract.split('#')[1]}</label>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col">

                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="staticEmail" className="col-form-label font-weight-bold">Status</label>
                                        </div>
                                        <div className="col d-inline-block">
                                            <label type="text" readOnly className="form-control-plaintext" id="staticEmail">{this.props.shipment.status}</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col">

                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="staticEmail" className="col-form-label font-weight-bold">Temperature Readings</label>
                                        </div>
                                        <div className="col d-inline-block">
                                            <label type="text" readOnly className="form-control-plaintext" id="staticEmail">{this.props.shipment.temperatureReadings.map((temperature) => temperature.centigrade + ", ")}</label>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col">

                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="staticEmail" className="col-form-label font-weight-bold">Unit Count</label>
                                        </div>
                                        <div className="col d-inline-block">
                                            <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={this.props.shipment.unitCount} />
                                        </div>
                                    </div>
                                </div>

                                <div className="col">

                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="staticEmail" className="col-form-label font-weight-bold">GPS Readings</label>
                                        </div>

                                        <div className="col d-inline-block">
                                            <label className="form-control-plaintext" id="staticEmail">{this.props.shipment.gpsReadings.map((gps) => "[" + gps.latitude + gps.latitudeDir + " " + gps.longitude + gps.longitudeDir + "], ")}</label>
                                        </div>
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
                                {this.props.shipmentLog  &&
                                 this.props.shipmentLog.length ?
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
                                    :
                                    <h5>No Logs Found</h5>
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        );
    }
}

export default ShipmentDetails;