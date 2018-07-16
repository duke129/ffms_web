import { Component, OnInit,Injectable } from '@angular/core';
import { AreaDto } from "./areaDto";
import {FormControl, Validators} from '@angular/forms';

import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'; 
import { AreamanagementComponent } from '../areamanagement/areamanagement.component';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})

@Injectable()
export class AreaComponent implements OnInit {

  _ref: any;
  public areaModel=new AreaDto();

  constructor(private http:Http,public areamanagementComponent:AreamanagementComponent) { }

  ngOnInit() {
    this.areaModel;
  }


  config = {
    displayKey:"description", //if objects array passed which key to be displayed defaults to description,
    search:true //enables the search plugin to search in the list
    }


    disableSearch(){
      this.config.search=false;
    }
    enableSearch(){
      this.config.search=true;
    }

    areaControl = new FormControl('', [Validators.required]);

    branches=[{name: 'RajaJi Nagar', sound: 'RajaJi Nagar'},
    {name: 'Kormangla', sound: 'Kormangla'},
    {name: 'Jaya nagar', sound: 'Jaya nagar'}
  ];


    areaStatus=["Enable","Disable"];
    selectedAreaStatus = ['select status'];

    availableBranchList=["Bangalore","Hyderabad","Chennai"];
    selectedBranch = ['select branchName'];

    availableCityList=["Bangalore","Hyderabad","Chennai"];
    selectedCity = ['select cityName'];



    onsubmitAddNewArea(){
      alert("Branch Json value taken from UI::"+JSON.stringify(this.areaModel));
      alert("Branch Json value taken from UI::"+JSON.stringify(this.areaModel));
      this.areaModel.areaName;
      this.areaModel.code;
      this.areaModel.description;
      this.areaModel.branchId;
      this.areaModel.statusId;
      alert("city value is :::"+JSON.stringify(this.areaModel));
      this.createCity(this.areaModel);

    }

    createCity(areaModel:AreaDto)
    {
      alert("create city method called"+this.areaModel);
      this.saveCity(areaModel).subscribe(result => {
      });
      
    }
 
 
    saveCity(areaModel:AreaDto) : Observable<Response>{
        return this.http
       .post(`http://localhost:8081/location/area/save`,areaModel);
      }
    
      closeAddAreaForm(){
        this._ref.destroy();
        this.areamanagementComponent.showHideAddButtonForArea();
        this.areamanagementComponent.isshowTableView=true;
        
      }


}
