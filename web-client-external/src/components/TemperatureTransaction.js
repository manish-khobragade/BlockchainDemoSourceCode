import React from 'react';

class TemperatureTransaction extends React.Component {
     handleChange(event) {
        this.setState({
            [event.target.id] : event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
     const formData = {         
        centigrade : this.state.centigrade,
         shipment : this.state.shipment
     }
        this.props.submitTemperature(formData);
    }
    render() {
        return (
            <div>
                <h2 className="w3-text-grey w3-padding-16"><i className="fa fa-thermometer-full fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Temperature Reading</h2>                
                <div className="w3-panel w3-leftbar w3-sand w3-padding-16">
                    <div className="col-6">
                        <h4>Temperature Readings</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="shipment">Shipment</label>
                                <input type="text" className="form-control" id="shipment" onChange={event => this.handleChange(event)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="centigrade">Temperature</label>
                                <input type="text" className="form-control" id="centigrade" onChange={event => this.handleChange(event)} />
                            </div>
                            <button type="submit" className="btn w3-teal" onClick={event => this.handleSubmit(event)}>Submit Temperature</button>
                        </form>
                    </div>
    
                </div>
            </div>
        )
    }
    
}

export default TemperatureTransaction