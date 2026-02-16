import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Material Moduli
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox'; 

// Komponente
import { HomeComponent } from './components/home/home.component';
import { SudComponent } from './components/sud/sud.component'; 
import { RocisteComponent } from './components/main/rociste/rociste.component'; 
import { PredmetComponent } from './components/predmet/predmet.component';
import { UcesnikComponent } from './components/ucesnik/ucesnik.component';
import { LoginComponent } from './components/login/login.component';

// Dijalozi
import { SudDialogComponent } from './components/dialogs/sud-dialog/sud-dialog.component';
import { RocisteDialogComponent } from './components/dialogs/rociste-dialog/rociste-dialog.component'; 
import { PredmetDialogComponent } from './components/dialogs/predmet-dialog/predmet-dialog.component';
import { UcesnikDialogComponent } from './components/dialogs/ucesnik-dialog/ucesnik-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SudComponent,
    RocisteComponent,
    PredmetComponent,
    UcesnikComponent,
    SudDialogComponent,
    RocisteDialogComponent,
    PredmetDialogComponent,
    UcesnikDialogComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatSelectModule,
    MatOptionModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }