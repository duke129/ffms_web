import { Component, OnInit } from '@angular/core';
import { TicketModel } from './ticketModel'

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
  constructor() { }
  public ticket=new TicketModel();

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
    alert(JSON.stringify(this.ticket));
   }

   
}


