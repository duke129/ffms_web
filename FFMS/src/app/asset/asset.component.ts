import { Component, OnInit } from '@angular/core';
import { DataTableResource } from '../data-table';
//import persons  from './customer-data'
@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class AssetComponent implements OnInit {

  ngOnInit() {
  }

  itemResource = new DataTableResource([]);

    items = [];
    itemCount = 0;
    selectedpersonname= '';

    constructor() {
        this.itemResource.count().then(count => this.itemCount = count);
    }

    reloadItems(params) {
        this.itemResource.query(params).then(items => this.items = items);
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
