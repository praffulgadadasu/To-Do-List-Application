import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModel } from 'src/material.model';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AngularMaterialModule } from './angular-material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JWT_OPTIONS } from '@auth0/angular-jwt';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    DialogComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    MaterialModel,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    FlexLayoutModule,
    FormsModule,
    AppRoutingModule,
    MatToolbarModule,
    AngularMaterialModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    CookieService,
    JwtHelperService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
