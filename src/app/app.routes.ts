import { Routes } from '@angular/router';
import {CampaignListComponent} from './pages/campaign-list/campaign-list.component';
import {CampaignDetailComponent} from './pages/campaign-detail/campaign-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'campaigns', pathMatch: 'full' },
  { path: 'campaigns', component: CampaignListComponent },
  { path: 'campaigns/:uuid', component: CampaignDetailComponent },
];
