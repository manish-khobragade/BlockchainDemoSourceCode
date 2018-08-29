const initialState = {
  user: "",
  path:'/'
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

    default:
      break;
  }
  return state;
}