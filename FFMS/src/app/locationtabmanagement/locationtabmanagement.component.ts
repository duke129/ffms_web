import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {ConfigService} from './config.service';
import { CitymanagementComponent } from '../citymanagement/citymanagement.component';
import { BranchmanagementComponent }  from '../branchmanagement/branchmanagement.component';
import { AreamanagementComponent } from '../areamanagement/areamanagement.component'

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
  }

  getView() {

    console.log

    return this._configService.getConfig();


  }

  
}
