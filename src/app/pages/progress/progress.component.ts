import { Component, OnInit } from '@angular/core';
import { Event } from '@angular/router';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: [],
})
export class ProgressComponent implements OnInit {
  progress1: number = 50;
  progress2: number = 15;
  readonly minProgress: number = 0;
  readonly maxProgress: number = 100;
  constructor() {}

  ngOnInit() {}
}
