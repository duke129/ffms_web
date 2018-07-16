import { Component, OnInit, ViewChild,ComponentFactoryResolver,ViewContainerRef } from '@angular/core';
import { DataTableResource } from '../data-table';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'; 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import  { TicketViewModel } from '../ticket-management/ticket';
import { BranchDto } from '../branch/branchDto';
import { BranchComponent } from '../branch/branch.component'


@Component({
  selector: 'app-branchmanagement',
  templateUrl: './branchmanagement.component.html',
  styleUrls: ['./branchmanagement.component.scss']
})

export class BranchmanagementComponent implements OnInit {

  @ViewChild('parent', { read: ViewContainerRef }) container: ViewContainerRef;
  isEditable=false;
  showBranchCard=false;
  public index:number;
  public branchDto: BranchDto[];
  observableBranch: Observable<BranchDto[]>
  itemResource = new DataTableResource([]); 
  errorMessage: String;
    items = [];
    itemCount : number;
    selectedpersonname= '';
    branchDetails:BranchDto;
    isShowBranchTableView=true;

 constructor(private http: Http,private _cfr: ComponentFactoryResolver) {
      
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



      getBranchWithObservable(): Observable<BranchDto[]> {
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
      this.observableBranch.subscribe(
                result => { 
                  this.branchDto = result ;
                  this.itemCount = result.length;
                  for(i=0;i<result.length;i++){
                    if(result[i].statusId=='1'){
                      this.branchDto[i].status="Enable";
                    }else{
                      this.branchDto[i].status="Disable";
                    }
                   
                  }
                      new DataTableResource(this.branchDto).query(params).then(items => this.items = items);
                });
    }
   
    selectedBranch:any;
    rowClick(rowEvent) {
      this.isEditable=false;
      this.showBranchCard=true;
      this.selectedpersonname = rowEvent.row.item.name;
      this.branchDetails=rowEvent.row.item;
      this.selectedBranch=new BranchDto();
      this.selectedBranch.idBranch=this.branchDetails.branchId ;
       this.selectedBranch.branchName=this.branchDetails.branchName;
       this.selectedBranch.status=this.branchDetails.status;
       this.selectedBranch.cityName=this.branchDetails.cityName;
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
      var updateBranch=new BranchDto();
      updateBranch.branchId=this.selectedBranch.branchId;
      updateBranch.branchName=this.selectedBranch.branchName;
      updateBranch.cityName=this.selectedBranch.cityName;
      updateBranch.status=this.selectedBranch.status;
      updateBranch.code=this.selectedBranch.code;
      alert("Branch updation details is ::"+JSON.stringify(updateBranch));
      this.createBranch(updateBranch);
  }

    createBranch(updateBranch:BranchDto)
    {
    this.saveBranch(updateBranch).subscribe(result => {

    });
    alert("Branch details update successfully");
  }
  saveBranch(updateBranch:BranchDto) : Observable<Response>{
      return this.http
     .post(`http://localhost:8081/location/branch/save`,updateBranch);
    }

    disableSearch(){
      this.config.search=false;
    }
    enableSearch(){
      this.config.search=true;
    }


    showHideAddButton()
    {
       if (document.getElementById("addButtonForBranch").style.display == "none" ) {
           document.getElementById("addButtonForBranch").style.display="";
    
       } else {
          document.getElementById("addButtonForBranch").style.display="none";
     }
         
    }

    addComponent(){
      this.isShowBranchTableView=false;
      var comp = this._cfr.resolveComponentFactory(BranchComponent);
      var cityComponent = this.container.createComponent(comp);
      cityComponent.instance._ref = cityComponent;
     
  }

}
