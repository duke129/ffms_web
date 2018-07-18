import { Component, OnInit,Injectable } from '@angular/core';
import { BranchDto } from "./branchDto";
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'; 
import { BranchmanagementComponent } from '../branchmanagement/branchmanagement.component';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss'],
 
})

@Injectable()
export class BranchComponent implements OnInit {

  _ref: any;
  
  public branchModel=new BranchDto();
  constructor(private http:Http,public branchmanagementComponent:BranchmanagementComponent) { }

  ngOnInit() {
    this.branchModel;
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

    branchStatus=["Enable","Disable"];
    selectedBranchStatus = ['select stautus'];

    availableCityList=["Bangalore","Hyderabad","Chennai"];
    selectedBranch = ['select stautus'];



    onsubmitAddNewBranch(){
      console.log("Branch Json value taken from UI::"+JSON.stringify(this.branchModel))

      this.branchModel.branchName;
      this.branchModel.cityId
      let branchCityName=this.branchModel.cityName[0];
      this.branchModel.description
      let branchStatusName=this.branchModel.status[0];
      this.branchModel.cityName=branchCityName;
      this.branchModel.status=branchStatusName;
      //alert("Branch value is :::"+JSON.stringify(this.branchModel));
      console.log("Branch value is :::"+JSON.stringify(this.branchModel));
      this.createBranch(this.branchModel);

    }

    createBranch(branchModel:BranchDto)
    {
      alert("create branch method called"+this.branchModel);
      this.saveBranch(branchModel).subscribe(result => {
      });
      
    }
 
 
    saveBranch(branchModel:BranchDto) : Observable<Response>{
        return this.http
       .post(`http://localhost:8081/location/branch/save`,branchModel);
      }
    
     
      closeAddBranchForm(){
        this._ref.destroy();
        this.branchmanagementComponent.showHideAddButton();
        this.branchmanagementComponent.isShowBranchTableView=true;

      }
}
