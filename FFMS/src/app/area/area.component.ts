import { Component, OnInit } from '@angular/core';
import { Area } from "./areaModel";
import {FormControl, Validators} from '@angular/forms';

import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'; 

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  public areaModel=new Area();

  constructor(private http:Http) { }

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

    // branches = [
    //   {value: 'RajaJi Nagar-1', viewValue: 'RajaJi Nagar'},
    //   {value: 'Kormangla-2', viewValue: 'Kormangla'},
    //   {value: 'Jaya nagar-3', viewValue: 'Jaya nagar'}
    // ];


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
      this.areaModel.areaCode;
      this.areaModel.areaDescription;
      this.areaModel.areaBranch;
      this.areaModel.areaStatus;
      alert("city value is :::"+JSON.stringify(this.areaModel));
      this.createCity(this.areaModel);

    }

    createCity(areaModel:Area)
    {
      alert("create city method called"+this.areaModel);
      this.saveCity(areaModel).subscribe(result => {
      });
      
    }
 
 
    saveCity(areaModel:Area) : Observable<Response>{
        return this.http
       .post(`http://localhost:8081/location/area/save`,areaModel);
      }
    
    


}
