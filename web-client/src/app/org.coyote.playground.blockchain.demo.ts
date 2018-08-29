import { Asset } from './org.hyperledger.composer.system';
import { Participant } from './org.hyperledger.composer.system';
import { Transaction } from './org.hyperledger.composer.system';
import { Event } from './org.hyperledger.composer.system';
// export namespace org.coyote.playground.blockchain.demo{
export enum ProductType {
    BANANAS,
    APPLES,
    PEARS,
    PEACHES,
    COFFEE,
}
export enum ShipmentStatus {
    CREATED,
    ACCEPTED,
    IN_TRANSIT,
    ARRIVED,
}
export enum CompassDirection {
    N,
    S,
    E,
    W,
}
export abstract class ShipmentTransaction extends Transaction {
    shipment: Shipment;
}
export class TemperatureReading extends ShipmentTransaction {
    centigrade: number;
}
export class GpsReading extends ShipmentTransaction {
    readingTime: string;
    readingDate: string;
    latitude: string;
    latitudeDir: CompassDirection;
    longitude: string;
    longitudeDir: CompassDirection;
}
export class ShipmentReceived extends ShipmentTransaction {
}
export class ShipmentAccepted extends ShipmentTransaction {
}
export class Shipment extends Asset {
    shipmentId: string;
    type: ProductType;
    status: ShipmentStatus;
    unitCount: number;
    contract: Contract;
    temperatureReadings: TemperatureReading[];
    gpsReadings: GpsReading[];
}
export class Contract extends Asset {
    contractId: string;
    customer: Customer;
    carrier: Carrier;
    broker: Broker;
    origin: Facility;
    destination: Facility;
    arrivalDateTime: Date;
    unitPrice: number;
    brokerMargin: number;
    minTemperature: number;
    maxTemperature: number;
    minPenaltyFactor: number;
    maxPenaltyFactor: number;
}
export class Address {
    city: string;
    country: string;
    street: string;
    zip: string;
    continent: string;
}
export abstract class Business extends Participant {
    name: string;
    code: string;
    email: string;
    address: string;
    accountBalance: number;
}
export class Customer extends Business {
}
export class Carrier extends Business {
}
export class Broker extends Business {
}
export class Facility extends Participant {
    code: string;
    location: string;
}
export class TemperatureThresholdEvent extends Event {
    message: string;
    temperature: number;
    shipment: Shipment;
}
export class ShipmentInPortEvent extends Event {
    message: string;
    shipment: Shipment;
}
export class ShipmentHasArrived extends Event {
    message: string;
    shipmentAmount: number;
    penalty: number;
    shipment: Shipment;
}
export class ShipmentAcceptedError extends Event {
    message: string;
    shipment: Shipment;
}

export class TemperatureQueryReadings {
    centigrade: string;
    shipment: string;
    transactionId: string;
    timestamp: string
}
// }
