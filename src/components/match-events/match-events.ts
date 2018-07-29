import {Component, Input} from "@angular/core";
import {ResultsPage} from "../../pages/results/results";
import {Chart} from 'chart.js';

@Component({
  selector: 'match-events',
  templateUrl: 'match-events.html'
})
export class MatchEvents {
  @Input() events: any;

  constructor() {}

  ngAfterViewInit() {
    console.log(this.events);
  }

  getMinute(position, team, minute, extraMinute) {
    if (position != team) {
      return '';
    }

    let result = minute;

    if (extraMinute) {
      result += '+' + extraMinute;
    }

    result += "'";

    return result;
  }

  getAssistNameIfApplicable(position, team, assist, type) {
    if (position != team || !assist || (type !== 'goal' && type !== 'subst')) {
      return '';
    }

    return '(' + this.decodeName(assist) + ')';
  }

  shouldDisplayIcon(position, team, type) {
    if (position !== team) {
      return false;
    }

    return type === 'yellowcard' ||
      type === 'redcard' ||
      type === 'subst' ||
      type === 'goal' ||
      type === 'pen miss';
  }

  getIcon(position, team, type) {
    if (position != team) {
      return '';
    }

    switch(type) {
      case 'yellowcard':
        return 'yellow_card';
      case 'redcard':
        return 'red_card';
      case 'subst':
        return 'substitution';
      case 'goal':
        return 'goal';
      case 'pen miss':
        return 'penalty_missed';
      default:
        return ''
    }
  }

  /**
   * Decode utf-8 encoded string back into multi-byte Unicode characters
   *
   * @param {String} strUtf UTF-8 string to be decoded back to Unicode
   * @returns {String} decoded string
   */
  decodeName(strUtf) {
    // note: decode 3-byte chars first as decoded 2-byte strings could appear to be 3-byte char!
    var strUni = strUtf.replace(
      /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, // 3-byte chars
      function (c) { // (note parentheses for precence)
        var cc = ((c.charCodeAt(0) & 0x0f) << 12) | ((c.charCodeAt(1) & 0x3f) << 6) | (c.charCodeAt(2) & 0x3f);
        return String.fromCharCode(cc);
      });
    strUni = strUni.replace(
      /[\u00c0-\u00df][\u0080-\u00bf]/g, // 2-byte chars
      function (c) { // (note parentheses for precence)
        var cc = (c.charCodeAt(0) & 0x1f) << 6 | c.charCodeAt(1) & 0x3f;
        return String.fromCharCode(cc);
      });
    return strUni;
  }
}
