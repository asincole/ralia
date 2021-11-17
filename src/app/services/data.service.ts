import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { dataStruct } from '../app.component';
import { data, DataFromServer } from '../data';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  async getPromiseData(): Promise<dataStruct[]> {
    const response: Promise<DataFromServer[]> = Promise.resolve(data);
    try {
      const data = await response;
      return data.map((item) => {
        return {
          name: item.name,
          value: item.units,
        };
      });
    } catch (error) {
      //do something with error
      throw new Error(error as string);
    }
  }

  getData(): Observable<dataStruct[]> {
    return of<DataFromServer[]>(data).pipe(
      map((dataItem) =>
        dataItem.map((item) => ({
          name: item.name,
          value: item.units,
        }))
      )
    );
  }
}
