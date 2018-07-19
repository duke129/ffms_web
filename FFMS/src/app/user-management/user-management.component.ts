import { Component, OnInit } from '@angular/core';
import { UserProfileComponent  } from '../user-profile/user-profile.component';
import { UserGroupProfileComponent } from '../user-group-profile/user-group-profile.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
