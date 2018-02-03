import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CustomerService } from '../Services/Customer-Service';
import { Customer } from '../models/customer';
import { JsonPipe } from '@angular/common';
import { ChangeChar } from '../pipes/changeToCapital';
import { AppError } from '../error-handle/app-error';
import { CityModel } from '../models/City-Model';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css'],
  providers: [ ChangeChar]
})
export class CustomerDetailComponent implements OnInit {
  customer: Customer = new Customer();
  cityModel: CityModel = new CityModel();
  id: number;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
// get the customer based on his id
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.customerService.getCustomer(this.id).subscribe(
        (customer: Customer) => {
          this.customer = customer;
          console.log(this.customer);
        },
        (error: AppError) => {
          console.log('error:', error);
        }
      );
    });
  }
// navigate to the customer list on edit button click
  onEdit() {
    this.router.navigate(['/customers', this.id, 'edit']);
  }
  // delete the customer on delete button click using customer service
  onDelete() {
    if (confirm('Are you sure?')) {
      this.customerService.deleteCustomer(this.id).subscribe(
        () => {
          console.log('Customer deleted successfully.');
          this.router.navigate(['/customers']);
        },
        (error: AppError) => {
          console.log('error:', error);
        }
      );
    }
  }
}
