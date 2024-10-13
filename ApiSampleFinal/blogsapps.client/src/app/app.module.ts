import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSelectModule } from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginCreateComponent } from './components/login-create/login-create.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PostDialogComponent } from './assets/dialog/post/post_create';
import { UserDialogComponent } from './assets/dialog/user/user_create';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { CommentDialogComponent, viewLikeDialogComponent } from './assets/export_dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginCreateComponent,
    HomeComponent,
    ProfileComponent,
    PostDialogComponent,
    UserDialogComponent,
    MaintenanceComponent,
    viewLikeDialogComponent,
    CommentDialogComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule,
    AppRoutingModule, MatSelectModule,
    MatToolbarModule, MatIconModule,
    MatCardModule, MatMenuModule,
    MatButtonModule, MatAutocompleteModule,
    FormsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
