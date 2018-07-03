import { Component, OnInit } from '@angular/core';
import { Branch } from "./branchModel";

import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'; 
import { City } from '../branchmanagement/city'

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {

  public branchModel=new Branch();
  constructor(private http:Http) { }

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
      this.branchModel.branchCity
      this.branchModel.branchDescription
      this.branchModel.branchStatus
      console.log("Branch value is :::"+JSON.stringify(this.branchModel));
      this.createBranch(this.branchModel);

    }

    createBranch(branchModel:Branch)
    {
      alert("create branch method called"+this.branchModel);
      this.saveBranch(branchModel).subscribe(result => {
      });
      
    }
 
 
    saveBranch(branchModel:Branch) : Observable<Response>{
        return this.http
       .post(`http://localhost:8081/location/branch/save`,branchModel);
      }
    
      
}
