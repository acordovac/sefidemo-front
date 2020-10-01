import {Coordinate} from "ol/coordinate";

export class NominatimResponse {


  constructor(address: string, lon: number, lat: number) {
    this.address = address;
    this.lon = lon;
    this.lat = lat;
  }

  address: string;
  lon: number;
  lat: number;

  public getCoordinate(): Coordinate {
    return [this.lon, this.lat];
  }
}
