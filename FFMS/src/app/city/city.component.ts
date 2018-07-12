import { Component, OnInit, InjectionToken, Inject } from '@angular/core';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { CityDto } from './CityDTO'
import { CityModel } from '../citymanagement/cityModel';
import { CitymanagementComponent } from '../citymanagement/citymanagement.component';
import { Injectable } from '@angular/core';


import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'; 
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
  providers: [ CitymanagementComponent ],
})

@Injectable()
export class CityComponent implements OnInit {

 // public city=new CityModel();
  public cityDto=new CityDto();

  showId:boolean;

  subscription: Subscription;


  public citylistFordropdown=[]; 
  public selectedOptions=[]; 
  
  constructor(private http:Http,public citymanagementComponent:CitymanagementComponent ) {
     
   }

  ngOnInit() {
  this.cityDto    ;
  }

  config = {
    displayKey:"cityName", //if objects array passed which key to be displayed defaults to cityName,
    search:true, //enables the search plugin to search in the list
    height: 'auto' //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    }

    disableSearch(){
      this.config.search=false;
    }
    enableSearch(){
      this.config.search=true;
    }

  availableStates = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chattisgarh','Goa','Gujarat','Haryana',
  'Himachal Pradesh','Jammu and Kashmir','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur',
  "Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh",
  "Uttarakhand","West Bengal"];
 
    multiple = false;
    selectedstate = ['select state'];
   
    cityStatus=["Enable","Disable"];
    selectedstatus = ['select stautus'];

    selectionChanged(e){
    console.log(this.selectedOptions[0].idCity);
    }

     onclick(){
    this.subscription = this.citymanagementComponent.getCitiesWithObservable().subscribe(result=>{
      this.citylistFordropdown = result;
    });
  }


    onsubmitAddNewCity(){
      
      console.log("Outside the result block citylist in array for dropllist ::"+this.citymanagementComponent.citiesList);
      this.cityDto.cityName;
      this.cityDto.state;
      this.cityDto.statusId;
      alert("city value is :::"+JSON.stringify(this.cityDto));
      this.createCity(this.cityDto);

    }

    createCity(city : CityDto)
    {
      alert("create city method called"+city);
      this.saveCity(city).subscribe(result => {
      });
      
    }
 
 
    saveCity(city : CityDto) : Observable<Response>{
        return this.http
       .post(`http://localhost:8081/location/city/save`,city);
      }


      onclickAtSelectSectionForCityList(){

        console.log("Outside the result block citylist in array for dropllist ::"+this.citymanagementComponent.citiesList);
      }

      onClickFieldValueOfForm(){}
}
