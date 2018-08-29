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

import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Shipment, TemperatureReading } from '../org.coyote.playground.blockchain.demo';
import 'rxjs';

// Can be injected into a constructor
@Injectable()
export class QueryService {

  private NAMESPACE = 'queries';

  constructor(private tempDataService: DataService<TemperatureReading>, private shipDataService: DataService<Shipment>) {
  };


  public getAllByTemperature(temperature: any): Observable<TemperatureReading[]> {
    return this.tempDataService.getAll(this.NAMESPACE+'/filterTemperatureTransaction?temperature='+temperature);
  }

  public getAllByStatus(status: any): Observable<Shipment[]> {
    return this.shipDataService.getAll(this.NAMESPACE+'/filterShipmentAsset?status='+status);
  }

}
