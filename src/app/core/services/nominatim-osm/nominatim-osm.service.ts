import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment as env} from "../../../../environments/environment";
import {NominatimResponse} from "../../../shared/models/nominatim-response";
import {map} from "rxjs/operators";


export const OPEN_SEARCH_URL = 'https://nominatim.openstreetmap.org/search?q=';
export const OPEN_SEARCH_PARAMS = '&format=json&countrycodes=mx&addressdetails=1';
export const MAPQUEST_SEARCH_URL = `http://open.mapquestapi.com/nominatim/v1/search.php?key=${env.nominatim.key}&format=json&q=`;
// http://open.mapquestapi.com/nominatim/v1/search.php?key=KEY&format=json&q=windsor+[castle]&addressdetails=1&limit=3&viewbox=-1.99%2C52.02%2C0.78%2C50.94&exclude_place_ids=41697
@Injectable({
  providedIn: 'root'
})
export class NominatimOsmService {

  constructor(
    private http: HttpClient
  ) { }


  /**
   * Uses the nominatim.openstreetmap.org search API
   * @param name address or name value
   * @returns stream with nominatimResponse coincidences
   */
  public getCoordsFromOpenSearch(name: string): Observable<NominatimResponse[]> {
    return this.http.get(`${OPEN_SEARCH_URL}${name.replace(' ', '+')}${OPEN_SEARCH_PARAMS}`).pipe(
      map((response: any[]) => response.map((item: any) => new NominatimResponse(
          item.display_name,
          item.lon,
          item.lat
        ))
      )
    );
  }

  /**
   * Uses the open.mapquestapi.com nominatim search API
   * @param name address or name value
   * @returns stream with nominatimResponse coincidences
   */
  public getCoordsFromMapQuestSearch(name: string): Observable<NominatimResponse[]> {
    return this.http.get(`${MAPQUEST_SEARCH_URL}${name}`).pipe(
      map((response: any[]) => response.map((item: any) => new NominatimResponse(
        item.display_name,
        item.lon,
        item.lat
        ))
      )
    );
  }

}
