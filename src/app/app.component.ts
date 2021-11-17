import { Component, OnDestroy, OnInit } from '@angular/core';
import { data } from './data';
import { DataService } from './services/data.service';
import { interval, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

export interface dataStruct {
  name: string;
  value: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  data$: Observable<dataStruct[]> | undefined;
  // multi: any[] = [];

  view: [number, number] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Name';
  showYAxisLabel = true;
  yAxisLabel = 'Units';
  private backendDataSubscription: Subscription | undefined;

  constructor(private dataService: DataService) {
    // Object.assign(this, { data });
  }

  ngOnInit(): void {
    // Get data when page loads
    this.getDataFromServer();
    // Make call to server every 10 seconds to get latest data
    this.backendDataSubscription = interval(10000).subscribe((val) => {
      this.getDataFromServer();
    });
  }

  ngOnDestroy(): void {
    this.backendDataSubscription?.unsubscribe();
  }

  private getDataFromServer() {
    this.data$ = this.dataService.getData();
  }

  onSelect($event: any) {
    console.log($event);
  }
}
