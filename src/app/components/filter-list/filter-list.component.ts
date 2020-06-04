import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent implements OnInit {
  @Output() changedFilterEvent: EventEmitter<string> = new EventEmitter<string>();
  @Input() placeHolder: string = '';
  constructor() {}

  ngOnInit() {}

  filtrar(term: string) {
    this.changedFilterEvent.emit(term);
  }
}
