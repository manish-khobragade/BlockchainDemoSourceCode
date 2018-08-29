import thunkMiddleware from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import allReducers from './reducers';


export default function configureStore() {
    return createStore(
      allReducers,
        applyMiddleware(thunkMiddleware)      
    );
  }
