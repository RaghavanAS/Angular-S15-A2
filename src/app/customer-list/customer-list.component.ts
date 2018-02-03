import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { trigger, state, style } from '@angular/animations';
import { Customer } from '../models/customer';
import { CustomerService } from '../Services/Customer-Service';
import { SearchPipe } from '../pipes/SearchByPipe';
import { AppError } from '../error-handle/app-error';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  providers: [SearchPipe],
  animations: [
    trigger('AnimateList', [
      state('active',
      style({
        background: '#cfd8dc',
        transform: 'scale(1.1)'
      })
    ),
      state(
        'inactive',
        style({
          'background': '#fff ',
          transform: 'scale(1)'
        })
      )
    ])]
})
export class CustomerListComponent implements OnInit {

  @Input() customers: Observable<Customer[]>;
  @Input() cus: Customer;
  private searchData: string;
  // currentState to store the current status of animation
  currentState: string;
  constructor(private customerService: CustomerService, private router: Router) { }
// get the customer list on init
  ngOnInit() {
    this.searchData = '';
    this.customers = this.customerService.getCustomerList();
  }
  // navigate to customer form on add button click
  onAdd() {
    this.router.navigate(['/customers', 'new', 'edit']);
  }
  // change the current state to active on mouse over
  onMouseOver() {
    this.currentState = 'active';
  }
  // change the current state to inactive on mouse out
  onMouseOut() {
    this.currentState = 'inactive';
  }
}
