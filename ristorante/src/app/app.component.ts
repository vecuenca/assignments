import { Component } from '@angular/core';
import { MENU } from './mock-menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  menu = MENU;
}
