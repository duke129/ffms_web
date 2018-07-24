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

  
  public userModel=new UserGroupDto();

  constructor(private http:Http,@Inject(forwardRef(() => UserGroupProfileComponent))public userGroupProfileComponent:UserGroupProfileComponent) {

   }

  ngOnInit() {
    this.userModel;
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

    availableRole=["ServiceEngineer","Manager","Lead","Electrician"];


    onsubmitAddNewUser(){
      this.userModel.userGroup;
      this.userModel.role;
      this.userModel.userGroupDescription;
      this.userModel.status;
      alert("User value is :::"+JSON.stringify(this.userModel));
      this.createCity(this.userModel);

    }

    createCity(userModel:UserGroupDto)
    {
      this.saveCity(userModel).subscribe(result => {
      });
      
    }
 
 
    saveCity(userModel:UserGroupDto) : Observable<Response>{
        return this.http
       .post(`http://localhost:8081/group/add`,userModel);
      }


      closeUserForm(){
        this._ref.destroy();
        this.userGroupProfileComponent.showHideAddButtonOfUser();
        this.userGroupProfileComponent.isshowTableView=true;
      }
    

}
