/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShipmentComponent } from './Shipment/Shipment.component';
import { ContractComponent } from './Contract/Contract.component';
import { CustomerComponent } from './Customer/Customer.component';
import { CarrierComponent } from './Carrier/Carrier.component';
import { BrokerComponent } from './Broker/Broker.component';
import { FacilityComponent } from './Facility/Facility.component';
import { TemperatureReadingComponent } from './TemperatureReading/TemperatureReading.component';
import { GpsReadingComponent } from './GpsReading/GpsReading.component';
import { ShipmentReceivedComponent } from './ShipmentReceived/ShipmentReceived.component';
import { ShipmentAcceptedComponent } from './ShipmentAccepted/ShipmentAccepted.component';
import { QueryComponent } from './query/query.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Shipment', component: ShipmentComponent },
  { path: 'Contract', component: ContractComponent },
  { path: 'Customer', component: CustomerComponent },
  { path: 'Carrier', component: CarrierComponent },
  { path: 'Broker', component: BrokerComponent },
  { path: 'Facility', component: FacilityComponent },
  { path: 'TemperatureReading', component: TemperatureReadingComponent },
  { path: 'GpsReading', component: GpsReadingComponent },
  { path: 'ShipmentReceived', component: ShipmentReceivedComponent },
  { path: 'ShipmentAccepted', component: ShipmentAcceptedComponent },
  { path: 'Query', component: QueryComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
