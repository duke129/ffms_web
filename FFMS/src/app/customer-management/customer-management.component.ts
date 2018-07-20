import { Component, OnInit } from '@angular/core';
import { DataTableResource } from '../data-table';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Customer } from './customer';
import { CustomerFilter } from './customerfilter';

@Component({
    selector: 'app-customer-management',
    templateUrl: './customer-management.component.html',
    styleUrls: ['./customer-management.component.scss']
})

@Injectable()
export class CustomerManagementComponent implements OnInit {

    public customers: Customer[];
    observable: Observable<Customer[]>
    itemResource = new DataTableResource([]);
    items = [];
    itemCount: number;
    selectedCustomer = '';
    customerDetails: Customer;
    showCustomerCard: boolean = false;
    isEditable: boolean = false;
    copyCustomerDetails: Customer;
    baseURL = "http://localhost:8081/";
    public customerFilter= new  CustomerFilter();

    constructor(private http: Http) {
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


    private handleErrorObservable(error: Response | any) {

        console.error(error.message || error);
        return Observable.throw(error.message || error);

    }


    // reloadItems(customerGridParams) {

    //     this.getCustomers().subscribe(result => {

    //         this.customers = result;
    //         this.itemCount = result.length;
    //         new DataTableResource(this.customers).query(customerGridParams).then(items => this.items = items);

    //     });

    // }

    getFilter(filter:CustomerFilter)
    {
   alert(JSON.stringify(filter))
   this.reloadItems(filter); 
    }


    reloadItems(params) {
        console.log("result"+JSON.stringify(params));
        this.customerFilter.offset=params.offset;
        this.customerFilter.pageSize=params.limit;
        this.getGridView(this.customerFilter).subscribe(result => { 
                  let i;
                  
                    this.customers = result ;
                   // this.customers=this.customer;
                console.log("result"+JSON.stringify(this.customers));

                if (this.customers !=[] && this.customers.length > 0) {
                    this.itemCount = this.customers[0].count;
                  }
                  else
                  {this.itemCount =0;     } 
        
                    new DataTableResource(this.customers).query(params);
                  //  .then(items => this.items = items);
        });
    }

    getCustomerInDetail(customer) {

        this.customerDetails = customer;
        this.showCustomerCard = true;


    }

    closeCard() {
        this.showCustomerCard = false;
    }


    customerEdit(customerDetails) {
        this.isEditable = true;
        this.copyCustomerDetails = customerDetails;
        console.log("customerDetails :: " + JSON.stringify(this.copyCustomerDetails))
    }

    restCustomerEdit() {

        console.log("before customerDetails :: " + JSON.stringify(this.copyCustomerDetails))
        this.customerDetails = this.copyCustomerDetails;
        console.log("reset customerDetails :: " + JSON.stringify(this.customerDetails))
        this.isEditable = false;
    }

    updateCustomer(customerDetails) {

        console.log("update customerDetails :: " + JSON.stringify(this.customerDetails));

        this.updateCustomerService(customerDetails).subscribe(result => {
            this.isEditable = false;

        });
        

    }

    updateCustomerService(customerDetails : Customer) : Observable<Response>{

        return this.http.put(this.baseURL+'customer/modify',customerDetails);

    }

    getGridView(filter:CustomerFilter): Observable<Customer[]>{
        return this.http
        .post(`http://localhost:8081/customer/filter`,filter).map(this.extractData)
        .catch(this.handleErrorObservable);
        
       }

}