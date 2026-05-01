import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

import { StackService } from '../../services/stack.service';
import { IStackStats } from '../../interfaces/IStackStats';
import { IStackItem } from '../../interfaces/IStackItem';

import { MatIconModule } from '@angular/material/icon';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-stack-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    BaseChartDirective
  ],
  templateUrl: './stack-dashboard.html',
  styleUrls: ['./stack-dashboard.css'],
})
export class StackDashboardComponent implements OnInit {

  stats?: IStackStats;
  highest?: IStackItem;
  lowest?: IStackItem;
  oldest?: IStackItem;
  newest?: IStackItem;

  error = false;

  chartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: []
  };

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  constructor(private stackService: StackService) {}

  ngOnInit(): void {
    forkJoin({
      stats: this.stackService.getStats(),
      highest: this.stackService.getHighestReputation(),
      lowest: this.stackService.getLowestViews(),
      oldest: this.stackService.getOldest(),
      newest: this.stackService.getNewest(),
    }).subscribe({
      next: (res) => {

        this.stats = res.stats;
        this.highest = res.highest;
        this.lowest = res.lowest;
        this.oldest = res.oldest;
        this.newest = res.newest;

        this.chartData = {
          labels: ['Answered', 'Unanswered'],
          datasets: [
            {
              label: 'Questions',
              data: [
                res.stats.answered,
                res.stats.not_answered
              ],
              backgroundColor: ['#22c55e', '#ef4444']
            }
          ]
        };
      },
      error: () => {
        this.error = true;
      }
    });
  }
}