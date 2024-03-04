import { Account } from './../../model/account.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-data',
  // standalone: true,
  // imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './detail-data.component.html',
  styleUrls: ['./detail-data.component.scss'],
})
export class DetailDataComponent implements OnInit {
  myForm!: FormGroup;
  public keys: { key: string; title: string; validate: null | boolean }[] = [
    {
      key: 'lastname',
      title: 'last name',
      validate: null,
    },
    {
      key: 'firstname',
      title: 'first name',
      validate: null,
    },
    {
      key: 'city',
      title: 'city',
      validate: null,
    },
    {
      key: 'account_number',
      title: 'account number',
      validate: null,
    },
    {
      key: 'address',
      title: 'address',
      validate: null,
    },
    {
      key: 'email',
      title: 'email',
      validate: null,
    },
    {
      key: 'employer',
      title: 'employer',
      validate: null,
    },
    {
      key: 'gender',
      title: 'gender',
      validate: null,
    },
    {
      key: 'state',
      title: 'state',
      validate: null,
    },
    {
      key: 'age',
      title: 'age',
      validate: null,
    },
    {
      key: 'balance',
      title: 'balance',
      validate: null,
    },
  ];
  constructor() {
    // Initialize the form with FormBuilder
  }
  ngOnInit(): void {
    this.myForm = new FormGroup({
      lastname: new FormControl(),
      firstname: new FormControl(),
      city: new FormControl(),
      account_number: new FormControl(),
      address: new FormControl(),
      email: new FormControl(),
      employer: new FormControl(),
      gender: new FormControl(),
      state: new FormControl(),
      age: new FormControl(),
      balance: new FormControl(),
    });
  }
  public onSubmit(): void {}
}
