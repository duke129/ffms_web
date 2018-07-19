import { Component, OnInit,ViewChild,ComponentFactoryResolver,ViewContainerRef,forwardRef } from '@angular/core';
import { DataTableResource } from '../data-table';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UserGroupDto } from '../user-group/userGroupDto';
import { UserGroupComponent } from '../user-group/user-group.component';

@Component({
  selector: 'app-user-group-profile',
  templateUrl: './user-group-profile.component.html',
  styleUrls: ['./user-group-profile.component.scss'],
  providers: [forwardRef(() => UserGroupProfileComponent)]
  
})
export class UserGroupProfileComponent implements OnInit {

  public areaDto: UserGroupDto[];
  observableArea: Observable<UserGroupDto[]>
  itemResource = new DataTableResource([]); 
  errorMessage: String;
    items = [];
    itemCount : number;
    selectedpersonname= '';
    isEditable=false;
    showAreaCard=false;
    areaDetails:UserGroupDto;
    isshowTableView=true;

    @ViewChild('usergroupparent', { read: ViewContainerRef }) container: ViewContainerRef;
   
    constructor(private http: Http,private _cfr: ComponentFactoryResolver) {
      
    }

    ngOnInit() {
     this.observableArea = this.getAreaWithObservable();
     this.observableArea.subscribe(
                result => { 
                  
                });
             
        }


        getAreaWithObservable(): Observable<UserGroupDto[]> {
          return this.http.get('http://localhost:8081/user/getall')
            .map(this.extractData)
            .catch(this.handleErrorObservable);
      }
      private extractData(res: Response) {
      let area = res.json();
      console.log("Area deatails comes from server is :::"+JSON.stringify(area));
          return area;
      }
      private handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
      }



      reloadItems(params) {
        this.observableArea.subscribe(
          result => { 
                  let num:number;
                  this.areaDto = result ;
                    this.itemCount = result.length;
                    for(num=0;num<result.length;num++){
                      if(result[num].status=='1'){
                        this.areaDto[num].status="Enable";
                      }else{
                       this. areaDto[num].status="Disable";
                      }
                     }
                        new DataTableResource(this.areaDto).query(params).then(items => this.items = items);
                  });
        
      }



      addComponent(){
        alert("dynamic component called!")
       this.isshowTableView=false;
        var comp = this._cfr.resolveComponentFactory(UserGroupComponent);
        var cityComponent = this.container.createComponent(comp);
        cityComponent.instance._ref = cityComponent;
    }

    

    showHideAddButtonOfUser(){
      alert("show/Hide function called")
      if (document.getElementById("ButtonForAddNewUser").style.display == "none" ) {
        document.getElementById("ButtonForAddNewUser").style.display="";
 
    } else {
       document.getElementById("ButtonForAddNewUser").style.display="none";
  }
    }


}
