import { Component, Injector } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    injector: Injector,
    public router: Router
) {
    // tslint:disable-next-line:no-unused-expression
    injector;

    this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
            const url = router.url;
        }
    });
}
}
