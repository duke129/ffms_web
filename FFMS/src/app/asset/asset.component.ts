import { Component, OnInit } from '@angular/core';
import { DataTableResource } from '../data-table';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'; 
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Asset } from './asset';
import {AssetFilter} from './assetfilter'

 

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})



@Injectable()
export class AssetComponent implements OnInit {

 public showBranchCard=false;
 public assetDetails=new Asset;
 public assets : Asset[];
 public assetsFilter:AssetFilter;
 errorMessage: String;
 items = [];
 itemCount : number;
 selectedpersonname= '';
public assetFilter=new AssetFilter;
 public asset=new Asset();
 public assetdata=new Asset();
 public a=new Asset();
 

 constructor(private http : Http) {
        
 }

 config = {
  displayKey:"name", //if objects array passed which key to be displayed defaults to cityName,
  search:true, //enables the search plugin to search in the list
  height: 'auto' //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
  }
  availableStatus=["Enable","Disable"];
 ngOnInit() {
             
  this.getGridView(this.assetsFilter);     
 }

 getBranchDetails(item){
  this. isEditable=0;
  this.assetDetails=item;
  this.showBranchCard=true;
  
  
    }
    selectedAsset:any;
    rowClick(rowEvent){
      this. isEditable=0;
      this.showBranchCard =  true;
      this.assetDetails = rowEvent.row.item;
      this.assetdata.idAsset=this.assetDetails.idAsset;
      this.assetdata.customerId=this.assetDetails.customerId;
      alert("selected items details is  ::"+JSON.stringify(this.assetDetails));

      this.selectedAsset=new Asset();

    }

//  getAssets(): Observable<Asset[]> {

//         return this.http.get('http://localhost:8081/asset/list')
// 	        .map(this.extractData)
//             .catch(this.handleErrorObservable);
            
//  }
    
 private extractData(res: Response) {

  let asset = res.json();
  return asset;

 }

 private handleErrorObservable (error: Response | any) {

	console.error(error.message || error);
    return Observable.throw(error.message || error);
    
 }

 getFilter(assetFilter:AssetFilter)
 {
alert(JSON.stringify(assetFilter))
this.reloadItems(assetFilter); 
 }
    
reloadItems(params) {
  alert(JSON.stringify(params));

  this.assetFilter.offset=params.offset;
  this.assetFilter.pageSize=params.limit;
 
   this.getGridView(this.assetFilter).subscribe(result => { 
                let i;
                  this.assets = result ;
                
                  for(i=0;i<result.length;i++){
                    Asset
                    if(result[i].status=="1"){
                      this.assets[i].status="Enable";
                    }else{
                      this.assets[i].status="Disable";
                    }
                  }
                  

if (this.assets !=[] && this.assets.length > 0) {
  this.itemCount = this.assets[0].count;
}
else
{this.itemCount =0;     }   
         //  console.log("ORi"+JSON.stringify(this.assets));
         console.log("params :: "+JSON.stringify(params))
                  new DataTableResource(this.assets).query(params);
                  //  .then(items =>
                  //    {
                  //     this.items = items;

                  //    } );
                
      });
      
}




isEditable=0;

onClickCloseDetailsForm(){
 this. isEditable=0;
  this.showBranchCard=false;
}
   
EditClicked(){
  this.isEditable=1;

}

updateClicked(){

}


addAssetinfo(){
  

   
  
  this.assetdata.assetName=this.assetDetails.assetName;
  this.assetdata.assetDescription=this.assetDetails.assetDescription;
  this.assetdata.installationLat=this.assetDetails.installationLat;
  this.assetdata.installationLong=this.assetDetails.installationLong;
  this.assetdata.customerName=this.assetDetails.customerName;
  
  if(this.assetDetails.status="Enable")
  this.assetdata.status='1';
  else
  this.assetdata.status='0';


  



  console.log(" create prospect request :: "+JSON.stringify(this.assetdata));
  this.createProspect(this.assetdata);
  alert(JSON.stringify(this.assetdata));
 }

 createProspect(assets  : Asset)
 {

    this.saveProspect(assets).subscribe(result => {
    alert("Successfully Created Asset")
  });
   
 }
  saveProspect(a : Asset) : Observable<Response>{

  return this.http
    .post(`http://localhost:8081/asset/update`,a);
    // .map(res => res.json() );


 }


 getGridView(assetFilter:AssetFilter): Observable<Asset[]>{
  return this.http
  .post(`http://localhost:8081/asset/filter`,assetFilter).map(this.extractData)
  .catch(this.handleErrorObservable);
  
 }

}
