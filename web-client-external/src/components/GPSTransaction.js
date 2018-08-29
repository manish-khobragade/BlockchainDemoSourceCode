import React from 'react';

class GPSTransaction extends React.Component {
    constructor() {
        super()
        this.state = {
            latitudeDir: "N",
            longitudeDir: "N"
        }
    }
    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = {
            readingTime: this.state.readingTime,
            readingDate: this.state.readingDate,
            latitude: this.state.latitude,
            latitudeDir: this.state.latitudeDir,
            longitude: this.state.longitude,
            longitudeDir: this.state.longitudeDir,
            shipment: this.state.shipment
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
                                <div className="col">
                                    <label htmlFor="shipment">Shipment</label>
                                    <input type="text" className="form-control" id="shipment" onChange={event => this.handleChange(event)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col">
                                    <label htmlFor="readingTime">Reading Time</label>
                                    <input type="time" className="form-control" id="readingTime" onChange={event => this.handleChange(event)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col">
                                    <label htmlFor="readingDate">Reading Date</label>
                                    <input type="date" className="form-control" id="readingDate" onChange={event => this.handleChange(event)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col">
                                    <label htmlFor="latitude">Latitude</label>
                                    <input type="text" className="form-control" id="latitude" onChange={event => this.handleChange(event)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col">
                                    <label className="w3-margin-right" htmlFor="latitudeDir">Latitude Direction</label>&nbsp;&nbsp;&nbsp;
                                        <input type="radio" className="w3-radio" id="latitudeDir" name="latitudeDir" value="N" checked={this.state.latitudeDir === "N"} onChange={event => this.handleChange(event)} />&nbsp; North &nbsp;
                                        <input type="radio" className="w3-radio" id="latitudeDir" name="latitudeDir" value="S" checked={this.state.latitudeDir === "S"} onChange={event => this.handleChange(event)} />&nbsp; South &nbsp;
                                        <input type="radio" className="w3-radio" id="latitudeDir" name="latitudeDir" value="E" checked={this.state.latitudeDir === "E"} onChange={event => this.handleChange(event)} />&nbsp; East &nbsp;
                                        <input type="radio" className="w3-radio" id="latitudeDir" name="latitudeDir" value="W" checked={this.state.latitudeDir === "W"} onChange={event => this.handleChange(event)} />&nbsp; West &nbsp;
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col">
                                    <label htmlFor="longitude">Longitude</label>
                                    <input type="text" className="form-control" id="longitude" onChange={event => this.handleChange(event)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col">
                                    <label htmlFor="longitudeDir" className="w3-margin-right">Longitude Direction</label>
                                    <input type="radio" className="w3-radio" id="latitudeDir" name="longitudeDir" value="N" checked={this.state.longitudeDir === "N"} onChange={event => this.handleChange(event)} />&nbsp; North &nbsp;
                                    <input type="radio" className="w3-radio" id="latitudeDir" name="longitudeDir" value="S" checked={this.state.longitudeDir === "N"} onChange={event => this.handleChange(event)} />&nbsp; South &nbsp;
                                    <input type="radio" className="w3-radio" id="latitudeDir" name="longitudeDir" value="E" checked={this.state.longitudeDir === "N"} onChange={event => this.handleChange(event)} />&nbsp; East &nbsp;
                                    <input type="radio" className="w3-radio" id="latitudeDir" name="longitudeDir" value="W" checked={this.state.longitudeDir === "N"} onChange={event => this.handleChange(event)} />&nbsp; West &nbsp;

                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col">
                                    <button type="submit" className="btn w3-teal" onClick={event => this.handleSubmit(event)}>Submit GPS Location</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        )
    }

}

export default GPSTransaction