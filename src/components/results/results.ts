import {Component, Input} from "@angular/core";
import {ResultsPage} from "../../pages/results/results";
import Utils from "../../utils/utils";
import {WheelSelector} from "@ionic-native/wheel-selector";

@Component({
  selector: 'results',
  templateUrl: 'results.html'
})
export class Results {
  @Input() matches: any;
  @Input() view: any;
  filterargs = {week : "Recent Matches"};
  week: any = "Recent Matches";
  getTeamName = Utils.getTeamName;

  constructor(private selector: WheelSelector) {}

  private selectWeek() {
    this.selector.show({
      title: "Matchday",
      defaultItems: [
        {
          index : 0,
          value: "Recent Matches"
        }
      ],
      items: [
        [
          {description: "Recent Matches"},
          {description: "1"},
          {description: "2"},
          {description: "3"},
          {description: "4"},
          {description: "5"},
          {description: "6"},
          {description: "7"},
          {description: "8"},
          {description: "9"},
          {description: "10"},
          {description: "11"},
          {description: "12"},
          {description: "13"},
          {description: "14"},
          {description: "15"},
          {description: "16"},
          {description: "17"},
          {description: "18"},
          {description: "19"},
          {description: "20"},
          {description: "21"},
          {description: "22"},
          {description: "23"},
          {description: "24"},
          {description: "25"},
          {description: "26"},
          {description: "27"},
          {description: "28"},
          {description: "29"},
          {description: "30"},
          {description: "31"},
          {description: "32"},
          {description: "33"},
          {description: "34"},
          {description: "35"},
          {description: "36"},
          {description: "37"},
          {description: "38"}
        ]
      ],
    }).then(
      result => {
        this.week = result[0].description;
        this.filterargs = {week: this.week};
      },
      err => console.log('Error: ', err)
    );
  }

  private incrementWeek() {
    if (this.week === "Recent Matches") {
      this.week = 1;
    } else if (this.week != 38) {
      this.week++;
    }

    this.filterargs = {week : this.week};
  }

  private decrementWeek() {
    if (this.week == 1) {
      this.week = 'Recent Matches';
    } else if (this.week !== "Recent Matches") {
      this.week--;
    }

    this.filterargs = {week : this.week};
  }

  private jumpToCurrentWeek() {
    if (this.matches.filter(item => item.dateTime <= Date.now()).length == 0) {
      this.week = 1;
    } else {
      this.week = this.matches.filter(item => item.dateTime <= Date.now())[0].matchday;
    }
    this.filterargs = {week: this.week};
  }
}
