import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [],
})
export class IncrementadorComponent implements OnInit {
  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input()
  leyenda: string = 'Leyenda';
  @Input()
  progress: number = 50;
  @Output()
  progressValueChanged: EventEmitter<number> = new EventEmitter<number>();

  readonly minProgress: number = 0;
  readonly maxProgress: number = 100;

  constructor() {}

  ngOnInit() {}

  public incrementProgress(progress: number): void {
    const newProgress = this.progress + progress;
    if (newProgress >= this.minProgress && newProgress <= this.maxProgress) {
      this.progress = newProgress;
      this.progressValueChanged.emit(this.progress);
    }
  }

  /**
   * progressChanged
   */
  public progressChanged(newValue: number) {
    if (newValue < 0) {
      this.progress = 0;
    } else if (newValue > 100) {
      this.progress = 100;
    } else {
      this.progress = newValue;
    }
    this.txtProgress.nativeElement.value = this.progress;
    this.progressValueChanged.emit(this.progress);
  }
}
