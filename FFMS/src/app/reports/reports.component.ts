import { Component, OnInit } from '@angular/core';
import { DataTableResource } from '../data-table';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';
import { DatePipe } from '@angular/common';
import  { TicketViewModel } from '../ticket-management/ticket'

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  panelOpenState: boolean = false;
  public tickets : TicketViewModel[];

  itemResource = new DataTableResource([]);

  items = [];
  itemCount : number;

  constructor(private http : Http) {
   }

  ngOnInit() {
  }

 

getReportData(): Observable<TicketViewModel[]> {
    return this.http.get('http://localhost:8081/ticket/list-view')
      .map(this.extractData)
      .catch(this.handleError);
}

private extractData(res: Response) {

  let ticket = res.json();
  return ticket;

}

private handleError (error: Response | any) {

    console.error(error.message || error);
    return Observable.throw(error.message || error);

}

reloadItems(params) {

  this.getReportData().subscribe( result =>
    {
      this.tickets = result ;
      this.itemCount = result.length;

      this.tickets.forEach(element => {  
        
        element.ticketCreationDate = this.transform( element.ticketCreationDate);
      
      });

      new DataTableResource(this.tickets).query(params).then(items => this.items = items);

    });
}

transform(value: string) {
  var datePipe = new DatePipe("en-US");
   value = datePipe.transform(value, 'MM-dd-yyyy');
   return value;
}

}
