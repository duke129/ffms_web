import { Component, OnInit } from '@angular/core';
import { TicketModel } from './ticketModel'
import {ProspectCreationModel, Customer} from './ProspectCreationModel'

import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'; 




@Component({
  selector: 'app-add-ticekt',
  templateUrl: './add-ticekt.component.html',
  styleUrls: ['./add-ticekt.component.scss']
})
export class AddTicektComponent implements OnInit {
  date: Date = new Date();
  settings = {
      bigBanner: true,
      timePicker: true,
      format: 'dd-MM-yyyy hh:mm:ss',
      defaultOpen: false
}
  constructor(private http:Http) { }
  public ticket=new TicketModel();
  public createTicket = new ProspectCreationModel();
  public customer = new Customer();

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
   // search: true // enables the search plugin to search in the list
    };
  ngOnInit() {
  this.ticket;

  }

   AddCustomerinfo(){

    this.createTicket.ticketDescription = "sales ticket";
    this.createTicket.ticketTypeId = 1;


    this.customer.customerTittle = "Mr.";
    this.customer.customerFirstName = this.ticket.firstName;
    this.customer.customerMiddletName = this.ticket.middleName;
    this.customer.customerLastName = this.ticket.lastName;
    this.customer.customerMobileNumber = this.ticket.mobileNo;
    this.customer.customerAternateMobileNumber = this.ticket.altMobileNo;
    this.customer.customerEmailId = this.ticket.emailId;
    this.customer.customerAternateEmailId = this.ticket.altEmailId;
    this.customer.customerCommunicationAddress = this.ticket.addressLine1 +" " + this.ticket.addressLine2 + " "  + this.ticket.addressLine3 + " " + this.ticket.pincode;
   // this.customer.customerCurrentAddress = this.createTicket.customer.customerCommunicationAddress;

    this.createTicket.customer = this.customer;


    console.log(" create prospect request :: "+JSON.stringify(this.createTicket));

    this.createProspect(this.createTicket);


    alert(JSON.stringify(this.ticket));
   }

   createProspect(createTicket  : ProspectCreationModel)
   {
     //alert("calling create prospect ");
     this.saveProspect(createTicket).subscribe(result => {
     //  console.log("Response :: "+result)
    // this.showNotification('bottom','right');

    alert("Successfully Created Prospect")

     });
     
   }


   saveProspect(ticekt : ProspectCreationModel) : Observable<Response>{

    return this.http
      .post(`http://10.16.35.96:8081/ticket/create`,ticekt);
      // .map(res => res.json() );


   }

   
}


