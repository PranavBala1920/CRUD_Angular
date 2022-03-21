import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerModel } from '../customer-model';
import { CustomerService } from '../customer-service.service';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css'],
})
export class CustomerUpdateComponent implements OnInit {
  @Input() public selectedCustomer: any;
  editForm: FormGroup;
  constructor(
    public modal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private modalService: NgbModal
  ) {}

  // popup(content: any) {
  //   this.modalService.open(content);
  // }

  ngOnInit(): void {
    console.log('checkkkk 1', this.selectedCustomer);
    this.setForm();
    console.log('checkkkk formmmm', this.setForm());
  }

  uniqueEmail() {
    this.customerService
      .uniqueValue(
        this.selectedCustomer.email,
        this.selectedCustomer.mobile,
        this.selectedCustomer.id
      )
      .subscribe((uniqueValue) => {
        if (uniqueValue === null) {
          alert('Successfull Enter user');
        } else {
          alert('User is available');
        }
      });
  }

  onSubmit() {
    if (this.editForm.invalid) {
      return;
    }
    this.customerService
      .updateCustomer(this.editForm.value, this.selectedCustomer.id)
      .subscribe(
        (data) => {
          this.modal.close('yes');
        },
        (error) => {
          console.log('test updateComponent Error');
        }
      );
  }

  get editFormData() {
    return this.editForm.controls;
  }

  private setForm() {
    console.log(this.selectedCustomer);
    this.editForm = this.formBuilder.group({
      id: [this.selectedCustomer.id, Validators.required],
      firstName: [this.selectedCustomer.firstName, Validators.required],
      lastName: [this.selectedCustomer.lastName, Validators.required],
      email: [this.selectedCustomer.email, Validators.required],
      mobile: [this.selectedCustomer.mobile, Validators.required],
      addressOne: [this.selectedCustomer.addressOne, Validators.required],
      addressTwo: [this.selectedCustomer.addressTwo, Validators.required],
      age: [this.selectedCustomer.age, Validators.required],
      gender: [this.selectedCustomer.gender, Validators.required],
    });
  }
}
