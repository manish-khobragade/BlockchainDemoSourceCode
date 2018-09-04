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

import { Component, AfterViewInit, OnInit, ViewContainerRef } from '@angular/core';
import $ from 'jquery';
import * as io from 'socket.io-client';
import { environment } from 'environments/environment';
import { ToastsManager } from 'ng2-toastr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit, OnInit {
  title = 'Demo Blockchain!';

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    console.log("reload event");
    var websocket = new WebSocket(environment.webSocketEndpoint);
    websocket.onclose = function (evt) { console.log("close : " + JSON.stringify(evt)); };
    websocket.onopen = function (evt) { console.log("open : " + JSON.stringify(evt)); };
    websocket.onmessage = (evt) => { console.log(evt.data); this.ShowNotification(evt.data); };
    websocket.onerror = function (evt) { console.log("error : " + JSON.stringify(evt)); };
    console.log("now state : " + websocket.readyState)
  }

  private ShowNotification(event) {
    var namespace = "org.coyote.playground.blockchain.demo.";
    var eventData = JSON.parse(event);
    var message: string = "";
    switch (eventData["$class"]) {
      case namespace + "TemperatureThresholdEvent":
        message = "<ul><li>For Shipment : " + eventData.shipment.split('#')[1] + "</li>";
        message += "<li>Message: " + eventData.message + "</li>";
        message += "<li>Temperature Recorded: " + eventData.temperature + "</li>";
        message += "</ul>"
        this.toastr.error(message, "Temperature Threshold Event", { enableHTML: true });
        break;
      case namespace + "ShipmentAcceptedError":
        message = "<ul><li>For Shipment : " + eventData.shipment.split('#')[1] + "</li>";
        message += "<li>Message: " + eventData.message + "</li>";
        message += "</ul>"
        this.toastr.error(message, "ShipmentAcceptedError", { enableHTML: true });
        break;
      case namespace + "ShipmentHasArrived":
        message = "<ul><li>For Shipment : " + eventData.shipment.split('#')[1] + "</li>";
        message += "<li>Message : " + eventData.message + "</li>";
        message += "<li>Shipment Amount : " + eventData.shipmentAmount + "</li>";
        message += "<li>Penalty : " + eventData.penalty + "</li>";
        message += "</ul>"
        this.toastr.success(message, "Shipment Arrived", { enableHTML: true });
        break;
      case namespace + "ShipmentInPortEvent":
        message = "<ul><li>For Shipment : " + eventData.shipment.split('#')[1] + "</li>";
        message += "<li>Message : " + eventData.message + "</li>";
        message += "</ul>"
        this.toastr.success(message, "Shipment Location Updated", { enableHTML: true });
        break;
      case namespace + "ShipmentLatePickup":
        message = "<ul><li>For Shipment : " + eventData.shipment.split('#')[1] + "</li>";
        message += "<li>Message : " + eventData.message + "</li>";
        message += "</ul>"
        this.toastr.success(message, "Past Appointment Time", { enableHTML: true });
        break;
    }

  }

  ngAfterViewInit() {
    $('.nav a').on('click', function () {
      $('.nav').find('.active').removeClass('active');
      $(this).parent().addClass('active');
    });

    $('.dropdown').on('show.bs.dropdown', function (e) {
      $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
    });

    $('.dropdown').on('hide.bs.dropdown', function (e) {
      $(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
    });

    $('.dropdown-menu li').on('click', function () {
      $(this).parent().parent().addClass('active');
    });
  }
}
