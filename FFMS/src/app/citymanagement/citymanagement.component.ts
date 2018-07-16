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
import { CityDto } from '../city/CityDTO';
import 'rxjs/add/operator/map'; 
import { Subscription } from 'rxjs/Subscription';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CityComponent } from '../city/city.component'


@Component({
  selector: 'app-citymanagement',
  templateUrl: './citymanagement.component.html',
  styleUrls: ['./citymanagement.component.scss'],
  providers : []
})
export class CitymanagementComponent implements OnInit {


  public cityDto: CityDto[];
  observableCities: Observable<CityDto[]>
  itemResource = new DataTableResource([]); 
  errorMessage: String;
  showCityCard=false;
 showAddButton=true;
    items = [];
    itemCount : number;
    selectedpersonname= '';
    public  citiesList= [];
   cityDetails:CityDto;
   config = {
    displayKey:"cityName", //if objects array passed which key to be displayed defaults to cityName,
    //search:true, //enables the search plugin to search in the list
    height: 'auto' //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    }

    cityStatus=["Enable","Disable"];
    selectedstatus = ['select stautus'];

    @ViewChild('parent', { read: ViewContainerRef }) container: ViewContainerRef;

    isShowCityTableView=true;

    constructor(private http: Http,private _cfr: ComponentFactoryResolver) {
      
    }

    isEdit=0;
    EditClicked(){
      this.isEdit=1;
    }
    disableButton(){
      this.showAddButton=false;
    }
    
    ngOnInit() {
      var num:any;
    

    this.observableCities = this.getCitiesWithObservable();
    this.observableCities.subscribe(
              result => { 
                this.cityDto=result;
                for(num=0;num<result.length;num++){
                  console.log("city status in city dto ::"+result[num].statusId);
                  if(result[num].statusId=='1'){
                    this.cityDto[num].status="Enable";
                  }else{
                   this. cityDto[num].status="Disable";
                  }
                  console.log("city status in city dsting::"+this.cityDto[num].status);
                 }
              
              }
            );
      }

     
      
      

     

      getCitiesWithObservable(): Observable<CityDto[]> {
        return this.http.get('http://localhost:8081/location/city/all')
	        .map(this.extractData)
	        .catch(this.handleErrorObservable);
    }


    private extractData(res: Response) {
    let cityModel = res.json();
    console.log("City details is :::"+JSON.stringify(cityModel))
        return cityModel;
    }

     convertServerCityModelIntoUICityModel(cityModel:CityDto):any {

      console.log("***************city model from server is ::: "+cityModel)
     
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
     // this.observableCities = this.getCitiesWithObservable();
      this.observableCities.subscribe(
                result => { 
                let num;
                  this.cityDto = result ;
                  console.log("result is :::"+result);
                  this.itemCount = result.length;
                  for(num=0;num<result.length;num++){
                    console.log("city status in city dto ::"+result[num].status);
                    if(result[num].statusId=='1'){
                      this.cityDto[num].status="Enable";
                    }else{
                     this. cityDto[num].status="Disable";
                    }
                    console.log("city status in city dsting::"+this.cityDto[num].status);
                   }
                      new DataTableResource(this.cityDto).query(params).then(items => this.items = items);
                });
      
    }


    rowClick(rowEvent) {
      this.isEdit=0;
      this.showCityCard =  true;
      this.cityDetails = rowEvent.row.item;
      this.selectedcity=new CityDto();
      this.selectedcity.idCity=this.cityDetails.cityId ;
       this.selectedcity.cityName=this.cityDetails.cityName;
       this.selectedcity.statusBean=this.cityDetails.status;
      
      this.selectedpersonname = rowEvent.row.item.name;
        console.log('Clicked: ' + rowEvent.row.item);
        console.log("Outside the result block citylist in array for dropllist ::"+this.citiesList);
    }

    rowDoubleClick(rowEvent) {

      alert('Double clicked: ' + rowEvent.row.item.name);
  }

  rowTooltip(item) { return item.jobTitle; }
  
  showCityList(){
    var num;
    this.observableCities.subscribe(
      result => { 
         for(num=0;num<result.length;num++){
         this.citiesList.push(result[num].cityName);
          console.log("inside the result block citylist in array for dropllist ::"+this.citiesList);

        }
      
      }
    );
    
  }
  onRowClick(){
    this.getCustomerDetails;
  }

  getCustomerDetails(item){
    this.isEdit=0;
    this.showCityCard =  true;
    this.cityDetails = item;
  }

  onClickCloseDetailsForm(){
    this.isEdit=0;
    this.showCityCard =  false;
  }

selectedcity:any;
updateCity=new CityDto();

 updateClicked(){
  
   let updateCity=new CityDto();
   alert("cityid is selected"+this.selectedcity.idCity);
   updateCity.cityId=this.selectedcity.idCity;
   updateCity.cityName=this.selectedcity.cityName;
   updateCity.status=this.selectedcity.statusBean;
   alert("Updating data that going to be update is ::"+JSON.stringify(updateCity));
   this.createCity(updateCity);
  }
    

    createCity(city :CityDto)
    {
      this.saveCity(city).subscribe(result => {
       
      });
      alert("City details update successfully");
    }
 
 
    saveCity(city : CityDto) : Observable<Response>{
        return this.http
       .post(`http://localhost:8081/location/city/save`,city);
       
      }
     
      addComponent(){
        this.isShowCityTableView=false;
        var comp = this._cfr.resolveComponentFactory(CityComponent);
        var cityComponent = this.container.createComponent(comp);
        cityComponent.instance._ref = cityComponent;
    }


    showHideCityAddButton()
{
   if (document.getElementById("cityAddButton").style.display == "none" ) {
       document.getElementById("cityAddButton").style.display="";

   } else {
      document.getElementById("cityAddButton").style.display="none";

}
     
}
}
