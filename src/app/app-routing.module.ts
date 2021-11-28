import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { MembersCenterComponent } from './components/members/members-center/members-center.component';
import { ExternalApiComponent } from 'src/app/pages/external-api/external-api.component';
import { MembersMatListComponent } from './components/members/members-mat-list/members-mat-list.component';
import { MembersMatEditComponent } from './components/members/members-mat-edit/members-mat-edit.component';
import { ScorecardsMatCenterComponent } from './components/scorecards/scorecards-mat-center/scorecards-mat-center.component';
import { MatchesMatCenterComponent } from './components/matches/matches-mat-center/matches-mat-center.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'external-api',
    component: ExternalApiComponent,
  },
  {
    path: 'scorecards',
    component: ScorecardsMatCenterComponent,
    data: { expectedScopes: ['read: scorecards'] },
  },
  {
    path: 'matches',
    component: MatchesMatCenterComponent,
    data: { expectedScopes: ['read: matches'] },
  },
  {
    path: 'members',
    component: MembersCenterComponent,
    // component: MembersMatListComponent,
    // canActivate: [ScopeGuard],
    data: { expectedScopes: ['read:members'] },
  },
  { path: 'edit-members/:_id', component: MembersMatEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
