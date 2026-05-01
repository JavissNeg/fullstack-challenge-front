import { Routes } from '@angular/router';

import { FlightsDashboardComponent } from './modules/flights/pages/flights-dashboard/flights-dashboard';
import { StackDashboardComponent } from './modules/stack/pages/stack-dashboard/stack-dashboard';
import { MainLayout } from './shared/layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'flights',
        component: FlightsDashboardComponent,
        data: { title: 'Flight Metrics' }
      },
      {
        path: 'stack',
        component: StackDashboardComponent,
        data: { title: 'Stack Metrics' }
      },
      {
        path: '',
        redirectTo: 'flights',
        pathMatch: 'full',
      },
    ],
  },
];