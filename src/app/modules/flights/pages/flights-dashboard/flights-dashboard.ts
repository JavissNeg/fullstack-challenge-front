import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

import { forkJoin } from 'rxjs';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { FlightsService } from '../../services/flights.service';

import { ITopAirport } from '../../interfaces/ITopAirport';
import { ITopAirline } from '../../interfaces/ITopAirline';
import { ITopDay } from '../../interfaces/ITopDay';
import { IAirlineOverTwo } from '../../interfaces/IAirlineOverTwo';

@Component({
  selector: 'app-flights-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatGridListModule,
    BaseChartDirective
  ],
  templateUrl: './flights-dashboard.html',
  styleUrls: ['./flights-dashboard.css'],
})
export class FlightsDashboardComponent implements OnInit {

  topAirport?: ITopAirport;
  topAirline?: ITopAirline;
  topDay?: ITopDay;
  airlinesOverTwo: IAirlineOverTwo[] = [];

  error = false;

  chartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Active Days',
        data: [],
        backgroundColor: '#3b82f6'
      }
    ]
  };

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false
      }
    }
  };

  constructor(private flightsService: FlightsService) {}

  ngOnInit(): void {
    forkJoin({
      topAirport: this.flightsService.getTopAirports(),
      topAirline: this.flightsService.getTopAirlines(),
      topDay: this.flightsService.getTopDays(),
      airlinesOverTwo: this.flightsService.getAirlinesOverTwo(),
    }).subscribe({
      next: (res) => {

        this.topAirport = res.topAirport;
        this.topAirline = res.topAirline;
        this.topDay = res.topDay;
        this.airlinesOverTwo = res.airlinesOverTwo;

        this.chartData = {
          labels: res.airlinesOverTwo.map(a => a.airline),
          datasets: [
            {
              label: 'Active Days',
              data: res.airlinesOverTwo.map(a => a.days_with_over_two_flights),
              backgroundColor: '#3b82f6'
            }
          ]
        };
      },
      error: (err) => {
        this.error = true;
      }
    });
  }
}