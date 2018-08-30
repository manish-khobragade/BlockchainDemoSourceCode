import React from 'react';
// import personImage from './person-default.png'
// import { Link } from 'react-router-dom'
class UserEmulate extends React.Component {

    componentDidMount() {
        sessionStorage.userLoggedIn = true;
    }

    handleNavLinkClick(path) {
        this.props.changePath(path);

        if (path === "/notifications") {
            this.props.markAllNotificationsAsRead();
        }
    }

    logOut() {
        window.sessionStorage.clear();
        // var cookieName = "userLoggedIn";
        // document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    getNavLinkActiveClass(navItemPath) {
        return this.props.path === navItemPath ? ' activeNav text-dark font-weight-bold' : '';
    }

    render() {
        const navListItemClasses = "list-group-item list-group-item-action border-0 text-secondary";
        const unreadNotificationsCount = this.props.notifications.filter((notification) => { return notification.read === false }).length;
        const showNotificationsCount = this.props.path !== "/notifications" && unreadNotificationsCount > 0;
        const userEmail = this.props.currentUser.split('#')[1];
        const userType = this.props.currentUser.split('#')[0].replace('org.coyote.playground.blockchain.demo.','');
        return (
            <div className="card border-0 mb-3" style={{ minHeight: 780 + 'px', paddingTop: 20 + 'px' }}>
                <div className="container mb-4">
                    <div className="row">
                        <div className="col-4"><i className="fa fa-user-circle-o fa-5x" aria-hidden="true"></i></div>
                        <div className="col-8">
                        <b>{userEmail}</b>
                        <p className="text-muted">{userType}</p>
                        </div>
                    </div>
                </div>

                {/* <div className="card border-light" style={{ textAlign: 'center', marginBottom: 20 + 'px', display: 'flex', borderTop: 0 }}> */}
                    {/* <img src={personImage} style={{ width: 50 + '%' }} alt="Avatar" /> */}
                    {/* <div style={{ paddingTop: 10 + 'px', paddingBottom: 20 + 'px' }}> */}
                        {/* <i className="fa fa-user-circle-o fa-5x" aria-hidden="true"></i> */}
                        {/* <div className="w3-text-black"> */}
                            {/* <div><b>{this.props.currentUser.split('#')[1]}</b></div> */}
                        {/* </div> */}
                    {/* </div> */}
                {/* </div> */}
                <div>
                    <div className="">
                        <nav id="mySidebar">
                            {this.props.currentUser.includes("Customer") ?
                                <div>
                                    <div className="list-group list-group-flush">
                                        <a href="#" onClick={() => this.handleNavLinkClick("/create-shipment")} className={navListItemClasses + `${this.getNavLinkActiveClass("/create-shipment")}`}><i className="fa fa-truck mr-3"></i>Shipments</a>
                                        <a href="#" onClick={() => this.handleNavLinkClick("/customer-transaction")} className={navListItemClasses + `${this.getNavLinkActiveClass("/customer-transaction")}`}><i className="fa fa-outdent mr-3"></i>Shipment Transactions</a>
                                        <a href="#" onClick={() => this.handleNavLinkClick("/customer-reporting")} className={navListItemClasses + `${this.getNavLinkActiveClass("/customer-reporting")}`}><i className="fa fa-search mr-3"></i>Search</a>
                                        <a href="#" onClick={() => this.handleNavLinkClick("/notifications")} className={navListItemClasses + `${this.getNavLinkActiveClass("/notifications")}`}><i className="fa fa-bell mr-3"></i>Notifications
                                            {showNotificationsCount && <span className="badge badge-danger badge-pill float-right">{unreadNotificationsCount}</span>}
                                        </a>
                                    </div>
                                </div>
                                :
                                <div>
                                    <a href="#" onClick={() => this.handleNavLinkClick("/accept-shipment")} className={navListItemClasses + `${this.getNavLinkActiveClass("/accept-shipment")}`}><i className="fa fa-truck mr-3"></i>Shipments</a>
                                    <a href="#" onClick={() => this.handleNavLinkClick("/temperature-transaction")} className={navListItemClasses + `${this.getNavLinkActiveClass("/temperature-transaction")}`}><i className="fa fa-thermometer-full mr-3"></i>Temperature Transactions</a>
                                    <a href="#" onClick={() => this.handleNavLinkClick("/gps-transaction")} className={navListItemClasses + `${this.getNavLinkActiveClass("/gps-transaction")}`}><i className="fa fa-map-marker mr-3"></i>GPS Transactions</a>
                                    <a href="#" onClick={() => this.handleNavLinkClick("/carrier-reporting")} className={navListItemClasses + `${this.getNavLinkActiveClass("/carrier-reporting")}`}><i className="fa fa-search mr-3"></i>Search</a>
                                    <a href="#" onClick={() => this.handleNavLinkClick("/notifications")} className={navListItemClasses + `${this.getNavLinkActiveClass("/notifications")}`}><i className="fa fa-bell mr-3"></i>Notifications
                                        {showNotificationsCount && <span className="badge badge-danger badge-pill float-right">{unreadNotificationsCount}</span>}
                                    </a>
                                </div>
                            }
                            <a onClick={() => this.logOut()} href='/' className={navListItemClasses} style={{ marginTop: 100 + 'px' }}><i className="fa fa-sign-out mr-3"></i>Logout</a>
                            <a href='#' onClick={() => this.handleNavLinkClick("/settings")} className={navListItemClasses + `${this.getNavLinkActiveClass("/settings")}`}><i className="fa fa-cog mr-3"></i>Settings</a>
                        </nav>
                    </div>
                </div>
            </div>
        );
    };
}
export default UserEmulate;

