import React from 'react';
import constants from '../common';

class GPSTransaction extends React.Component {
    
    handleChange(event) {
        this.setState({
            [event.target.id] : event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
     const formData = {         
        readingTime : this.state.readingTime,
        readingDate : this.state.readingDate,
        latitude : this.state.latitude,
        latitudeDir : this.state.latitudeDir,
        longitude : this.state.longitude,
        longitudeDir : this.state.longitudeDir,
        shipment : this.state.shipment
     }
        this.props.submitGPS(formData);
    }
    render() {
        return (
            <div>
                <h2 className="w3-text-grey w3-padding-16"><i className="fa fa-map-marker fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>GPS Reading</h2>
                <div className="w3-panel w3-leftbar w3-sand w3-padding-16">
    
                    <div className="col-8">
                        {/* <h4> GPS Readings</h4> */}
                        <form>
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
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="readingTime">Reading Time</label>
                                        <input type="time" className="form-control" id="readingTime" onChange={event => this.handleChange(event)} />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="readingDate">Reading Date</label>
                                        <input type="date" className="form-control" id="readingDate" onChange={event => this.handleChange(event)} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="latitude">Latitude</label>
                                        <input type="text" className="form-control" id="latitude" onChange={event => this.handleChange(event)} />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="latitudeDir">Latitude Direction</label>
                                            <select className="form-control" id="latitudeDir" onChange={event => this.handleChange(event)}>
                                                <option defaultValue>Select Direction</option>
                                                {constants.DIRECTIONS.map(direction =>
                                                    <option value={direction.value} key={direction.value}>{direction.label}</option>                                        
                                                )}
                                            </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="longitude">Longitude</label>
                                        <input type="text" className="form-control" id="longitude" onChange={event => this.handleChange(event)} />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="longitudeDir">Longitude Direction</label>
                                        <select className="form-control" id="longitudeDir" onChange={event => this.handleChange(event)}>
                                                <option defaultValue>Select Direction</option>
                                                {constants.DIRECTIONS.map(direction =>
                                                    <option value={direction.value} key={direction.value}>{direction.label}</option>                                        
                                                )}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn w3-teal" onClick={event => this.handleSubmit(event)}>Submit GPS Location</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default GPSTransaction