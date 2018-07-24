import { Component, OnInit } from '@angular/core';
import { Customermodel } from './Customermodel'
//import {customercreationmodel, Customer} from './customercreationmodel'
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'; 
import { Title } from '@angular/platform-browser/src/browser/title';
import { Customer } from './Customer'

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {

  date: Date = new Date();
  settings = {
      bigBanner: true,
      timePicker: true,
      format: 'dd-MM-yyyy hh:mm:ss',
      defaultOpen: false
}
  constructor(private http:Http) { }
  public customermodel=new Customermodel();
  public custbackenddata=new Customermodel();
  public cust=new Customer();

  availableStates = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chattisgarh','Goa','Gujarat','Haryana',
'Himachal Pradesh','Jammu and Kashmir','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur',
"Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh",
"Uttarakhand","West Bengal"];
  multiple = false;
  selectedstate = ['select state'];

  availableCity=["Bangalore","Hyderabad","Chennai","Visakhapatnam"];
  selectedCity = ['select city'];

  availableBranch=["Indira Nagar","Jaya Nagar","Domlur","Kormangala"];
  selectedBranch = ['select branch'];

  availableArea=["Jaya Nagar Phase 1","Jaya Nagar Phase 2","JP Nagar Phase 4","Madiwala"];
  selectedArea = ['select area'];

  availableAssetType=["Refrigerator","Cooler","Battery","Laptop"];
  selectedAssetType=['Select Asset Type']

  availableSubArea=["BTM 2nd Stage","NS Palya"];
  selectedSubArea=["select sub"];

  availableTitle=["Mr.","Mrs.","Smt."];
  selectedTitle=["select Title"];
  config = {
    displayKey: 'description', // if objects array passed which key to be displayed defaults to description,
    search: true // enables the search plugin to search in the list
    };
  ngOnInit() {
  this.custbackenddata;
 // this.customer=this.customermodel;
 this.cust;

  }

   AddCustomerinfo(){

   

    this.custbackenddata.title="Mr.";
    this.custbackenddata.firstName=this.customermodel.firstName;
    this.custbackenddata.lastName=this.customermodel.lastName;
    this.custbackenddata.mobileNumber=this.customermodel.mobileNumber;
    this.custbackenddata.alternativeMobileNo= this.customermodel.alternativeMobileNo;
    this.custbackenddata.emailId=this.customermodel.emailId;
   // this.custbackenddata.status=  this.customermodel.status;
   // this.custbackenddata.area="domlur";
   // this.custbackenddata.branch="bangalore";
   // this.custbackenddata.city= "blr";
 

   this.cust = this.custbackenddata;
    console.log(" create prospect request :: "+JSON.stringify(this.custbackenddata));
    this.createProspect(this.cust);
    alert(JSON.stringify(this.cust));
   }

   createProspect(customer  : Customer)
   {
      this.saveProspect(customer).subscribe(result => {
      alert("Successfully Created Customer")
    });
     
   }
    saveProspect(cust : Customer) : Observable<Response>{

    return this.http
      .post(`http://localhost:8081/customer/add`,cust);
      // .map(res => res.json() );


   }

}
