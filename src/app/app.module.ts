import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterCustomerComponent } from './Customer/register-customer/register-customer.component';
import { LoginUserComponent } from './Customer/login-user/login-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponentComponent } from './Home/home-component/home-component.component';
import { UserDetailsComponent } from './Customer/user-details/user-details.component';
import { AddMoneyComponent } from './Transaction/add-money/add-money.component';
import { SendMoneyComponent } from './Transaction/send-money/send-money.component';
import { ViewTransactionComponent } from './Transaction/view-transaction/view-transaction.component';
import { TimerService } from './Services/timer.service';
import { AuthService } from './Services/auth.service';
import { UpdateCustomerComponent } from './Customer/update-customer/update-customer.component';





@NgModule({
  declarations: [
    AppComponent,
    RegisterCustomerComponent,
    LoginUserComponent,
    RegisterCustomerComponent,
    HomeComponentComponent,
    UserDetailsComponent,
    AddMoneyComponent,
    SendMoneyComponent,
    ViewTransactionComponent,
    UpdateCustomerComponent,
    
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // NoopAnimationsModule,
    // MatInputModule,
    // MatFormFieldModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    ReactiveFormsModule,
   
  ],
  providers: [AuthService,TimerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
