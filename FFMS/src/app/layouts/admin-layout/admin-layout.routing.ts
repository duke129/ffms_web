import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { ReportsComponent } from '../../reports/reports.component';
import { UserComponent } from '../../user/user.component';
import { LocationComponent } from '../../location/location.component';
import { AssetComponent } from '../../asset/asset.component';
import { TicketComponent } from '../../ticket/ticket.component';
import { CustomerManagementComponent } from '../../customer-management/customer-management.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
//     { path: 'user-profile',   component: UserProfileComponent },
//     { path: 'table-list',     component: TableListComponent },
//     { path: 'typography',     component: TypographyComponent },
//     { path: 'icons',          component: IconsComponent },
//    // { path: 'maps',           component: MapsComponent },
//     { path: 'notifications',  component: NotificationsComponent },
//     { path: 'upgrade',        component: UpgradeComponent },
    { path: 'report-management', component: ReportsComponent },
    { path: 'user-management', component: UserComponent },
    { path: 'location-management', component: LocationComponent },
    { path: 'asset-management', component: AssetComponent },
    { path: 'ticket-management', component: TicketComponent },
    { path: 'customer-management', component: CustomerManagementComponent },
];
