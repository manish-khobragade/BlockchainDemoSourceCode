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

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
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
import { ToastModule } from 'ng2-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShipmentComponent,
    ContractComponent,
    CustomerComponent,
    CarrierComponent,
    BrokerComponent,
    FacilityComponent,
    TemperatureReadingComponent,
    GpsReadingComponent,
    ShipmentReceivedComponent,
    ShipmentAcceptedComponent,
    QueryComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    ToastModule.forRoot()
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
