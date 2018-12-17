import {Component, Input} from "@angular/core";
import {ResultsPage} from "../../pages/results/results";
import {Chart} from 'chart.js';
import Utils from "../../utils/utils";

@Component({
  selector: 'form-icons',
  templateUrl: 'form-icons.html'
})
export class FormIcons {
  @Input() forms: any;
  @Input() side: string;
  capitalise = Utils.capitalise;
  getTeamName = Utils.getTeamName;

  constructor() {}

  ngAfterViewInit() {
    console.log(this.forms);
  }
}
