import { Component, OnInit } from '@angular/core';
import { DataTableResource } from '../data-table';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

    public customers: any;
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


    reloadItems(customerGridParams) {

        this.getCustomers().subscribe(result => {

            this.customers = result;
            this.itemCount = result.length;
            new DataTableResource(this.customers).query(customerGridParams).then(items => this.items = items);

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



}