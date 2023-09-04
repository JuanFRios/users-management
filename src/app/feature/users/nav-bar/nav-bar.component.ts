import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '@core/services/storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private storageService: StorageService
  ) {
  }

  ngOnInit(): void {
  }

  /**
   * Este método no se puede modificar
   * */
  public logout(): void {
    this.router.navigateByUrl('/login');
    this.storageService.removeItem('token');
  }
}
