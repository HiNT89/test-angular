import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { fakeBackendProvider } from './core/services/fake-backend';
import { AccountService } from './core/services/account.service';
import { HttpClientModule } from '@angular/common/http';
import { MyDatatableComponent } from './core/components/my-datatable/my-datatable.component';
import { RouterModule } from '@angular/router';
import { DetailDataComponent } from './core/components/detail-data/detail-data.component';
import { HomeComponent } from './core/components/home/home.component';
import { CommonModule } from '@angular/common';
// import { RouterOutlet } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'create', component: DetailDataComponent },
      { path: 'detail/:userID', component: DetailDataComponent },
    ]),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    MyDatatableComponent,
    HomeComponent,
    DetailDataComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    // provider used to create fake backend,
    AccountService,
    fakeBackendProvider,
  ],
})
export class AppModule {}
