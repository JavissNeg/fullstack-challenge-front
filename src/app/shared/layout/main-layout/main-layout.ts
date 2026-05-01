import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, ActivatedRoute, RouterModule } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { SpinnerComponent } from '../../components/spinner/spinner';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SpinnerComponent],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.css'],
})
export class MainLayout {
  title = '';

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let currentRoute = this.route;
          while (currentRoute.firstChild) {
            currentRoute = currentRoute.firstChild;
          }
          return currentRoute.snapshot.routeConfig?.path;
        })
      )
      .subscribe(path => {
        this.setTitle(path);
      });
  }

  setTitle(path: string | undefined) {
    switch (path) {
      case 'flights':
        this.title = 'Flight Metrics';
        break;
      case 'stack':
        this.title = 'Stack Metrics';
        break;
      default:
        this.title = 'Dashboard';
    }
  }
}