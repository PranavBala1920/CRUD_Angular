import { Component, OnInit, TemplateRef } from '@angular/core';
import { CustomerModel } from '../customer-model';
import { CustomerService } from '../customer-service.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerUpdateComponent } from '../customer-update/customer-update.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  id: number;
  customerModel: CustomerModel[];
  model: CustomerModel = new CustomerModel();
  loading: boolean = false;
  errorMessage: any;
  message: string;
  modalRef: BsModalRef;
  constructor(
    private service: BsModalService,
    private customerService: CustomerService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.customerList();
    // this.customerService.getCustomerbyId(this.id).subscribe(
    //   (data) => {
    //     this.customerModel = data;
    //   },
    //   (error) => console.log('Generate By ID Error ', error)
    // );
    console.log('check List');
    console.log(this.customerList);
  }
  // open Pop up menu
  popup(model: CustomerModel): void {
    console.log('11 ', model);
    const reference = this.modalService.open(CustomerUpdateComponent);
    reference.componentInstance.selectedCustomer = model;

    reference.result.then(
      (yes) => {
        console.log(yes);
        this.customerList();
        console.log('Yes Click', this.customerList());
      },
      (cancel) => {
        console.log('Cancel Click');
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.service.show(template, { class: 'modal-sm' });
  }

  // customer List Api
  customerList() {
    this.customerService.getCustomerList().subscribe(
      (data) => {
        console.log('Respose is received');
        this.customerModel = data;
      },
      (error) => {
        console.log('Request failed with error');
        this.errorMessage = error;
        this.loading = false;
      }
    );
  }
  // delete User Api
  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id).subscribe((data) => {
      console.log('Delete user data', data);
      console.log('check the id', id);
      this.customerList();
      this.modalRef.hide();
    });
  }
  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }
}
