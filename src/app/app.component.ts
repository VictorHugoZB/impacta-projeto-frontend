import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activeButton:boolean[] = [false, false];

  changeButton(i: number){
    switch(i) {
      case 0:
        this.activeButton = [true, false];
        break;
      case 1:
        this.activeButton = [false, true];
        break;
      default:
        this.activeButton = [false, false];
        break;
    }
    
  }
}
