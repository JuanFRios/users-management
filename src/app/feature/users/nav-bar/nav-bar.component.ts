import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {

  constructor(
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  /**
   * Este método no se puede modificar
   * */
  public logout(): void {
    this.router.navigateByUrl('/login');
    localStorage.removeItem('token');
  }
}
