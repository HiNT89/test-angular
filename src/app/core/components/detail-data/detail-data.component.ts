import { Account, createAccount } from './../../model/account.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import * as faker from 'faker';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute, Route, Router } from '@angular/router';
@Component({
  selector: 'app-detail-data',
  // standalone: true,
  // imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './detail-data.component.html',
  styleUrls: ['./detail-data.component.scss'],
})
export class DetailDataComponent implements OnInit {
  unSubscribeAll: Subject<any>;
  formData!: FormGroup;
  mess = '';
  id = '';
  public keys: {
    key: string;
    title: string;
    validate: null | boolean;
    type: string;
  }[] = [
    {
      key: 'lastname',
      title: 'last name',
      validate: null,
      type: 'text',
    },
    {
      key: 'firstname',
      title: 'first name',
      validate: null,
      type: 'text',
    },
    {
      key: 'city',
      title: 'city',
      validate: null,
      type: 'text',
    },
    {
      key: 'account_number',
      title: 'account number',
      validate: null,
      type: 'number',
    },
    {
      key: 'address',
      title: 'address',
      validate: null,
      type: 'text',
    },
    {
      key: 'email',
      title: 'email',
      validate: null,
      type: 'text',
    },
    {
      key: 'employer',
      title: 'employer',
      validate: null,
      type: 'text',
    },
    {
      key: 'gender',
      title: 'gender',
      validate: null,
      type: 'text',
    },
    {
      key: 'state',
      title: 'state',
      validate: null,
      type: 'text',
    },
    {
      key: 'age',
      title: 'age',
      validate: null,
      type: 'number',
    },
    {
      key: 'balance',
      title: 'balance',
      validate: null,
      type: 'number',
    },
  ];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private accountService: AccountService
  ) {
    this.unSubscribeAll = new Subject<any>();
  }
  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      city: ['', Validators.required],
      account_number: [0, Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      employer: ['', Validators.required],
      gender: ['', Validators.required],
      state: ['', Validators.required],
      age: [0, Validators.required],
      balance: [0, Validators.required],
    });
    const id = this.route.snapshot.paramMap.get('userID');
    if (id) {
      this.getAccount();
    }
  }
  getAccount1(id: string) : void {
    this.accountService
      .getAccountById(id)
      .pipe(takeUntil(this.unSubscribeAll))
      .subscribe((resp: Account) => {
        console.log('res', resp);
      });
  }
  saveNew(): void {
    this.accountService
      .addAccount(this.formData.value)
      .pipe(takeUntil(this.unSubscribeAll))
      .subscribe(
        (resp: Account[]) => {
          console.log('res =>', resp);
          this.mess = 'create success, direction to home after 5s';
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 5000);
        },
        (err: Error) => {
          this.mess = 'create faild';
        }
      );
  }
  getAccount(): void {
    const accountItem = JSON.parse(localStorage.getItem('accountItem') || '');
    this.formData = this.formBuilder.group({
      lastname: [accountItem.lastname, Validators.required],
      firstname: [accountItem.firstname, Validators.required],
      city: [accountItem.city, Validators.required],
      account_number: [accountItem.account_number, Validators.required],
      address: [accountItem.address, Validators.required],
      email: [accountItem.email, Validators.required],
      employer: [accountItem.employer, Validators.required],
      gender: [accountItem.gender, Validators.required],
      state: [accountItem.state, Validators.required],
      age: [accountItem.age, Validators.required],
      balance: [accountItem.balance, Validators.required],
    });
    this.id = accountItem._id;
  }
  public updateUser(): void {
    this.accountService
      .editAccount(this.formData.value, this.id)
      .pipe(takeUntil(this.unSubscribeAll))
      .subscribe(
        (resp: Account[]) => {
          console.log('res =>', resp);
          this.mess = 'update success, direction to home after 5s';
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 5000);
        },
        (err: Error) => {
          this.mess = 'update faild';
        }
      );
  }
  public onSubmit(): void {
    if (this.id) {
      this.updateUser();
    } else {
      this.saveNew();
    }
  }
}
