import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from '../../data-table';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';


import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {AddTicektComponent} from '../../add-ticekt/add-ticekt.component';
import { ReportsComponent } from '../../reports/reports.component';
import { LocationComponent } from '../../location/location.component';
import { AssetComponent } from '../../asset/asset.component';
import { UserComponent } from '../../user/user.component';
import { TicketComponent } from '../../ticket/ticket.component';
import { CustomerManagementComponent } from '../../customer-management/customer-management.component';
import { TicketManagementComponent } from '../../ticket-management/ticket-management.component';
import {CreateticketComponent} from '../../createticket/createticket.component'

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
    DataTableModule,
    SelectDropDownModule,
    AngularDateTimePickerModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    ReportsComponent,
    LocationComponent,
    AssetComponent,
    UserComponent,
    TicketComponent,
    CustomerManagementComponent,
   AddTicektComponent,
  TicketManagementComponent,
  CreateticketComponent
  ]
})

export class AdminLayoutModule {}
