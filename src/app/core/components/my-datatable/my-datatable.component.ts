import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Column, Page } from '../../model/common.model';
@Component({
  selector: 'app-my-datatable',
  // standalone: true,
  // imports: [CommonModule, FormsModule],
  templateUrl: './my-datatable.component.html',
  styleUrls: ['./my-datatable.component.scss'],
})
export class MyDatatableComponent implements OnInit {
  @Input() rows!: { [x: string]: any }[];
  @Input()
  columns!: Column[];
  @Input()
  page!: Page;
  @Input() onChangePageSize!: (page_size?: number) => void;
  @Input() loading !: boolean
  constructor() {
    console.log('page', this.page);
  }
  ngOnInit(): void {}
  public onEnter() {
    console.log('page', this.page);
  }
  public nextPage() {
    this.page.page_current++;
  }
  public prevPage() {
    this.page.page_current--;
  }
}
