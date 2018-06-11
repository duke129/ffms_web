import { Component, OnInit } from '@angular/core';
import { DataTableResource } from '../data-table';
//import persons  from './customer-data'
//import persons  from './customer-data';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'; 
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import  {TicketViewModel } from './ticket'


@Component({
  selector: 'app-ticket-management',
  templateUrl: './ticket-management.component.html',
  styleUrls: ['./ticket-management.component.scss']
})
export class TicketManagementComponent implements OnInit {

  public tickets : any;

  observableTickets: Observable<TicketViewModel[]>
  itemResource = new DataTableResource([]); 
  errorMessage: String;
    items = [];
    selectedpersonname= '';

    constructor(private http : Http) {
       
    }
    
    ngOnInit() {
    this.observableTickets = this.getTicketsWithObservable();
    this.observableTickets.subscribe(
              result => { 
                
              });
           
      }

     

      getTicketsWithObservable(): Observable<TicketViewModel[]> {
        return this.http.get('http://10.16.35.96:8081/ticket/list-view')
	        .map(this.extractData)
	        .catch(this.handleErrorObservable);
    }
    getTicketsWithPromise(): Promise<TicketViewModel[]> {
        return this.http.get('http://10.16.35.96:8081/ticket/list-view').toPromise()
	    .then(this.extractData)
	    .catch(this.handleErrorPromise);
    }
    private extractData(res: Response) {
    let ticket = res.json();
        return ticket;
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

      this.observableTickets = this.getTicketsWithObservable();
      this.observableTickets.subscribe(
                result => { 
                
                  this.tickets = result ;
                  this.itemCount = result.length;

                  // alert("hi"+this.books);
                      new DataTableResource(this.tickets).query(params).then(items => this.items = items);
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
        this.tickets.push(this.tickets[0]);
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