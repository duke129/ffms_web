import { Component, OnInit, Injectable, InjectionToken,Inject,forwardRef} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'; 
import { UserProfileComponent } from '../user-profile/user-profile.component';
  import { UserDto } from './userDto'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  //providers:[ UserProfileComponent ]
 
})
@Injectable()
export class UserComponent implements OnInit {

  _ref:any;

  
  public areaModel=new UserDto();

  constructor(private http:Http,@Inject(forwardRef(() => UserProfileComponent))public userProfileComponent:UserProfileComponent) {

   }

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

   

    areaStatus=["Enable","Disable"];
    selectedAreaStatus = ['select status'];


    onsubmitAddNewUser(){
      this.areaModel.firstName;
      this.areaModel.lastName;
      this.areaModel.password;
      this.areaModel.status;
      alert("User value is :::"+JSON.stringify(this.areaModel));
      //this.createCity(this.areaModel);

    }

    createCity(areaModel:UserDto)
    {
      this.saveCity(areaModel).subscribe(result => {
      });
      
    }
 
 
    saveCity(areaModel:UserDto) : Observable<Response>{
        return this.http
       .post(`http://localhost:8081/location/area/save`,areaModel);
      }


      closeUserForm(){
        this._ref.destroy();
        this.userProfileComponent.showHideAddButtonOfUser();
        this.userProfileComponent.isshowTableView=true;
      }
    
    
}
