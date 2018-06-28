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
import { TicketViewModel } from './ticket'
import { TicketDetails } from './ticketDetails'
import { MatSnackBar } from '@angular/material';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-ticket-management',
  templateUrl: './ticket-management.component.html',
  styleUrls: ['./ticket-management.component.scss']
})
export class TicketManagementComponent implements OnInit {

  public tickets: any;

  public ticketDetails: TicketDetails;

  observableTickets: Observable<TicketViewModel[]>
  itemResource = new DataTableResource([]);
  errorMessage: String;
  items = [];
  itemCount: number;
  selectedpersonname = '';
  showTicketCard: boolean = false;
  isEditable : boolean = false;
  copyTicketDetails : TicketDetails;

  foods = [
    {value: 1, viewValue: 'Kiran'},
    {value: 2, viewValue: 'Karteek'},
    {value: 3, viewValue: 'Somesh'}
  ];

  constructor(private http: Http,public snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.observableTickets = this.getTicketsWithObservable();
    this.observableTickets.subscribe(
      result => {

      });

  }



  getTicketsWithObservable(): Observable<TicketViewModel[]> {
    return this.http.get('http://localhost:8081/ticket/list-view')
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }
 
  private extractData(res: Response) {
    let ticket = res.json();
    return ticket;
  }
  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
 

  // itemResource = new DataTableResource(this.books);


  reloadItems(params) {
    // alert(JSON.stringify(params));

    this.observableTickets = this.getTicketsWithObservable();
    this.observableTickets.subscribe(
      result => {

        this.tickets = result;
        this.itemCount = result.length;

        this.tickets.forEach(element => {  
        
          element.ticketCreationDate = this.transform( element.ticketCreationDate);
        
        });
        new DataTableResource(this.tickets).query(params).then(items => this.items = items);

      });

  }
  addnewCustomer() {
    let name = prompt("Please enter your name:", "");
    let type = prompt("Please enter your Email id:", "");
    let desc = prompt("Please enter your  Phone no:", "");
    let curentDate = new Date() + ' ';
    const asset1 = { 'assetName': 'assetName', ' assetDescription': 'assetDescription', 'assetTypeDes': 'assetTypeDes' };


    let val = confirm('Do you want to add');
    if (val) {
      this.tickets.push(this.tickets[0]);
      //this. itemResource = new DataTableResource(this.books);
      alert('Added Successfully');
    }

  }

  editCustomer(customer) {
    alert(JSON.stringify(customer));
  }
  deleteCustomer(customer) {
    let val = confirm('Do you want to delete');
    if (val) {
      alert('Going to delete');
    }
  }
  if(condition) {

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

  getTicketSummaryZoom(ticketId) {

    console.log("getTicketSummaryZoom clicked :: " + ticketId)

    this.showTicketCard = true;

    this.isEditable = false;

    this.callTicketSummaryZoomService(ticketId).subscribe(result => {

      result.forEach(element => {

        this.ticketDetails = element;
        console.log("Ticketdetails result :: "+ JSON.stringify(this.ticketDetails));
        this.openSnackBar("Success","");

      });


    });

  }

  callTicketSummaryZoomService(ticketId): Observable<TicketDetails[]> {

    return this.http.get('http://localhost:8081/ticket/details/'+ticketId)
      .map(result => result.json());
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  transform(value: string) {
    var datePipe = new DatePipe("en-US");
     value = datePipe.transform(value, 'MM-dd-yyyy');
     return value;
  }

  closeCard() {
    this.showTicketCard = false;
  }


  ticketEdit(ticketDetails) {
    this.isEditable = true;
    this.copyTicketDetails = ticketDetails;
    console.log("ticketDetails :: "+JSON.stringify( this.copyTicketDetails))
  }

}