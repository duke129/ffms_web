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
import { Area } from '../area/areaModel';


@Component({
  selector: 'app-areamanagement',
  templateUrl: './areamanagement.component.html',
  styleUrls: ['./areamanagement.component.scss']
})
export class AreamanagementComponent implements OnInit {
  public tickets : any;
  public area:any;
  observableArea: Observable<Area[]>
  itemResource = new DataTableResource([]); 
  errorMessage: String;
    items = [];
    itemCount : number;
    selectedpersonname= '';
    
    isEditable=false;
    
    showAreaCard=false;

    areaDetails:Area;

    constructor(private http: Http) {
      
    }


    config = {
      displayKey:"areaStatus", //if objects array passed which key to be displayed defaults to description,
      search:true //enables the search plugin to search in the list
      }
      areaStatus=["Enable","Disable"];
      selectedAreaStatus = ['select status'];
  
      disableSearch(){
        this.config.search=false;
      }
      enableSearch(){
        this.config.search=true;
      }
    
    ngOnInit() {
    this.observableArea = this.getAreaWithObservable();
    this.observableArea.subscribe(
              result => { 
                
              });
           
      }



      getAreaWithObservable(): Observable<Area[]> {
        return this.http.get('http://localhost:8081/location/area/all')
	        .map(this.extractData)
	        .catch(this.handleErrorObservable);
    }
    // getTicketsWithPromise(): Promise<TicketViewModel[]> {
    //     return this.http.get('http://10.16.35.96:8081/ticket/list-view').toPromise()
	  //   .then(this.extractData)
	  //   .catch(this.handleErrorPromise);
    // }
    private extractData(res: Response) {
    let area = res.json();
    console.log("Area deatails comes from server is :::"+JSON.stringify(area));
        return area;
    }
    private handleErrorObservable (error: Response | any) {
	console.error(error.message || error);
	return Observable.throw(error.message || error);
    }
    private handleErrorPromise (error: Response | any) {
	console.error(error.message || error);
	return Promise.reject(error.message || error);
    }	

   // itemResource = new DataTableResource(this.books);
    
    
    reloadItems(params) {
      // alert(JSON.stringify(params));
      this.observableArea.subscribe(
                result => { 
                
                  this.area = result ;
                  this.itemCount = result.length;

                  // alert("hi"+this.books);
                      new DataTableResource(this.area).query(params).then(items => this.items = items);
                });



      // alert("assets :: "+this.books);
      
    }

public selectedArea=new Area();
    rowClick(rowEvent) {
      this.isEditable=false;
      this.showAreaCard=true;
      this.selectedpersonname = rowEvent.row.item.name;
      this.areaDetails=rowEvent.row.item;
     // alert("selected row details for area is ::::::::"+JSON.stringify(this.areaDetails));
      this.selectedArea=new Area();
      this.selectedArea.areaId=this.areaDetails.areaId;
      this.selectedArea.areaName=this.areaDetails.areaName;
      this.selectedArea.areaCode=this.areaDetails.areaCode;
      this.selectedArea.areaBranch=this.areaDetails.branchName;
      this.selectedArea.areaCity=this.areaDetails.areaCity;
      this.selectedArea.areaStatus=this.areaDetails.status;
      alert("selected area details is :::"+JSON.stringify(this.selectedArea));
      
        console.log('Clicked: ' + rowEvent.row.item);
    }

    rowDoubleClick(rowEvent) {

      alert('Double clicked: ' + rowEvent.row.item.name);
  }

  rowTooltip(item) { return item.jobTitle; }


  editCustomer(item){

  }
  deleteCustomer(item){
    
  }
  
  onRowClick(){
    this.isEditable=false;

   this.getAreaDetails;
  
    }

    getAreaDetails(item){
      this.areaDetails=item;
      this.showAreaCard=true;
      
    }

    onClickCloseDetailsForm(){
      this.isEditable=false;
      this.showAreaCard=false;
    }
  
    EditClicked(){
      this.isEditable=true;
    }

    updateClicked(){
      let updateArea=new Area();
      updateArea.areaId=this.selectedArea.areaId;
      updateArea.areaName=this.selectedArea.areaName;
      updateArea.areaCode=this.selectedArea.areaCode;
      updateArea.areaBranch=this.selectedArea.areaBranch;
     updateArea.areaStatus=this.selectedArea.areaStatus;
     alert("Area details that going to be save into databases:::"+JSON.stringify(updateArea));

     this.createArea(updateArea);

    }



    createArea(areaModel:Area)
    {
      
      this.saveArea(areaModel).subscribe(result => {
      });
      alert("Area details update successfully");
    }
 
 
    saveArea(areaModel:Area) : Observable<Response>{
        return this.http
       .post(`http://localhost:8081/location/area/save`,areaModel);
      }
    

}
