import { Component, OnInit,ViewChild,ComponentFactoryResolver,ViewContainerRef  } from '@angular/core';
import { DataTableResource } from '../data-table';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'; 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AreaDto } from '../area/areaDto';
import { AreaComponent } from '../area/area.component';
import { AreaFilter } from './areaFilter'


@Component({
  selector: 'app-areamanagement',
  templateUrl: './areamanagement.component.html',
  styleUrls: ['./areamanagement.component.scss']
})
export class AreamanagementComponent implements OnInit {
  public areaDto: AreaDto[];
  observableArea: Observable<AreaDto[]>
  itemResource = new DataTableResource([]); 
  errorMessage: String;
    items = [];
    itemCount : number;
    selectedpersonname= '';
    isEditable=false;
    showAreaCard=false;
    areaDetails:AreaDto;
    isshowTableView=true;
    public areaFilter=new AreaFilter();
    public totalGlobalCount;

    @ViewChild('parent', { read: ViewContainerRef }) container: ViewContainerRef;
   
    constructor(private http: Http,private _cfr: ComponentFactoryResolver) {
      
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

      this.getCountValue();
           
      }



      getAreaWithObservable(): Observable<AreaDto[]> {
        return this.http.get('http://localhost:8081/location/area/all')
	        .map(this.extractData)
	        .catch(this.handleErrorObservable);
    }
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
     
    // reloadItems(params) {
    //   this.observableArea.subscribe(
        
    //             result => { 
    //               let num;
    //             this.areaDto = result ;
    //               this.itemCount = 17;
    //               for(num=0;num<result.length;num++){
    //                 console.log("city status in city dto ::"+result[num].status);
    //                 if(result[num].statusId=='1'){
    //                   this.areaDto[num].status="Enable";
    //                 }else{
    //                  this. areaDto[num].status="Disable";
    //                 }
    //                 console.log("city status in city dsting::"+this.areaDto[num].status);
    //                }
    //                   new DataTableResource(this.areaDto).query(params).then(items => this.items = items);
    //             });
      
    // }

public selectedArea=new AreaDto();
    rowClick(rowEvent) {
      this.isEditable=false;
      this.showAreaCard=true;
      this.selectedpersonname = rowEvent.row.item.name;
      this.areaDetails=rowEvent.row.item;
      this.selectedArea=new AreaDto();
      this.selectedArea.areaId=this.areaDetails.areaId;
      this.selectedArea.areaName=this.areaDetails.areaName;
      this.selectedArea.code=this.areaDetails.code;
      this.selectedArea.branchName=this.areaDetails.branchName;
      this.selectedArea.cityName=this.areaDetails.cityName;
      this.selectedArea.status=this.areaDetails.status;
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
      let updateArea=new AreaDto();
      updateArea.areaId=this.selectedArea.areaId;
      updateArea.areaName=this.selectedArea.areaName;
      updateArea.code=this.selectedArea.code;
      updateArea.branchName=this.selectedArea.branchName;
     updateArea.status=this.selectedArea.status;
     alert("Area details that going to be save into databases:::"+JSON.stringify(updateArea));

     this.createArea(updateArea);

    }



    createArea(areaModel:AreaDto)
    {
      
      this.saveArea(areaModel).subscribe(result => {
      });
      alert("Area details update successfully");
    }
 
 
    saveArea(areaModel:AreaDto) : Observable<Response>{
        return this.http
       .post(`http://localhost:8081/location/area/save`,areaModel);
      }
    
      

      showHideAddButtonForArea()
    {
       if (document.getElementById("addButtonForArea").style.display == "none" ) {
           document.getElementById("addButtonForArea").style.display="";
    
       } else {
          document.getElementById("addButtonForArea").style.display="none";
     }
         
    }

    addComponent(){
      this.isshowTableView=false;
      var comp = this._cfr.resolveComponentFactory(AreaComponent);
      var cityComponent = this.container.createComponent(comp);
      cityComponent.instance._ref = cityComponent;
  }


  getFilter(areaFilter:AreaFilter){
    
    if(areaFilter.areaName!=null || areaFilter.code!=null ){
    
      this.getGridResultCount(areaFilter).subscribe(result=>{
       this.totalGlobalCount=result;
      // alert("*******"+JSON.stringify(this.totalGlobalCount));
       });
      
       this.reloadItems(areaFilter);
     }
  }

  getGridView(areaFilter:AreaFilter): Observable<AreaDto[]>{
    return this.http
    .post(`http://localhost:8081/location/areafilter`,areaFilter).map(this.extractData)
    .catch(this.handleErrorObservable);
    
   }

   getGridResultCount(areaFilter:AreaFilter): Observable<Number>{
    return this.http
    .post(`http://localhost:8081/location/areacount`,areaFilter).map(this.extractData)
    .catch(this.handleErrorObservable);
    
   }

   getCountValue(){
    this.totalGlobalCount =this.getGridResultCount(this.areaFilter).subscribe(result=>{

      this.totalGlobalCount=result;
    });
  }



  reloadItems(params) {
    this.areaFilter.offset=params.offset;
    this.areaFilter.pageSize=params.limit;
   
     this.getGridView(this.areaFilter).subscribe(result => { 
                  let i;
                  this.areaDto = result ;
                 // alert("City filter details in resload "+JSON.stringify(result));
                    for(i=0;i<result.length;i++){
                     
                      if(result[i].statusId=="1"){
                        this.areaDto[i].status="Enable";
                      }else{
                        this. areaDto[i].status="Disable";
                      }
                    }
                    

  if (this.areaDto !=[] && this.areaDto.length > 0) {
    this.itemCount =this.totalGlobalCount;
  }
  else
  {
    this.itemCount =0;
  }   
           console.log("params :: "+JSON.stringify(params))
                    new DataTableResource(this.areaDto).query(params);
        });
      
  }


}
