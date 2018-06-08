import { Component, OnInit } from '@angular/core';
import { DataTableResource } from '../data-table';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'; 
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Customer } from './customer';

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss']
})

@Injectable()
export class CustomerManagementComponent implements OnInit {

    public customers : any;
    observable: Observable<Customer[]>
    itemResource = new DataTableResource([]); 
    items = [];
    itemCount = 0;
    selectedCustomer= '';
    baseURL = "http://10.16.35.96:8081/";

    constructor(private http : Http) {
         this.itemResource.count().then(
           count => this.itemCount = count);
    }
    
    ngOnInit() {
      
    }

    getCustomers(): Observable<Customer[]> {

        return this.http.get(this.baseURL + 'customer/getall')
	        .map(this.extractData)
          .catch(this.handleErrorObservable);
          
    }


    private extractData(res: Response) {

        let customer = res.json();
        return customer;

    }


    private handleErrorObservable (error: Response | any) {

       console.error(error.message || error);
       return Observable.throw(error.message || error);
       
    }
    
    
    reloadItems(customerGridParams) {

      this.getCustomers().subscribe(result =>
        { 
                
            this.customers = result ;
            this.itemCount = result.length;
            new DataTableResource(this.customers).query(customerGridParams).then(items => this.items = items);
            
        });
      
    }


}