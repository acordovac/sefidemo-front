import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Coordinate} from 'ol/coordinate';
import {Observable} from 'rxjs';

export const SEARCH_URL = 'https://nominatim.openstreetmap.org/search';
// http://open.mapquestapi.com/nominatim/v1/search.php?key=KEY&format=json&q=windsor+[castle]&addressdetails=1&limit=3&viewbox=-1.99%2C52.02%2C0.78%2C50.94&exclude_place_ids=41697
@Injectable({
  providedIn: 'root'
})
export class NominatimOsmService {

  constructor(
    private http: HttpClient
  ) { }

  public getCoordsFromName(name: string): Observable<any> {
    return this.http.get(`${SEARCH_URL}/`);
  }

}
