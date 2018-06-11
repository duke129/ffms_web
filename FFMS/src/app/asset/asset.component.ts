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

 

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})



@Injectable()
export class AssetComponent implements OnInit {


 public assets : Asset[];
 itemResource = new DataTableResource([]); 
 errorMessage: String;
 items = [];
 itemCount : number;
 selectedpersonname= '';

 constructor(private http : Http) {
        
 }
    
 ngOnInit() {
             
           
 }

     

 getAssets(): Observable<Asset[]> {

        return this.http.get('http://localhost:8081/asset/list')
	        .map(this.extractData)
            .catch(this.handleErrorObservable);
            
 }
    
 private extractData(res: Response) {

  let asset = res.json();
  return asset;

 }

 private handleErrorObservable (error: Response | any) {

	console.error(error.message || error);
    return Observable.throw(error.message || error);
    
 }
    
reloadItems(params) {

      this.getAssets().subscribe(result => { 
                
                  this.assets = result ;
                  this.itemCount = result.length;
                  new DataTableResource(this.assets).query(params).then(items => this.items = items);
      });
      
}
   

}
