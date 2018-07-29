import {Component, Input} from "@angular/core";

@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html'
})
export class ProgressBar {
  @Input() colour: string;
  @Input() pos: string;
  @Input() value: number;
}
