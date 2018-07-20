import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Asset } from '.././asset';
import {NodeVo} from '.././nodevo';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss']
})
export class AddAssetComponent implements OnInit {

  public availableCity : any[];
  public node : NodeVo[];
  public asset=new Asset();
  public assetdata=new Asset();
  public a=new Asset();
  public assettypeId:any;
  public selectedOptions =[];
  public selectedStatus=[];
  public availablestatus=['Disable','Enable'];
  public status:any;
  objervableAsset=new Observable<NodeVo[]>();
 
  constructor(private http:Http) {
    
   }

  ngOnInit() {
  
    this.objervableAsset=this.doGET();
    this.objervableAsset.subscribe(result=>{
    this.node=result; 
    this.availableCity = result;
     })
    

  }

  config = {
    displayKey:"name", //if objects array passed which key to be displayed defaults to cityName,
    search:true, //enables the search plugin to search in the list
    height: 'auto' //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    }

    selectionChanged(e){
     this. assettypeId= this.selectedOptions[0].id;
     if(this.selectedStatus[0]=='Enable'){
      this. status=1;
     }
     else
     this.status=0;
          }

private extractData(res: Response) {

let vo = res.json();

console.log("Asset details converted into json format:::"+JSON.stringify(vo));
return vo;

}

private handleErrorObservable (error: Response | any) {

console.error(error.message || error);
return Observable.throw(error.message || error);

}

public getAssetValueIntoModel(vo:NodeVo){

 this.availableCity[0]= vo.name;
 this.availableCity[1]= vo.name;


}
  doGET():Observable<NodeVo[]> {
    console.log("GET");
    let url = `http://localhost:8081/asset/type/list`;
   return this.http.get(url).map(this.extractData).catch(this.handleErrorObservable);
    
    
    //.subscribe(res => console.log(res.text())); 
  }

  addAssetinfo(){
  

   

    this.assetdata.assetName=this.asset.assetName;
    this.assetdata.assetDescription=this.asset.assetDescription;
    this.assetdata.installationLat=this.asset.installationLat;
    this.assetdata.installationLong=this.asset.installationLong;
    
 

  
    console.log(" create prospect request :: "+JSON.stringify(this.assetdata));
    this.createProspect(this.assetdata);
    alert(JSON.stringify(this.assetdata));
   }

   createProspect(assets  : Asset)
   {
     assets.idAssetType=this.assettypeId;
     assets.status=this.status;
      this.saveProspect(assets).subscribe(result => {
      alert("Successfully Created Asset")
    });
     
   }
    saveProspect(a : Asset) : Observable<Response>{

    return this.http
      .post(`http://localhost:8081/asset/add`,a);
      // .map(res => res.json() );


   }

}
