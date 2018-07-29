import {Component, Input} from "@angular/core";
import {ResultsPage} from "../../pages/results/results";

@Component({
  selector: 'match-stat',
  templateUrl: 'match-stat.html'
})
export class MatchStat {
  @Input() homeTeamStat: string;
  @Input() awayTeamStat: string;
  @Input() label: string;

  constructor() {}

  getBarColour(teamStatStr, oppositionStatStr) {
    const teamStat = parseInt(teamStatStr);
    const oppositionStat = parseInt(oppositionStatStr);
    if (teamStat > oppositionStat) {
      return "#e90052";
    } else {
      return "#38003c";
    }
  }

  getBarSize(teamStatStr, oppositionStatStr) {
    const teamStat = parseInt(teamStatStr);
    const oppositionStat = parseInt(oppositionStatStr);

    const total = teamStat + oppositionStat;

    return (teamStat / total) * 100;
  }
}
