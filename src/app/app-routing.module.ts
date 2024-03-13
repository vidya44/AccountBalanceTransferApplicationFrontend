import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterCustomerComponent } from './Customer/register-customer/register-customer.component';
import { LoginUserComponent } from './Customer/login-user/login-user.component';
import { HomeComponentComponent } from './Home/home-component/home-component.component';
import { UserDetailsComponent } from './Customer/user-details/user-details.component';
import { AddMoneyComponent } from './Transaction/add-money/add-money.component';
import { SendMoneyComponent } from './Transaction/send-money/send-money.component';
import { ViewTransactionComponent } from './Transaction/view-transaction/view-transaction.component';
import { AppComponent } from './app.component';
import { UpdateCustomerComponent } from './Customer/update-customer/update-customer.component';


const routes: Routes = [
   // Add a route for the register customer component
   //{ path: 'app-root', component: AppComponent },

   { path: 'signup', component: RegisterCustomerComponent },

   { path: 'signin', component: LoginUserComponent},
   
   {path: 'logout-user', component: AppComponent},

   {path: 'user-details', component: UserDetailsComponent},

   {path:'add-money', component: AddMoneyComponent},

   {path:'send-money', component: SendMoneyComponent},

   {path:'view-transactions', component: ViewTransactionComponent},
   
   {path: 'update-customer', component: UpdateCustomerComponent},

   
   { path: 'home', component:HomeComponentComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
