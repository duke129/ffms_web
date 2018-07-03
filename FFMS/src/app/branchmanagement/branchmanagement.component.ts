import { Component, OnInit } from '@angular/core';
import { DataTableResource } from '../data-table';
//import persons  from './customer-data'
//import persons  from './customer-data';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'; 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import  { TicketViewModel } from '../ticket-management/ticket';
import { Branch } from '../branch/branchModel';
import { cityModel } from '../city/cityModel';
import {City} from './city';
import { StatusBean } from "../branchmanagement/statusBean";


@Component({
  selector: 'app-branchmanagement',
  templateUrl: './branchmanagement.component.html',
  styleUrls: ['./branchmanagement.component.scss']
})
export class BranchmanagementComponent implements OnInit {
  isEditable=false;
  showBranchCard=false;
  public tickets : any;
  public index:number;
  public city=new City();
  public statusBean=new StatusBean();
  public branch:any;
  observableBranch: Observable<Branch[]>
  itemResource = new DataTableResource([]); 
  errorMessage: String;
    items = [];
    itemCount : number;
    selectedpersonname= '';
    branchDetails=Branch;
     public citymodel=new cityModel();



    constructor(private http: Http) {
      
    }


    config = {
      displayKey:"branchModel.branchCity", //if objects array passed which key to be displayed defaults to cityName,
      search:true, //enables the search plugin to search in the list
      height: 'auto' //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
      }
  
      branchstatusforselection=["Enable","Disable"];
      selectedstatus = ['select stautus'];

      availableCityList=["Bangalore","Chennai","Hyderabad"];
    

    ngOnInit() {

    this.observableBranch = this.getBranchWithObservable();
    this.observableBranch.subscribe(
              result => { 
                
              });
           
      }



      getBranchWithObservable(): Observable<Branch[]> {
        return this.http.get('http://localhost:8081/location/branch/all')
	        .map(this.extractData)
	        .catch(this.handleErrorObservable);
      }


    private extractData(res: Response) 
    {
        let branch = res.json();
        console.log("branch details comes from server is :::"+JSON.stringify(branch));
        return branch;
    }


    private handleErrorObservable (error: Response | any) 
    {
	    console.error(error.message || error);
	    return Observable.throw(error.message || error);
    }

    private handleErrorPromise (error: Response | any) 
     {
	     console.error(error.message || error);
	     return Promise.reject(error.message || error);
      }	

    
    
    reloadItems(params) {
      let i;
      let cityname=this.citymodel.cityName;
      this.observableBranch.subscribe(
                result => { 
                  this.branch = result ;
                  this.itemCount = result.length;
                  for(i=0;i<result.length;i++){
                    this.branch[i].branchCity=result[i].city.cityName;
                    this.branch[i].branchStatus=result[i].statusBean.statusDescription;
                  }
                      new DataTableResource(this.branch).query(params).then(items => this.items = items);
                });
    }
   
    selectedBranch:any;
    rowClick(rowEvent) {
      this.isEditable=false;
      this.showBranchCard=true;
      this.selectedpersonname = rowEvent.row.item.name;
      this.branchDetails=rowEvent.row.item;
      this.selectedBranch=new Branch();
      this.selectedBranch.idBranch=this.branchDetails.idBranch ;
       this.selectedBranch.branchName=this.branchDetails.branchName;
       this.selectedBranch.branchStatus=this.branchDetails.statusBean.statusDescription;
       this.selectedBranch.branchCity=this.branchDetails.city.cityName;
        console.log('Clicked: ' + rowEvent.row.item);
    }

  getBranchDetails(item){
        this.branchDetails=item;
        this.showBranchCard=true;


  }

  onClickCloseDetailsForm(){
    this.showBranchCard=false;
  }

  EditClicked(){
    this.isEditable=true;
  }
  
  updateClicked(){
      var updateBranch:Branch=new Branch();
      updateBranch.idBranch=this.selectedBranch.idBranch;
      updateBranch.branchName=this.selectedBranch.branchName;
      updateBranch.city={"cityName":this.selectedBranch.branchCity};
      updateBranch.statusBean={"statusDescription":this.selectedBranch.branchStatus};
      updateBranch.branchCode=this.selectedBranch.branchCode;
      alert("Branch updation details is ::"+JSON.stringify(updateBranch));
      this.createBranch(updateBranch);
  }

    createBranch(updateBranch:Branch)
    {
    this.saveBranch(updateBranch).subscribe(result => {

    });
    alert("Branch details update successfully");
  }
  saveBranch(updateBranch:Branch) : Observable<Response>{
      return this.http
     .post(`http://localhost:8081/location/branch/save`,updateBranch);
    }

    disableSearch(){
      this.config.search=false;
    }
    enableSearch(){
      this.config.search=true;
    }
}
