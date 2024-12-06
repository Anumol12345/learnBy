import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wiki-forms';

  showHeader = true;

    constructor(
        private router: Router
    ) {
      //this.modifyHeader();
    }

    ngOnInit() {
    }

    modifyHeader() { // This method is called many times
      let path = window.location.pathname.split('/')[1]
        console.log(window.location.pathname.split('/')[1]); // This prints a loot of routes on console
        if (path === 'dashboard') {
            this.showHeader = false;
        } else {
            this.showHeader = true;
        }
    }
}
