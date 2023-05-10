import { Charger } from "../chargers/charger";
export class Station {
    stationName!: string;
    stationHostId!: string;
    stationVendorId!: string;
    stationArea!: string;
    stationAddressLineOne!: string;
    stationAddressLineTwo!: string;
    stationZipCode!: string;
    stationCity!: string;
    stationLatitude!: number;
    stationLongitude!: number;
    stationLocationURL!: string;
    stationParkingArea!: string;
    stationContactNumber!: string;
    stationWorkingTime!: string;
    chargerNumber!: number;
    stationParkingType!: string;
    stationAmenity: string[] = [];
    chargers: Charger[] = [];
    stationShareId!: string;
    stationStatus!: string;
    stationPowerStandard!: string;
    createdDate!: Date;
    modifiedDate!: Date;
    createdBy!: string;
    modifiedBy!: string;
    isActive!: boolean;
}
