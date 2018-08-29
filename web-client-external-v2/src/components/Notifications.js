import React from 'react';

const Notifications = (props) => {
    console.log(props);
    return (
        <ul className="list-group border-0 list-group-flush">
            <li className="list-group-item justify-content-between align-items-center">
                <h2><i className="fa fa-bell mr-3">Notifications</i></h2>                
            </li>
            {props.notifications.map((notification) => {
                return (
                    <li className="list-group-item justify-content-between align-items-center" key={notification.eventId}>
                        <span>
                            <span><b>{notification.type}</b></span><br />
                            <span className="text-muted">{notification.message}</span>
                        </span>
                        <span className="badge float-right">
                            <h4><i className="btn fa fa-times" onClick={()=>{props.removeNotification(notification.eventId)}}></i></h4>
                        </span>
                    </li>)
            })
            }
        </ul>
    );
}

export default Notifications;