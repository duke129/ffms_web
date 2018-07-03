import { cityModel } from "../city/cityModel";
import { City } from '../branchmanagement/city'
import { StatusBean } from "../branchmanagement/statusBean";

export class Branch{
    idBranch:string;
    branchName:string;
    branchCode:string;
    branchDescription:string;
    branchStatus:string;
    branchCity:string;
    city:City;
    statusBean:StatusBean;

}