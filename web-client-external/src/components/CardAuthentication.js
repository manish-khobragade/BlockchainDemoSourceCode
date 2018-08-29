import React from 'react';

class CardAuthentication extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cardName: "",
            card: null
        }
    }
    componentDidMount() {
        if (this.props.user === null) {
            this.props.getCardDetailsPing();
            //check for first time login and not directly to dashboard          
            this.props.history.push("/dashboard");
        }
    }

    handleChange(event) {
        event.target.id === "cardName" ?
            this.setState({ cardName: event.target.value })
            :
            this.setState({ card: event.target.files[0] })
    }
    handleSubmit(event) {
        event.preventDefault();
        var cardDetails = new FormData();
        cardDetails.append("card", this.state.card);
        cardDetails.append("name", this.state.cardName);
        this.props.importCard(cardDetails);
        if (this.props.currentUser) {
            this.props.history.push("/dashboard");
        }
    }
    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-lg offset-5">
                    <div className="card-auth-container">
                        <h4>Card Authentication</h4>
                        <form>
                            <div className="form-group form-file-upload form-file-multiple">
                                <input type="file" multiple="" className="inputFileHidden" onChange={(event) => this.handleChange(event)} />
                                <div className="input-group">
                                    <input type="text" className="form-control inputFileVisible" placeholder="Upload Card" onChange={(event) => this.handleChange(event)} />
                                    <span className="input-group-btn">
                                        <button type="button" className="btn btn-fab btn-round w3-teal">
                                            <i className="material-icons">publish</i>
                                        </button>
                                    </span>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="cardName">Card Name</label>
                                <input id="cardName" type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter card Name" onChange={(event) => this.handleChange(event)} />
                            </div>
                            <div className="form-group">
                                <button className="btn w3-teal" onClick={(event) => this.handleSubmit(event)}>Submit Card</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

export default CardAuthentication;