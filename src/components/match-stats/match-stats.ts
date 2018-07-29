import {Component, Input} from "@angular/core";
import {ResultsPage} from "../../pages/results/results";
import {MatchFacts} from "../../models/MatchFacts";

@Component({
  selector: 'match-stats',
  templateUrl: 'match-stats.html'
})
export class MatchStats {
  @Input() match: MatchFacts;

  constructor() {}

  ngAfterViewInit() {
    console.log(this.match.commentary);
  }
}
