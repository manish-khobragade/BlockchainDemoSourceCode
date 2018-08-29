import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationComponent = (props) =>  {  
    return (
      props.currentUser.user.includes("Carrier") ?
      <ul className="nav">
          <li className="nav-item">
            <NavLink to='/create-shipment' className="nav-link" activeClassName="active">Shipment</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/customer-transaction' className="nav-link" activeClassName="active">Transactions</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/customer-reporting' className="nav-link" activeClassName="active">Reporting</NavLink>
          </li>          
        </ul>
        :
        <ul className="nav">
          <li className="nav-item">
            <NavLink to='/accept-shipment' className="nav-link" activeClassName="active">Shipment</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/carrier-transaction' className="nav-link" activeClassName="active">Transactions</NavLink>
          </li>
        <li className="nav-item">
          <NavLink to='/carrier-reporting' className="nav-link" activeClassName="active">Reporting</NavLink>
        </li>          
      </ul>

    )  
}

export default NavigationComponent;