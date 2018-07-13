import {Component, Input} from "@angular/core";
import {ResultsPage} from "../../pages/results/results";
import MatchUtils from "../../utils/match-utils";
import Utils from "../../utils/utils";

@Component({
  selector: 'league-table',
  templateUrl: 'league-table.html'
})
export class LeagueTable {
  @Input() matches: any;
  table: any;
  getTeamName = Utils.getTeamName;

  ngOnInit() {
    this.createLeagueTable();
  }

  createLeagueTable() {
    this.table = MatchUtils.emptyTable();

    this.calculate()
  }

  private calculate() {
    this.matches
      .filter(it => it.hGoals !== null && it.aGoals !== null)
      .forEach(it => this.updateTableForMatch(it));

    this.sortTable();

    this.updateRank();
  }

  private updateTableForMatch(match) {
    this.table
      .filter(it => it.teamName == match.hTeam || it.teamName == match.aTeam)
      .forEach(it => this.updateTableTeam(it, match));
  }

  private updateTableTeam(tableTeam, match) {
    if (tableTeam.teamName == match.hTeam) {
      this.updateTeamStats(tableTeam, match.hGoals, match.aGoals);
    } else if (tableTeam.teamName == match.aTeam) {
      this.updateTeamStats(tableTeam, match.aGoals, match.hGoals);
    }
  }

  private updateTeamStats(tableTeam, goalsFor, goalsAgainst) {
    if (goalsFor > goalsAgainst) {
      tableTeam.wins += 1;
      tableTeam.points += 3
    } else if (goalsFor == goalsAgainst) {
      tableTeam.draws += 1;
      tableTeam.points += 1;
    } else {
      tableTeam.losses += 1;
    }

    tableTeam.played += 1;
    tableTeam.goalsFor += goalsFor;
    tableTeam.goalsAgainst += goalsAgainst;
    tableTeam.goalDifference = tableTeam.goalsFor - tableTeam.goalsAgainst;
  }

  private sortTable() {
    this.table.sort(function (a, b) {
      return b["points"] - a["points"] || b["goalDifference"] - a["goalDifference"] || b["goalsFor"] - a["goalsFor"];
    });
  }

  private updateRank() {
    let i = 1;
    this.table.forEach(it => it.rank = i++);
  }
}
