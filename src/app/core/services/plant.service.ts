import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError, throwError } from 'rxjs';
import { Plant } from '../interfaces/plant.interface';
import { ApiResponse } from '../interfaces/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  private apiUrl = 'https://sg666zbdmf.execute-api.us-east-1.amazonaws.com/dev';

  constructor(private http: HttpClient) { }

  getPlants(offset: number = 0): Observable<ApiResponse<Plant[]>> {
    let url = new URL(this.apiUrl);
    url.searchParams.set("offset", offset.toString());
    return this.http.get<ApiResponse<Plant[]>>(url.toString())
      .pipe(
        catchError(this.handleError)
      )
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    console.error("🚀 ~ PlantService ~ handleError ~ err:", err)
    return throwError(() => err);
  }
}
