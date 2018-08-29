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
        return this.props.path === navItemPath ? ' activeNav' : '';
    }
    
    render() {
        const navListItemClasses = "list-group-item list-group-item-action border-0";
        const unreadNotificationsCount = this.props.notifications.filter((notification) => { return notification.read === false }).length;
        const showNotificationsCount = this.props.path !== "/notifications" && unreadNotificationsCount > 0;

        return (
            <div className="w3-white w3-text-grey" style={{ minHeight: 780 + 'px', paddingTop: 20 + 'px' }}>
                <div className="card border-light" style={{ textAlign: 'center', marginBottom: 20 + 'px', display:'flex', borderTop: 0 }}>
                    {/* <img src={personImage} style={{ width: 50 + '%' }} alt="Avatar" /> */}
                    <div style={{paddingTop:10 + 'px', paddingBottom: 20 +'px'}}>
                        <i className="fa fa-user-circle-o fa-5x" aria-hidden="true"></i>
                        <div className="w3-text-black">
                            <div><b>{this.props.currentUser.split('#')[1]}</b></div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="">
                        <nav id="mySidebar">
                            {this.props.currentUser.includes("Customer") ?
                                <div>
                                    {/* <p className="w3-hover-teal"><a onClick={() => this.pathChange("/create-shipment")} className="w3-bar-item w3-button w3-hover-teal">Shipments</a></p>                                    
                                    <p className="w3-hover-teal"><a onClick={() => this.pathChange("/customer-transaction")} className="w3-bar-item w3-button w3-hover-teal">Shipment Transactions</a></p>
                                    <p className="w3-hover-teal"><a onClick={() => this.pathChange("/customer-reporting")} className="w3-bar-item w3-button w3-hover-teal">Reporting</a></p> */}
                                    <div className="list-group list-group-flush">
                                        <a href="#" onClick={() => this.handleNavLinkClick("/create-shipment")} className={navListItemClasses + `${this.getNavLinkActiveClass("/create-shipment")}`}><i className="fa fa-truck mr-2"></i>Shipments</a>
                                        <a href="#" onClick={() => this.handleNavLinkClick("/customer-transaction")} className={navListItemClasses + `${this.getNavLinkActiveClass("/customer-transaction")}`}><i className="fa fa-outdent mr-2"></i>Shipment Transactions</a>
                                        <a href="#" onClick={() => this.handleNavLinkClick("/customer-reporting")} className={navListItemClasses + `${this.getNavLinkActiveClass("/customer-reporting")}`}><i className="fa fa-search mr-2"></i>Search</a>
                                        <a href="#" onClick={() => this.handleNavLinkClick("/notifications")} className={navListItemClasses + `${this.getNavLinkActiveClass("/notifications")}`}><i className="fa fa-bell mr-2"></i>Notifications
                                        {showNotificationsCount && <span className="badge badge-danger badge-pill float-right">{unreadNotificationsCount}</span>}
                                        </a>
                                    </div>
                                    {/* <div className="" onClick={() => this.pathChange("/create-shipment")}><a className="">Shipments</a></div>
                                    <div className="" onClick={() => this.pathChange("/customer-transaction")}><a className=" ">Shipment Transactions</a></div>
                                    <div className="" onClick={() => this.pathChange("/customer-reporting")}><a className="">Reporting</a></div> */}
                                </div>
                                :
                                <div>
                                    {/* <p className="w3-hover-teal"><a onClick={() => this.pathChange("/accept-shipment")} className="w3-bar-item w3-button w3-hover-teal">Shipments</a></p>
                                    <p className="w3-hover-teal"><a onClick={() => this.pathChange("/temperature-transaction")} className="w3-bar-item w3-button w3-hover-teal">Temperature Transactions</a></p>
                                    <p className="w3-hover-teal"><a onClick={() => this.pathChange("/gps-transaction")} className="w3-bar-item w3-button w3-hover-teal">GPS Transactions</a></p>
                                    <p className="w3-hover-teal"><a onClick={() => this.pathChange("/carrier-reporting")} className="w3-bar-item w3-button w3-hover-teal">Reporting</a></p>
 */}

                                    {/* <a  href="#" className="w3-margin-bottom w3-padding-small" onClick={() => this.pathChange("/accept-shipment")}><i className="w3-bar-item w3-button w3-hover-teal"></i>Shipments</a>
                                    <div className="w3-margin-bottom w3-padding-small" onClick={() => this.pathChange("/temperature-transaction")}><a className="w3-bar-item w3-button w3-hover-teal ">Temperature Transactions</a></div>
                                    <div className="w3-margin-bottom w3-padding-small" onClick={() => this.pathChange("/gps-transaction")}><a className="w3-bar-item w3-button w3-hover-teal">GPS Transactions</a></div> */}
                                    {/* <div className="w3-padding-small" onClick={() => this.pathChange("/carrier-reporting")}><a className="w3-bar-item w3-button w3-hover-teal">Reporting</a></div> */}

                                        <a href="#" onClick={() => this.handleNavLinkClick("/accept-shipment")} className={navListItemClasses + `${this.getNavLinkActiveClass("/accept-shipment")}`}><i className="fa fa-truck mr-2"></i>Shipments</a>
                                        <a href="#" onClick={() => this.handleNavLinkClick("/temperature-transaction")} className={navListItemClasses + `${this.getNavLinkActiveClass("/temperature-transaction")}`}><i className="fa fa-bell mr-2"></i>Temperature Transactions</a>
                                        <a href="#" onClick={() => this.handleNavLinkClick("/gps-transaction")} className={navListItemClasses + `${this.getNavLinkActiveClass("/gps-transaction")}`}><i className="fa fa-search mr-2"></i>GPS Transactions</a>
                                        <a href="#" onClick={() => this.handleNavLinkClick("/carrier-reporting")} className={navListItemClasses + `${this.getNavLinkActiveClass("/carrier-reportings")}`}><i className="fa fa-bell mr-2"></i>Reporting</a>
                                        {/* <a href="#" onClick={() => this.handleNavLinkClick("/carrier-reporting")} className={navListItemClasses + `${this.getNavLinkActiveClass("/carrier-reportings")}`}><i className="fa fa-bell mr-2"></i>Reporting</a> */}



                                </div>
                            }
                            <a onClick={() => this.logOut()} href='/' className={navListItemClasses} style={{ marginTop: 100 + 'px' }}><i className="fa fa-sign-out mr-2"></i>Logout</a>
                            <a href='#' onClick={() => this.handleNavLinkClick("/settings")} className={navListItemClasses + `${this.getNavLinkActiveClass("/settings")}`}><i className="fa fa-cog mr-2"></i>Settings</a>
                        </nav>
                    </div>
                </div>
            </div>
        );
    };
}
export default UserEmulate;

