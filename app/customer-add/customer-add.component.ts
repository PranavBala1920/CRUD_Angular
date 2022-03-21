import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { config } from 'rxjs';
import { CustomerModel } from '../customer-model';
import { CustomerService } from '../customer-service.service';
@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class CustomerAddComponent implements OnInit {
  customerModel: CustomerModel = new CustomerModel();
  submitForm: FormGroup;

  constructor(
    private customerService: CustomerService,
    config: NgbModalConfig,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  // addPopUp(template: TemplateRef<any>) {
  //   console.log('enterrrrrr in adduser');
  //   this.modalRef = this.service.show(template, { class: 'modal-sm' });
  // }
  popup(content: any) {
    this.modalService.open(content);
  }

  saveCustomerData() {
    this.customerService.createCustomer(this.customerModel).subscribe(
      (data) => {
        console.log('dataaaa', data);
      },
      (error) => console.log('error', error)
    );
  }

  onSubmit() {
    console.log('On sublit method call');
    this.saveCustomerData();
  }

  ngOnInit(): void {
    // this.setForm();
  }

  // private setForm() {
  //   this.submitForm = this.formBuilder.group({
  //     id: ['', Validators.required],
  //     firstName: ['', Validators.required],
  //     lastName: ['', Validators.required],
  //     email: ['', Validators.required],
  //     mobile: ['', Validators.required],
  //     addressOne: ['', Validators.required],
  //     addressTwo: ['', Validators.required],
  //     age: ['', Validators.required],
  //     gender: ['', Validators.required],
  //   });
  // }
}
