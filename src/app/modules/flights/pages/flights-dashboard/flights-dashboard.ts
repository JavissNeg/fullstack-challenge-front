import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsService } from '../../services/flights.service';
import { MatIconModule } from '@angular/material/icon';

import { MatGridListModule } from '@angular/material/grid-list';
import { forkJoin } from 'rxjs';

import { ITopAirport } from '../../interfaces/ITopAirport';
import { ITopAirline } from '../../interfaces/ITopAirline';
import { ITopDay } from '../../interfaces/ITopDay';
import { IAirlineOverTwo } from '../../interfaces/IAirlineOverTwo';

@Component({
  selector: 'app-flights-dashboard',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatIconModule],
  templateUrl: './flights-dashboard.html',
  styleUrls: ['./flights-dashboard.css'],
})
export class FlightsDashboardComponent implements OnInit {

  topAirport?: ITopAirport;
  topAirline?: ITopAirline;
  topDay?: ITopDay;
  airlinesOverTwo: IAirlineOverTwo[] = [];

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
      },
      error: (err) => {
        console.error('Flights dashboard error:', err);
      }
    });
  }
}