import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Column, Page } from '../../model/common.model';
import { Account } from '../../model/account.model';
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
  @Input() removeItem!: (id: string) => void;
  @Input() view!: (acc: any) => void;
  @Input() loading!: boolean;
  constructor() {}
  ngOnChanges() {
    console.log('remove', this.removeItem);
  }
  ngOnInit(): void {}
  public onEnter() {}
  public nextPage() {
    this.page.page_current++;
  }
  public prevPage() {
    this.page.page_current--;
  }
}
