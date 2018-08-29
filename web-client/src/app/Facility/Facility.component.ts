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
import { FacilityService } from './Facility.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-facility',
  templateUrl: './Facility.component.html',
  styleUrls: ['./Facility.component.css'],
  providers: [FacilityService]
})
export class FacilityComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;
  private user;

  code = new FormControl('', Validators.required);
  location = new FormControl('', Validators.required);
  userid = new FormControl('');


  constructor(private serviceFacility: FacilityService, fb: FormBuilder) {
    this.myForm = fb.group({
      code: this.code,
      location: this.location,
      userid: this.userid
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceFacility.getAll()
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        result.forEach(participant => {
          tempList.push(participant);
        });
        this.allParticipants = tempList;
      })
      .catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else if (error === '404 - Not Found') {
          this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
          this.errorMessage = error;
        }
      });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
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
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.coyote.playground.blockchain.demo.Facility',
      'code': this.code.value,
      'location': this.location.value
    };

    this.myForm.setValue({
      'code': null,
      'location': null,
      'userid': null
    });

    return this.serviceFacility.addParticipant(this.participant)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
        this.myForm.setValue({
          'code': null,
          'location': null,
          'userid': null
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

  assignParticipant(): Promise<any> {
    this.user = {
      "participant": "org.coyote.playground.blockchain.demo.Facility#" + this.currentId,
      "userID": this.userid.value,
      "options": {}
    }
    return this.serviceFacility.assignParticipant(this.user)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
      })
      .catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else if (error === '404 - Not Found') {
          this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        } else if (error === '500 - Internal Server Error') {
          this.errorMessage = "Registration of '" + this.userid.value + "' failed: Identity '" + this.userid.value + "' is already registered";
        } else {
          this.errorMessage = error;
        }
      });
  }

  updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.coyote.playground.blockchain.demo.Facility',
      'location': this.location.value
    };

    return this.serviceFacility.updateParticipant(form.get('code').value, this.participant)
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


  deleteParticipant(): Promise<any> {

    return this.serviceFacility.deleteParticipant(this.currentId)
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

    return this.serviceFacility.getparticipant(id)
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        const formObject = {
          'code': null,
          'location': null,
          'userid': null
        };

        if (result.code) {
          formObject.code = result.code;
        } else {
          formObject.code = null;
        }

        if (result.location) {
          formObject.location = result.location;
        } else {
          formObject.location = null;
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
      'code': null,
      'location': null,
      'userid': null
    });
  }
}
