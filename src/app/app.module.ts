import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialExampleModule } from '../material.module';
import { RouterModule, Routes } from '@angular/router';
import { AllEmployeesComponent } from './all-employees/all-employees.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const routes: Routes = [
  { path: '', redirectTo: 'employee/all', pathMatch: 'full' },
  { path: 'employee', redirectTo: 'employee/all', pathMatch: 'full' },
  {
    path: 'employee/all',
    title: 'All Employees',
    component: AllEmployeesComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    MaterialExampleModule,
  ],
  declarations: [AppComponent, AllEmployeesComponent],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
