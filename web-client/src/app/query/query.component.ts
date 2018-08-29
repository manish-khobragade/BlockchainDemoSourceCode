import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { QueryService } from './query.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css'],
  providers: [QueryService]
})
export class QueryComponent implements OnInit {
 
  myForm: FormGroup;


  private shipmentResult;
  private temperatureResult;
  private errorMessage;

  temperature = new FormControl('', Validators.required);
  status = new FormControl('', Validators.required);
  query = new FormControl('', Validators.required);


  constructor(private queryService: QueryService, fb: FormBuilder) {
    this.myForm = fb.group({
      temperature: this.temperature,
      status:this.status,
      query:this.query
    });
  };


  ngOnInit() {
  }

  
  executeQuery(form: any): Promise<any> {
    if(this.query.value == "temperature")
    {
      const resultList = [];
      return this.queryService.getAllByTemperature(this.temperature.value)
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        result.forEach(row => {
          resultList.push(row);
        });
        this.temperatureResult=resultList;
      })
      .catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else {
          this.errorMessage = error;
        }
      });
    }
    else if(this.query.value == "shipments")
    {
      const resultList = [];
      return this.queryService.getAllByStatus(this.status.value)
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        result.forEach(row => {
          let a = [];
          if (row.temperatureReadings && row.temperatureReadings.length > 0) {
            row.temperatureReadings.forEach((tempreading) => { a.push(tempreading.centigrade +'\xB0C') });
          }
          row.temperatureReadings = a;
          let b = [];
          if (row.gpsReadings && row.gpsReadings.length > 0) {
            row.gpsReadings.forEach((tempreading) => {
              b.push("[" + tempreading.latitude + tempreading.latitudeDir + ","
                + tempreading.longitude + tempreading.longitudeDir + "]");
            });
          }
          row.gpsReadings = b;
          resultList.push(row);
        });
        this.shipmentResult=resultList;
      })
      .catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else {
          this.errorMessage = error;
        }
      });
    }
  }
}
