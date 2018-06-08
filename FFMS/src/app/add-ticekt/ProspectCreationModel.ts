
export class ProspectCreationModel{
    ticketDescription :string;
	ticketTypeId:number;
	prefferdCallTime:Date;
	customer : Customer
}

export class Customer{

		customerTittle:string;
		customerFirstName:string;
		customerMiddletName:string;
		customerLastName:string;
		customerMobileNumber:string;
	    customerAternateMobileNumber:string;
	    customerOfficeNumber:string;
	    customerEmailId:string;
	    customerAternateEmailId:string;
	    customerCommunicationAddress:string;
	    customerCurrentAddress:string;
	    cityId: number;
	    branchId:number;
        areaId:number
}
