import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SudComponent } from './components/sud/sud.component';
import { PredmetComponent } from './components/predmet/predmet.component';
import { UcesnikComponent } from './components/ucesnik/ucesnik.component';
import { RocisteComponent } from './components/main/rociste/rociste.component';




const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  
  
  { path: 'home', component: HomeComponent },
  { path: 'sud', component: SudComponent },
  { path: 'rociste', component: RocisteComponent },
  { path: 'predmet', component: PredmetComponent },
  { path: 'ucesnik', component: UcesnikComponent },

  
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }