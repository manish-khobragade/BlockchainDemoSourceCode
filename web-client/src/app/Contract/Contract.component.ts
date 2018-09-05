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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ContractService } from './Contract.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-contract',
  templateUrl: './Contract.component.html',
  styleUrls: ['./Contract.component.css'],
  providers: [ContractService]
})
export class ContractComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  contractId = new FormControl('', Validators.required);
  customer = new FormControl('', Validators.required);
  carrier = new FormControl('', Validators.required);
  broker = new FormControl('', Validators.required);
  unitPrice = new FormControl('', Validators.required);
  brokerMargin = new FormControl('', Validators.required);
  minTemperature = new FormControl('', Validators.required);
  maxTemperature = new FormControl('', Validators.required);
  minTempViolationPenalty = new FormControl('', Validators.required);
  maxTempViolationPenalty = new FormControl('', Validators.required);
  pickupLateFee = new FormControl('', Validators.required);
  deliveryLateFee = new FormControl('', Validators.required);

  constructor(private serviceContract: ContractService, fb: FormBuilder) {
    this.myForm = fb.group({
      contractId: this.contractId,
      customer: this.customer,
      carrier: this.carrier,
      broker: this.broker,      
      unitPrice: this.unitPrice,
      brokerMargin: this.brokerMargin,
      minTemperature: this.minTemperature,
      maxTemperature: this.maxTemperature,
      minTempViolationPenalty: this.minTempViolationPenalty,
      maxTempViolationPenalty: this.maxTempViolationPenalty,
      pickupLateFee: this.pickupLateFee,
      deliveryLateFee: this.deliveryLateFee,
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceContract.getAll()
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        result.forEach(asset => {
          tempList.push(asset);
        });
        this.allAssets = tempList;
      })
      .catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else if (error === '404 - Not Found') {
          this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        } else {
          this.errorMessage = error;
        }
      });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.coyote.playground.blockchain.demo.Contract',
      'contractId': this.contractId.value,
      'customer': this.customer.value,
      'carrier': this.carrier.value,
      'broker': this.broker.value,
      'unitPrice': this.unitPrice.value,
      'brokerMargin': this.brokerMargin.value,
      'minTemperature': this.minTemperature.value,
      'maxTemperature': this.maxTemperature.value,
      'minTempViolationPenalty': this.minTempViolationPenalty.value,
      'maxTempViolationPenalty': this.maxTempViolationPenalty.value,
      'pickupLateFee': this.pickupLateFee.value,
      'deliveryLateFee': this.deliveryLateFee.value,
    };

    this.myForm.setValue({
      'contractId': null,
      'customer': null,
      'carrier': null,
      'broker': null,      
      'unitPrice': null,
      'brokerMargin': null,
      'minTemperature': null,
      'maxTemperature': null,
      'minTempViolationPenalty': null,
      'maxTempViolationPenalty': null,
      'pickupLateFee': null,
      'deliveryLateFee': null
    });

    return this.serviceContract.addAsset(this.asset)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
        this.myForm.setValue({
          'contractId': null,
          'customer': null,
          'carrier': null,
          'broker': null,         
          'unitPrice': null,
          'brokerMargin': null,
          'minTemperature': null,
          'maxTemperature': null,
          'minTempViolationPenalty': null,
          'maxTempViolationPenalty': null,
          'pickupLateFee': null,
          'deliveryLateFee': null
        });
        this.loadAll();
      })
      .catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else {
          this.errorMessage = error;
        }
      });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.coyote.playground.blockchain.demo.Contract',
      'customer': this.customer.value,
      'carrier': this.carrier.value,
      'broker': this.broker.value,
      'unitPrice': this.unitPrice.value,
      'brokerMargin': this.brokerMargin.value,
      'minTemperature': this.minTemperature.value,
      'maxTemperature': this.maxTemperature.value,
      'minTempViolationPenalty': this.minTempViolationPenalty.value,
      'maxTempViolationPenalty': this.maxTempViolationPenalty.value,
      'pickupLateFee': this.pickupLateFee.value,
      'deliveryLateFee': this.deliveryLateFee.value,
    };

    return this.serviceContract.updateAsset(form.get('contractId').value, this.asset)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
        this.loadAll();
      })
      .catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else if (error === '404 - Not Found') {
          this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        } else {
          this.errorMessage = error;
        }
      });
  }


  deleteAsset(): Promise<any> {

    return this.serviceContract.deleteAsset(this.currentId)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
        this.loadAll();
      })
      .catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else if (error === '404 - Not Found') {
          this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        } else {
          this.errorMessage = error;
        }
      });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceContract.getAsset(id)
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        const formObject = {
          'contractId': null,
          'customer': null,
          'carrier': null,
          'broker': null,
          'unitPrice': null,
          'brokerMargin': null,
          'minTemperature': null,
          'maxTemperature': null,
          'minTempViolationPenalty': null,
          'maxTempViolationPenalty': null,
          'pickupLateFee': null,
          'deliveryLateFee': null
        };

        if (result.contractId) {
          formObject.contractId = result.contractId;
        } else {
          formObject.contractId = null;
        }

        if (result.customer) {
          formObject.customer = result.customer;
        } else {
          formObject.customer = null;
        }

        if (result.carrier) {
          formObject.carrier = result.carrier;
        } else {
          formObject.carrier = null;
        }

        if (result.broker) {
          formObject.broker = result.broker;
        } else {
          formObject.broker = null;
        }

      

        if (result.unitPrice) {
          formObject.unitPrice = result.unitPrice;
        } else {
          formObject.unitPrice = null;
        }

        if (result.brokerMargin) {
          formObject.brokerMargin = result.brokerMargin;
        } else {
          formObject.brokerMargin = null;
        }

        if (result.minTemperature) {
          formObject.minTemperature = result.minTemperature;
        } else {
          formObject.minTemperature = null;
        }

        if (result.maxTemperature) {
          formObject.maxTemperature = result.maxTemperature;
        } else {
          formObject.maxTemperature = null;
        }

        if (result.minTempViolationPenalty) {
          formObject.minTempViolationPenalty = result.minTempViolationPenalty;
        } else {
          formObject.minTempViolationPenalty = null;
        }

        if (result.maxTempViolationPenalty) {
          formObject.maxTempViolationPenalty = result.maxTempViolationPenalty;
        } else {
          formObject.maxTempViolationPenalty = null;
        }

        if (result.pickupLateFee) {
          formObject.pickupLateFee = result.pickupLateFee;
        } else {
          formObject.pickupLateFee = null;
        }

        if (result.deliveryLateFee) {
          formObject.deliveryLateFee = result.deliveryLateFee;
        } else {
          formObject.deliveryLateFee = null;
        }



        this.myForm.setValue(formObject);

      })
      .catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else if (error === '404 - Not Found') {
          this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        } else {
          this.errorMessage = error;
        }
      });
  }

  resetForm(): void {
    this.myForm.setValue({
      'contractId': null,
      'customer': null,
      'carrier': null,
      'broker': null,    
      'unitPrice': null,
      'brokerMargin': null,
      'minTemperature': null,
      'maxTemperature': null,
      'minTempViolationPenalty': null,
      'maxTempViolationPenalty': null,
      'pickupLateFee': null,
      'deliveryLateFee': null
    });
  }
}
