export class TableTeam {
  constructor(teamName) {
    this.teamName = teamName;
  }

  rank: number = 0;
  teamName: String;
  played: number = 0;
  points: number = 0;
  wins: number = 0;
  draws: number = 0;
  losses: number = 0;
  goalsFor: number = 0;
  goalsAgainst: number = 0;
  goalDifference: number = 0;
}
