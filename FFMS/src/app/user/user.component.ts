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

  
  public userModel=new UserDto();

  constructor(private http:Http,@Inject(forwardRef(() => UserProfileComponent))public userProfileComponent:UserProfileComponent) {

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

    userGroup=["Admin","Network Engineer","Sales Engineer"];


    onsubmitAddNewUser(){
      this.userModel.firstName;
      this.userModel.lastName;
      this.userModel.password;
      let status=this.userModel.status[0];
      this.userModel.status=status;
      let usergroupName=this.userModel.userGroupName[0];
      this.userModel.userGroupName=usergroupName;
      alert("User value is :::"+JSON.stringify(this.userModel));
      this.createCity(this.userModel);

    }

    createCity(userModel:UserDto)
    {
      this.saveCity(userModel).subscribe(result => {
      });
      
    }
 
 
    saveCity(userModel:UserDto) : Observable<Response>{
        return this.http
       .post(`http://localhost:8081/user/add`,userModel);
      }


      closeUserForm(){
        this._ref.destroy();
        this.userProfileComponent.showHideAddButtonOfUser();
        this.userProfileComponent.isshowTableView=true;
      }
    
    
}
