import React from 'react';

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
        const userType = this.props.currentUser.split('#')[0].replace('org.coyote.playground.blockchain.demo.', '');

        return (
            <div className="card border-0 mb-3" style={{ minHeight: 780 + 'px', paddingTop: 20 + 'px' }}>
                <div className="container" style={{ marginBottom: 100 + 'px ' }}>
                    <div className="row">
                        <div className="col-4"><i className="fa fa-user-circle-o fa-5x" aria-hidden="true"></i></div>
                        <div className="col-8 mt-auto">
                            <b>{userEmail}</b>
                            <p className="text-muted">{userType}</p>
                        </div>
                    </div>
                </div>

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
                            <a onClick={() => this.logOut()} href="javascript:var w=window.open('https://github.com/logout', '_blank', 'width=600,height=600');" className={navListItemClasses} style={{ marginTop: 100 + 'px' }}><i className="fa fa-sign-out mr-3"></i>Logout</a>
                            <a href='#' onClick={() => this.handleNavLinkClick("/settings")} className={navListItemClasses + `${this.getNavLinkActiveClass("/settings")}`}><i className="fa fa-cog mr-3"></i>Settings</a>
                        </nav>
                    </div>
                </div>
            </div>
        );
    };
}
export default UserEmulate;

