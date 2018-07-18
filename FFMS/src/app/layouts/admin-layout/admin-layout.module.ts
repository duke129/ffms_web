import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {CdkTableModule} from '@angular/cdk/table';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
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
import { AssetComponent } from '../../asset/asset.component';
import { TicketComponent } from '../../ticket/ticket.component';
import { CustomerManagementComponent } from '../../customer-management/customer-management.component';
import { TicketManagementComponent } from '../../ticket-management/ticket-management.component';
import {CreateticketComponent} from '../../createticket/createticket.component';
import { AnalyticsComponent } from '../../analytics/analytics.component';
import { LocationtabmanagementComponent } from '../../locationtabmanagement/locationtabmanagement.component'
import { AreaComponent } from '../../area/area.component';
import { BranchComponent } from '../../branch/branch.component';
import { CityComponent } from '../../city/city.component';
import { CitymanagementComponent } from '../../citymanagement/citymanagement.component';
import { BranchmanagementComponent } from '../../branchmanagement/branchmanagement.component';
import { AreamanagementComponent } from '../../areamanagement/areamanagement.component';
import { UserManagementComponent } from '../../user-management/user-management.component';
import { UserGroupComponent } from '../../user-group/user-group.component';
import { UserComponent } from '../../user/user.component'

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    DataTableModule,
    SelectDropDownModule,
    AngularDateTimePickerModule,
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
    LocationtabmanagementComponent,
    AssetComponent,
    TicketComponent,
    CustomerManagementComponent,
   AddTicektComponent,
   AnalyticsComponent,
  TicketManagementComponent,
  CreateticketComponent,
  AreaComponent,
  BranchComponent,
  CityComponent,
  CitymanagementComponent,
  BranchmanagementComponent,
  AreamanagementComponent,
  UserManagementComponent,
  UserGroupComponent,
  UserComponent
  ],
  entryComponents: [CityComponent,BranchComponent,AreaComponent,UserComponent]
})

export class AdminLayoutModule {}
