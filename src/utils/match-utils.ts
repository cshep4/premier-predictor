import {TableTeam} from "../models/TableTeam";

export default class MatchUtils {
  static refreshData = false;

  static convertUTCDateToLocalDate(date) {
    let newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    const offset = date.getTimezoneOffset() / 60;
    const hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
  }

  static compareDate(a, b) {
    if (a.dateTime < b.dateTime)
      return -1;
    if (a.dateTime > b.dateTime)
      return 1;
    return 0;
  }

  static emptyTable() {
    return [
      new TableTeam("AFC Bournemouth"),
      new TableTeam("Arsenal"),
      new TableTeam("Brighton & Hove Albion"),
      new TableTeam("Burnley"),
      new TableTeam("Cardiff City"),
      new TableTeam("Chelsea"),
      new TableTeam("Crystal Palace"),
      new TableTeam("Everton"),
      new TableTeam("Fulham"),
      new TableTeam("Huddersfield Town"),
      new TableTeam("Leicester City"),
      new TableTeam("Liverpool"),
      new TableTeam("Manchester City"),
      new TableTeam("Manchester United"),
      new TableTeam("Newcastle United"),
      new TableTeam("Southampton"),
      new TableTeam("Tottenham Hotspur"),
      new TableTeam("Watford"),
      new TableTeam("West Ham United"),
      new TableTeam("Wolverhampton Wanderers")
    ];
  }
}
