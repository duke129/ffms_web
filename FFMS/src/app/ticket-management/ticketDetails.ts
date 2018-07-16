import { Activity } from "./activity";

export class TicketDetails {

    ticketId: string;
    ticketNo: string;
    ticketDescription: string;
    currentAssigneeId: string;
    currentAssigneeName: string;
    ticketStatus: string;
    ticketCreatedTime: string;
    ticketTypeId: string;
    ticketTypeName: string;
    ticketSource: string;
    prefferdCallTime: string;

    assetId: string;
    assetTypeId: string;
    assetTypeName: string;
    assetDescription: string;
    assetInstallationAddress: string;
    assetLat: string;
    assetLong: string;

    customerId: string;
    title: string;
    firstName: string;
    middletName: string;
    lastName: string;
    mobileNumber: string;
    alternateMobileNumber: string;
    officeNumber: string;
    emailId: string;
    alternateEmailId: string;
    communicationAddress: string;
    activities: Activity[];
}