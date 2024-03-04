import { Component, OnInit, VERSION } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  Account,
  createAccount,
  createParamSearch,
} from './../../model/account.model';
import { takeUntil } from 'rxjs/operators';

import * as faker from 'faker';
import { Column } from '../../model/common.model';
import { AccountService } from '../../services/account.service';
import { Accounts } from '../../data/account';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
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

  search(): void {
    this.getAllAccount();
  }
  onChangePageSize(event: any): void {
    this.page.page_size = +event.target.value;
    this.search();
  }
  edit(acc: any): void {
    localStorage.setItem('accountItem', JSON.stringify(acc));
  }
  removeAccount(id: string): void {
    this.accountService
      .deleteAccount(id)
      .pipe(takeUntil(this.unSubscribeAll))
      .subscribe(
        (resp: Account[]) => {
          this.getAllAccount();
        },
        (err: Error) => {
          this.account = [];
        }
      );
  }
}
