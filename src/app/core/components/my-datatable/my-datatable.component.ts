import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Column, Page } from '../../model/common.model';
import { Account, createParamSearch } from '../../model/account.model';
import { AccountService } from '../../services/account.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-my-datatable',
  // standalone: true,
  // imports: [CommonModule, FormsModule],
  templateUrl: './my-datatable.component.html',
  styleUrls: ['./my-datatable.component.scss'],
})
export class MyDatatableComponent implements OnInit, OnChanges {
  @Input() rows!: { [x: string]: any }[];
  @Input()
  columns!: Column[];
  @Input()
  page!: Page;
  @Input() nextPage!: () => void;
  @Input() view!: (acc: any) => void;
  @Input() loading!: boolean;
  unSubscribeAll: Subject<any>;
  isShowMore = false;
  constructor(private accountService: AccountService) {
    this.unSubscribeAll = new Subject<any>();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('next page', this.nextPage);
  }
  ngOnInit(): void {}
  public onEnter() {}
  // public nextPage() {
  //   this.page.page_current++;
  // }
  public removeAccount(id: string): void {
    this.accountService
      .deleteAccount(id)
      .pipe(takeUntil(this.unSubscribeAll))
      .subscribe(
        (resp: Account[]) => {
          console.log('res =>', resp);
          // this.getAllAccount();
          this.rows = this.rows.filter((row) => row._id !== resp);
        },
        (err: Error) => {
          // this.account = [];
        }
      );
  }
  public checkScroll(event: any): void {
    const scrollTop = event.target.scrollTop;
    const scrollHeight = event.target.scrollHeight;
    const offsetHeight = event.target.offsetHeight;
    //check if the scroll reached the bottom
    if (offsetHeight + scrollTop >= scrollHeight) {
      console.log('end');
      this.isShowMore = true;
    } else {
      this.isShowMore = false;
    }
  }
}
