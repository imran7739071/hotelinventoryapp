import { Inject, Injectable } from '@angular/core';
import { RouteCongig } from './routeConfig';
import { RouteCongigToken } from './routeCongig.service';

@Injectable({
  providedIn: 'any'
})
export class ConfigService {

  constructor(@Inject(RouteCongigToken) private routeCongig:RouteCongig) { 
    console.log("ConfigService initialized");
    console.log(this.routeCongig);
  }
}
