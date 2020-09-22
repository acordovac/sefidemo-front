import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(

  ) { }

  ngOnInit(): void {
  }

  userIsLoggedIn() {
    return false;
    // return window.localStorage.getItem();
  }
}
