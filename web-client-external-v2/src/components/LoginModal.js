import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import landingPageImage from '../components/carrier-landing-hero.jpg'

const modalRoot = document.getElementById('modal-root');

class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardName: "",
            card: null,
            fileName:""
        }
        this.el = document.createElement('div');
        this.closeModal = this.closeModal.bind(this);
        this.login = this.login.bind(this);
    }
    closeModal() {
        document.getElementsByClassName('modal')[0].style.display = 'none';
    }
    componentDidMount() {
        modalRoot.appendChild(this.el);
            // <img src={landingPageImage} style={{ height: 'auto', width: 100 + '%' }} />
            document.body.style.backgroundImage = "url('./carrier-landing-hero.jpg')";      
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }
    login(){
        window.location = 'http://localhost:4000/auth/github';
    }
    handleChange(event) {
        event.target.id === "cardName" ?
            this.setState({ cardName: event.target.value })
            :
            this.setState({ card: event.target.files[0], fileName:event.target.files[0].name })
    }
    handleSubmit(event) {
        event.preventDefault();
        var cardDetails = new FormData();
        cardDetails.append("card", this.state.card);
        cardDetails.append("name", this.state.cardName);
        this.props.importCard(cardDetails);
        if (this.props.currentUser) {
            this.props.changePath("/dashboard");
        }
    }
    loginContent() {
        return (
            <div>
            {/* <img src={landingPageImage} style={{ height: 'auto', width: 100 + '%' }} /> */}
            <img alt="Not found" src={landingPageImage} style={{ height: 'auto', width: 100 + '%' }} />
                
                <div className="modal" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
                    aria-hidden="true" style={{ backgroundColor: 'rgba(0,0,0,0)', display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalCenterTitle" style={{ color: 'green', fontSize: 24 + 'px' }}>Welcome! Please login</h5>
                            </div>
                            <div className="modal-body">
                                <h6> Upon clicking on login you will be redirected to github for authorization</h6>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-lg btn-success" onClick={this.login}>Login
                                    {/* <a href='https://composer-rest-server-coyote-acl-network.mybluemix.net/auth/github' style={{ color: 'white' }}>Login</a> */}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    cardContent() {
        return (
            <div>
            {/* <img src={landingPageImage} style={{ height: 'auto', width: 100 + '%' }} />                 */}
                <div className="modal" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
                    aria-hidden="true" style={{ backgroundColor: 'rgba(0,0,0,0)', display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalCenterTitle" style={{ color: 'green', fontSize: 24 + 'px' }}>Please upload your card</h5>
                            </div>
                            <div className="modal-body">
                                <div className="row justify-content-center">
                                    <div className="p-3">
                                        <h4>Card Authentication</h4>
                                        <div className="input-group">
                                            <div className="custom-file mb-3">
                                                <input type="file" className="custom-file-input" id="inputGroupFile02" onChange={(event) => this.handleChange(event)}/>
                                                <label className="custom-file-label" htmlFor="inputGroupFile02">{this.state.card?this.state.fileName:'Choose file'}</label>
                                            </div>
                                            <div className="input-group">
                                                <input id="cardName" type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter card Name" onChange={(event) => this.handleChange(event)} />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-lg btn-success" onClick={(event) => this.handleSubmit(event)}>Upload </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    modalContent = () => {
        if (this.props.showCard) {
            return this.cardContent();
        }
        else {
            return this.loginContent();
        }

    }

    render() {
        return ReactDOM.createPortal(
            this.modalContent(),
            this.el,
        );
    }
}

export default LoginModal;