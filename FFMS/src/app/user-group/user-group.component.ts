import { Component, OnInit, Injectable, InjectionToken,Inject,forwardRef} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'; 
import { UserGroupProfileComponent } from '../user-group-profile/user-group-profile.component';
import { UserGroupDto } from './userGroupDto'

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss'],
  //providers: [forwardRef(() => UserGroupProfileComponent)]
})

@Injectable()
export class UserGroupComponent implements OnInit {

  _ref:any;

  
  public areaModel=new UserGroupDto();

  constructor(private http:Http,@Inject(forwardRef(() => UserGroupProfileComponent))public userGroupProfileComponent:UserGroupProfileComponent) {

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
      this.areaModel.usergroup;
      this.areaModel.role;
      this.areaModel.userGroupDescription;
      this.areaModel.status;
      alert("User value is :::"+JSON.stringify(this.areaModel));
      //this.createCity(this.areaModel);

    }

    createCity(areaModel:UserGroupDto)
    {
      this.saveCity(areaModel).subscribe(result => {
      });
      
    }
 
 
    saveCity(areaModel:UserGroupDto) : Observable<Response>{
        return this.http
       .post(`http://localhost:8081/location/area/save`,areaModel);
      }


      closeUserForm(){
        this._ref.destroy();
        this.userGroupProfileComponent.showHideAddButtonOfUser();
        this.userGroupProfileComponent.isshowTableView=true;
      }
    

}
