import { Component, OnInit } from '@angular/core';
import { DataTableResource } from '../data-table';
import persons  from './customer-data'
@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class AssetComponent implements OnInit {

  ngOnInit() {
  }

  itemResource = new DataTableResource(persons);

    items = [];
    itemCount = 0;
    selectedpersonname= '';

    constructor() {
        this.itemResource.count().then(count => this.itemCount = count);
    }

    reloadItems(params) {
        this.itemResource.query(params).then(items => this.items = items);
    }
    addnewCustomer() {
    let name =  prompt("Please enter your name:", "");
    let type =  prompt("Please enter your Email id:", "");
    let desc =  prompt("Please enter your  Phone no:", "");
    let curentDate = new Date() + ' ';
     const person1 = { 'name':name, 'type': type, 'desc': 'desc'};
      let val = confirm('Do you want to add');
      if(val)
      {
        persons.push(person1);
        this. itemResource = new DataTableResource(persons);
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
