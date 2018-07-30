import { Component, OnInit,ViewChild,ComponentFactoryResolver,ViewContainerRef  } from '@angular/core';
import { DataTableResource } from '../data-table';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UserDto } from '../user/userDto';
import { UserComponent } from '../user/user.component'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {

  public areaDto: UserDto[];
  observableArea: Observable<UserDto[]>
  itemResource = new DataTableResource([]); 
  errorMessage: String;
    items = [];
    itemCount : number;
    selectedpersonname= '';
    isEditable=false;
    showAreaCard=false;
    areaDetails:UserDto;
    isshowTableView=true;

    @ViewChild('userparent', { read: ViewContainerRef }) container: ViewContainerRef;
   
    constructor(private http: Http,private _cfr: ComponentFactoryResolver) {
      
    }

    ngOnInit() {
     this.observableArea = this.getAreaWithObservable();
     this.observableArea.subscribe(
                result => { 
                  
                });
             
        }


        getAreaWithObservable(): Observable<UserDto[]> {
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
                      if(result[num].statusBean==1){
                        this.areaDto[num].status="Enable";
                      }else{
                       this. areaDto[num].status="Disable";
                      }
                     if(num==0){
                        this.areaDto[num].userGroupName="Admin"; 
                      }else{
                        this.areaDto[num].userGroupName="Network Engineer";
                      }
                      
                     }
                    
                        new DataTableResource(this.areaDto).query(params).then(items => this.items = items);
                  });
        
      }



      addComponent(){
       // alert("dynamic component called!")
       this.isshowTableView=false;
        var comp = this._cfr.resolveComponentFactory(UserComponent);
        var cityComponent = this.container.createComponent(comp);
        cityComponent.instance._ref = cityComponent;
    }

    

    showHideAddButtonOfUser(){
      //alert("show/Hide function called")
      if (document.getElementById("ButtonForAddNewUser").style.display == "none" ) {
        document.getElementById("ButtonForAddNewUser").style.display="";
 
    } else {
       document.getElementById("ButtonForAddNewUser").style.display="none";
  }
    }

}
