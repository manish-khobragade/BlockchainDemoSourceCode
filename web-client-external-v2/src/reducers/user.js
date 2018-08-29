const initialState = {
  user: "",
  path: '/',
  notifications: []
}
export default function (state = initialState, action) {

  switch (action.type) {
    case "CHANGE_USER":
      return Object.assign({}, state, {
        user: action.payload
      });

    case "RECEIVE_SHIPMENTS":
      return Object.assign({}, state, {
        shipments: action.payload
      });

    // case "USER_LOGGEDIN":
    //   return Object.assign({}, state, {
    //     userLoggedIn: action.payload
    //   });
    case "TEMPERATURE_QUERY_FETCHED":
      return Object.assign({}, state, {
        temperatureQueryResult: action.payload
      });

    case "SHIPMENT_STATUS_QUERY_FETCHED":
      return Object.assign({}, state, {
        shipmentStatusQueryResult: action.payload
      });
    case "CHANGE_PATH":
      return Object.assign({}, state, {
        path: action.payload
      });
    case "REMOVE_NOTIFICATION":
      return Object.assign({}, state, {
        notifications: state.notifications.filter(notification => { return notification.eventId !== action.payload })
      });
    case "RECEIVE_NOTIFICATION":
      return Object.assign({}, state, {
        notifications: addNotification(state, action)
      });

    case "MARK_ALL_NOTIFICATIONS_READ":
      return Object.assign({}, state, {
        notifications: markAllNotificationsAsRead(state)
      });

    case "SHIPMENT_LOG_RECEIVED":
      return Object.assign({}, state, {
        shipmentLog: action.payload
      });

    default:
      break;
  }
  return state;
}

const addNotification = (state, action) => {
  state.notifications.push(action.payload);
  return state.notifications;
}

const markAllNotificationsAsRead = (state) => {
  return state.notifications.map(notification => {
    return Object.assign(notification, { read: true })
  })
}