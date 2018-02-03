import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CityService } from '../Services/City-Service';
import { CityModel } from '../models/City-Model';
import {AppError } from '../error-handle/app-error';

@Injectable()
export class CityListResolveService implements Resolve<any> {

  constructor(private _cityService: CityService) { }
// resolve gaurd to display the city list
  resolve(route: ActivatedRouteSnapshot) {
      console.log('resolve city list initiated');
    return this._cityService.getCityList().subscribe(
      (cityList: CityModel[]) => {
      },
      (error: AppError) => {
        console.log('error:', error);
      }
    );
  }
}
