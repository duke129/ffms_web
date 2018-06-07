import { Component, OnInit } from '@angular/core';
import { DataTableResource } from '../data-table';
import persons  from './customer-data'
//import persons  from './customer-data';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'; 
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Customer } from './customer';

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss']
})

@Injectable()
export class CustomerManagementComponent implements OnInit {

  public books : any;

  
  observableBooks: Observable<Customer[]>
  itemResource = new DataTableResource([]); 
  errorMessage: String;
    items = [];
    itemCount = 0;
    selectedpersonname= '';

    constructor(private http : Http) {
         this.itemResource.count().then(
           count => this.itemCount = count);
       //this.books=[new Asset("Refrigrator","Refrigrator","refrigrator")];
    }
    
    ngOnInit() {

   ///  this.http.get('http://localhost:8080/asset/list')
    //  .subscribe(response =>this.asset);
    this.observableBooks = this.getBooksWithObservable();
    this.observableBooks.subscribe(
              result => { 
            
              });
      
      }

     

      getBooksWithObservable(): Observable<Customer[]> {
        return this.http.get('http://localhost:8081/customer/getall')
	        .map(this.extractData)
	        .catch(this.handleErrorObservable);
    }
    getBooksWithPromise(): Promise<Customer[]> {
        return this.http.get('http://localhost:8081/customer/getall').toPromise()
	    .then(this.extractData)
	    .catch(this.handleErrorPromise);
    }
    private extractData(res: Response) {
  let book = res.json();
        return book;
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

      this.observableBooks = this.getBooksWithObservable();
      this.observableBooks.subscribe(
                result => { 
                
                  this.books = result ;
                  // this.itemCount = 12;

                  // alert("hi"+this.books);
                      new DataTableResource(this.books).query(params).then(items => this.items = items);
                });



      // alert("assets :: "+this.books);
      
    }
    addnewCustomer() {
    let name =  prompt("Please enter your name:", "");
    let type =  prompt("Please enter your Email id:", "");
    let desc =  prompt("Please enter your  Phone no:", "");
    let curentDate = new Date() + ' ';
     const asset1 = { 'assetName':'assetName', ' assetDescription': 'assetDescription', 'assetTypeDes': 'assetTypeDes'};

     
      let val = confirm('Do you want to add');
      if(val)
      {
        this.books.push(this.books[0]);
        //this. itemResource = new DataTableResource(this.books);
     alert('Added Successfully');
      }

    }

    editCustomer(customer) {
      alert(JSON.stringify( customer));
  }
  deleteCustomer(customer)
  {
    let val = confirm('Do you want to delete');
    if(val)
    {
   alert('Going to delete');
    }
  }
  if (condition) {

  }

    // special properties:
   public Edit(): void {
  alert(this.selectedpersonname);
}
    rowClick(rowEvent) {
      this.selectedpersonname = rowEvent.row.item.name;
        console.log('Clicked: ' + rowEvent.row.item);
    }

    rowDoubleClick(rowEvent) {

        alert('Double clicked: ' + rowEvent.row.item.name);
    }

    rowTooltip(item) { return item.jobTitle; }

}