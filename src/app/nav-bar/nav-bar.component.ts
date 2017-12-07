import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  isIn=false;
  toggleState(){
    let bool=this.isIn;
    this.isIn = bool === false? true:false;
  }
  constructor() { }


}
