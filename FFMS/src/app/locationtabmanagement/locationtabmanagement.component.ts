import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {ConfigService} from './config.service';

@Component({
  selector: 'app-locationtabmanagement',
  templateUrl: './locationtabmanagement.component.html',
  styleUrls: ['./locationtabmanagement.component.scss'],
  providers:[ConfigService]
})
export class LocationtabmanagementComponent implements OnInit {

  constructor(private _configService: ConfigService) {
    
   }

  ngOnInit() {
   // this.showCityView = true;
  }

  getView() {

    console.log

    return this._configService.getConfig();


  }

  
}
