import { Component, OnInit, VERSION } from '@angular/core';
import { AccountService } from './core/services/account.service';
import { Observable, Subject } from 'rxjs';
import {
  Account,
  createAccount,
  createParamSearch,
} from './core/model/account.model';
import { takeUntil } from 'rxjs/operators';
import { Accounts } from './core/data/account';
import * as faker from 'faker';
import { Column } from './core/model/common.model';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // name = 'Angular ' + VERSION.major;
  account: Account[] = [];
  unSubscribeAll: Subject<any>;
  isOpenAddAccount = false;
  isOpenEditAccount = false;
  selectedAccount: Account | undefined;
  //
  public isLoading = false;
  public searchBy = 'last_name';
  public searchStr = '';
  public columns: Column[] = [
    {
      field: 'firstname',
      label: 'First name',
      width: '100px',
    },
    {
      field: 'lastname',
      label: 'Last name',
      width: '100px',
    },
    {
      field: 'age',
      label: 'Age',
      width: '100px',
    },
    {
      field: 'address',
      label: 'Address',
      width: '100px',
    },
    {
      field: 'employer',
      label: 'Employer',
      width: '100px',
    },
    {
      field: 'email',
      label: 'email',
      width: '100px',
    },
    {
      field: 'city',
      label: 'city',
      width: '100px',
    },
    {
      field: 'state',
      label: 'state',
      width: '100px',
    },
    {
      field: 'gender',
      label: 'gender',
      width: '100px',
    },
    {
      field: 'account_number',
      label: 'account_number',
      width: '100px',
    },
    {
      field: 'balance',
      label: 'balance',
      width: '100px',
    },
  ];
  public optionSearch = [
    {
      title: 'last name',
      value: 'last_name',
    },
    {
      title: 'first name',
      value: 'first_name',
    },
    {
      title: 'address',
      value: 'address',
    },
    {
      title: 'email',
      value: 'email',
    },
    {
      title: 'gender',
      value: 'gender',
    },
  ];
  public page = {
    page_current: 1,
    total_page: 1,
    page_size: 25,
  };
  constructor(private accountService: AccountService) {
    // read data from file to localstorage
    this.unSubscribeAll = new Subject<any>();
    this.loadDataToLocal();
    console.log(this.page);
  }

  ngOnInit(): void {
    this.getAllAccount();
  }

  loadDataToLocal(): void {
    localStorage.setItem('accounts', JSON.stringify(Accounts));
  }

  getAllAccount(): void {
    this.isLoading = true;
    const { page_current, page_size } = this.page;
    const start = (page_current - 1) * page_size;
    this.accountService
      .getAccounts(
        createParamSearch({
          [this.searchBy]: this.searchStr,
          start,
          limit: page_size,
        })
      )
      .pipe(takeUntil(this.unSubscribeAll))
      .subscribe(
        (resp: Account[]) => {
          this.account = resp;
          this.page.total_page = Math.ceil(resp.length / this.page.page_size);
        },
        (err: Error) => {
          this.account = [];
        }
      );
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  openAddAccount(): void {
    this.isOpenAddAccount = true;
  }

  openEdit(acc: Account): void {
    this.selectedAccount = acc;
    this.isOpenEditAccount = true;
  }

  saveEdit(): void {
    const editedAccount = createAccount({
      balance: parseInt(faker.finance.amount(0, 99999), 0),
      age: 25,
      lastname: faker.name.lastName(),
      firstname: faker.name.lastName(),
      city: this.selectedAccount?.city,
      account_number: this.selectedAccount?.account_number,
      address: this.selectedAccount?.address,
      email: this.selectedAccount?.email,
      employer: this.selectedAccount?.employer,
      gender: 'F',
      state: this.selectedAccount?.state,
      _id: this.selectedAccount?._id,
    });

    // this.accountService
    //   .editAccount(editedAccount)
    //   .pipe(takeUntil(this.unSubscribeAll))
    //   .subscribe(
    //     (resp: Account[]) => {
    //       this.getAllAccount();
    //       this.isOpenEditAccount = false;
    //     },
    //     (err: Error) => {
    //       this.account = [];
    //     }
    //   );
  }

  saveNew(): void {
    const newAccount = createAccount({
      balance: parseInt(faker.finance.amount(0, 99999), 0),
      age: 25,
      lastname: faker.name.lastName(),
      firstname: faker.name.lastName(),
      city: faker.address.city(),
      account_number: faker.finance.account(),
      address: faker.address.streetAddress(),
      email: faker.internet.email(),
      employer: faker.name.lastName(),
      gender: 'F',
      state: faker.address.stateAbbr(),
    });

    this.accountService
      .addAccount(newAccount)
      .pipe(takeUntil(this.unSubscribeAll))
      .subscribe(
        (resp: Account[]) => {
          this.getAllAccount();
          this.isOpenAddAccount = false;
        },
        (err: Error) => {
          this.account = [];
        }
      );
  }

  search(): void {
    this.getAllAccount();
  }
  onChangePageSize(event: any): void {
    this.page.page_size = +event.target.value;
    this.search();
  }
}
