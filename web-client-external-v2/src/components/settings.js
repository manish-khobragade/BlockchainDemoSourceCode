import React from 'react';

class Settings extends React.Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handlechange.bind(this);
    }

    handlechange(event) {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    render() {
        return (
            <div>
                <div className="card border-light mt-4">
                    <div className="card-header bg-white"><i className="fa fa-cog mr-2"></i> Settings</div>
                    <div className="card-body">
                        <form>

                            <div className="form-group row">
                                <div className="col">
                                    <label for="inputPassword" className="col-form-label">Setting Name</label>
                                </div>
                                <div className="col">
                                    <label className="switch">
                                        <input type="checkbox" />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>
                            
                            <div className="form-group row">
                                <div className="col">
                                    <label for="inputPassword" className="col-form-label">Setting Name</label>
                                </div>
                                <div className="col">
                                    <label className="switch">
                                        <input type="checkbox" />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>
                            
                            <div className="form-group row">
                                <div className="col">
                                    <label for="inputPassword" className="col-form-label">Setting Name</label>
                                </div>
                                <div className="col">
                                    <label className="switch">
                                        <input type="checkbox" />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>
                            
                            <div className="form-group row">
                                <div className="col">
                                    <label for="inputPassword" className="col-form-label">Setting Name</label>
                                </div>
                                <div className="col">
                                    <label className="switch">
                                        <input type="checkbox" />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

export default Settings;