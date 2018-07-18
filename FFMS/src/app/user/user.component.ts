import { Component, OnInit,Injectable } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'; 
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
 // providers:[UserProfileComponent]
})
@Injectable()
export class UserComponent implements OnInit {

  _ref:any;

  displayedColumns = ['position', 'name', 'weight', 'symbol'];

  constructor(public userProfileComponent:UserProfileComponent ) { }

  ngOnInit() {
  }


  closeUserForm(){
    this._ref.destroy();
    this.userProfileComponent.showHideAddButtonOfUser();
  }

  onsubmitAddNewArea(){
    
  }

}
