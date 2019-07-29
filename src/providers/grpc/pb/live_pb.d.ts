import * as jspb from "google-protobuf"

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';
import * as request_pb from './request_pb';
import * as prediction_pb from './prediction_pb';

export class UpcomingMatchesResponse extends jspb.Message {
  getMatchesMap(): jspb.Map<string, MatchFactsList>;
  clearMatchesMap(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpcomingMatchesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpcomingMatchesResponse): UpcomingMatchesResponse.AsObject;
  static serializeBinaryToWriter(message: UpcomingMatchesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpcomingMatchesResponse;
  static deserializeBinaryFromReader(message: UpcomingMatchesResponse, reader: jspb.BinaryReader): UpcomingMatchesResponse;
}

export namespace UpcomingMatchesResponse {
  export type AsObject = {
    matchesMap: Array<[string, MatchFactsList.AsObject]>,
  }
}

export class MatchSummary extends jspb.Message {
  getMatch(): MatchFacts | undefined;
  setMatch(value?: MatchFacts): void;
  hasMatch(): boolean;
  clearMatch(): void;

  getPredictionsummary(): prediction_pb.MatchPredictionSummary | undefined;
  setPredictionsummary(value?: prediction_pb.MatchPredictionSummary): void;
  hasPredictionsummary(): boolean;
  clearPredictionsummary(): void;

  getPrediction(): prediction_pb.Prediction | undefined;
  setPrediction(value?: prediction_pb.Prediction): void;
  hasPrediction(): boolean;
  clearPrediction(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MatchSummary.AsObject;
  static toObject(includeInstance: boolean, msg: MatchSummary): MatchSummary.AsObject;
  static serializeBinaryToWriter(message: MatchSummary, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MatchSummary;
  static deserializeBinaryFromReader(message: MatchSummary, reader: jspb.BinaryReader): MatchSummary;
}

export namespace MatchSummary {
  export type AsObject = {
    match?: MatchFacts.AsObject,
    predictionsummary?: prediction_pb.MatchPredictionSummary.AsObject,
    prediction?: prediction_pb.Prediction.AsObject,
  }
}

export class MatchFactsList extends jspb.Message {
  getMatchesList(): Array<MatchFacts>;
  setMatchesList(value: Array<MatchFacts>): void;
  clearMatchesList(): void;
  addMatches(value?: MatchFacts, index?: number): MatchFacts;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MatchFactsList.AsObject;
  static toObject(includeInstance: boolean, msg: MatchFactsList): MatchFactsList.AsObject;
  static serializeBinaryToWriter(message: MatchFactsList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MatchFactsList;
  static deserializeBinaryFromReader(message: MatchFactsList, reader: jspb.BinaryReader): MatchFactsList;
}

export namespace MatchFactsList {
  export type AsObject = {
    matchesList: Array<MatchFacts.AsObject>,
  }
}

export class MatchFacts extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getCompid(): string;
  setCompid(value: string): void;

  getFormatteddate(): string;
  setFormatteddate(value: string): void;

  getSeason(): string;
  setSeason(value: string): void;

  getWeek(): string;
  setWeek(value: string): void;

  getVenue(): string;
  setVenue(value: string): void;

  getVenueid(): string;
  setVenueid(value: string): void;

  getVenuecity(): string;
  setVenuecity(value: string): void;

  getStatus(): string;
  setStatus(value: string): void;

  getTimer(): string;
  setTimer(value: string): void;

  getTime(): string;
  setTime(value: string): void;

  getLocalteamid(): string;
  setLocalteamid(value: string): void;

  getLocalteamname(): string;
  setLocalteamname(value: string): void;

  getLocalteamscore(): string;
  setLocalteamscore(value: string): void;

  getVisitorteamid(): string;
  setVisitorteamid(value: string): void;

  getVisitorteamname(): string;
  setVisitorteamname(value: string): void;

  getVisitorteamscore(): string;
  setVisitorteamscore(value: string): void;

  getHtscore(): string;
  setHtscore(value: string): void;

  getFtscore(): string;
  setFtscore(value: string): void;

  getEtscore(): string;
  setEtscore(value: string): void;

  getPenaltylocal(): string;
  setPenaltylocal(value: string): void;

  getPenaltyvisitor(): string;
  setPenaltyvisitor(value: string): void;

  getEventsList(): Array<Event>;
  setEventsList(value: Array<Event>): void;
  clearEventsList(): void;
  addEvents(value?: Event, index?: number): Event;

  getCommentary(): Commentary | undefined;
  setCommentary(value?: Commentary): void;
  hasCommentary(): boolean;
  clearCommentary(): void;

  getMatchdate(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setMatchdate(value?: google_protobuf_timestamp_pb.Timestamp): void;
  hasMatchdate(): boolean;
  clearMatchdate(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MatchFacts.AsObject;
  static toObject(includeInstance: boolean, msg: MatchFacts): MatchFacts.AsObject;
  static serializeBinaryToWriter(message: MatchFacts, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MatchFacts;
  static deserializeBinaryFromReader(message: MatchFacts, reader: jspb.BinaryReader): MatchFacts;
}

export namespace MatchFacts {
  export type AsObject = {
    id: string,
    compid: string,
    formatteddate: string,
    season: string,
    week: string,
    venue: string,
    venueid: string,
    venuecity: string,
    status: string,
    timer: string,
    time: string,
    localteamid: string,
    localteamname: string,
    localteamscore: string,
    visitorteamid: string,
    visitorteamname: string,
    visitorteamscore: string,
    htscore: string,
    ftscore: string,
    etscore: string,
    penaltylocal: string,
    penaltyvisitor: string,
    eventsList: Array<Event.AsObject>,
    commentary?: Commentary.AsObject,
    matchdate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class Event extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getType(): string;
  setType(value: string): void;

  getResult(): string;
  setResult(value: string): void;

  getMinute(): string;
  setMinute(value: string): void;

  getExtramin(): string;
  setExtramin(value: string): void;

  getTeam(): string;
  setTeam(value: string): void;

  getPlayer(): string;
  setPlayer(value: string): void;

  getPlayerid(): string;
  setPlayerid(value: string): void;

  getAssist(): string;
  setAssist(value: string): void;

  getAssistid(): string;
  setAssistid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Event.AsObject;
  static toObject(includeInstance: boolean, msg: Event): Event.AsObject;
  static serializeBinaryToWriter(message: Event, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Event;
  static deserializeBinaryFromReader(message: Event, reader: jspb.BinaryReader): Event;
}

export namespace Event {
  export type AsObject = {
    id: string,
    type: string,
    result: string,
    minute: string,
    extramin: string,
    team: string,
    player: string,
    playerid: string,
    assist: string,
    assistid: string,
  }
}

export class Commentary extends jspb.Message {
  getMatchid(): string;
  setMatchid(value: string): void;

  getMatchinfoList(): Array<MatchInfo>;
  setMatchinfoList(value: Array<MatchInfo>): void;
  clearMatchinfoList(): void;
  addMatchinfo(value?: MatchInfo, index?: number): MatchInfo;

  getLineup(): Lineup | undefined;
  setLineup(value?: Lineup): void;
  hasLineup(): boolean;
  clearLineup(): void;

  getSubs(): Lineup | undefined;
  setSubs(value?: Lineup): void;
  hasSubs(): boolean;
  clearSubs(): void;

  getSubstitutions(): Substitutions | undefined;
  setSubstitutions(value?: Substitutions): void;
  hasSubstitutions(): boolean;
  clearSubstitutions(): void;

  getCommentsList(): Array<Comment>;
  setCommentsList(value: Array<Comment>): void;
  clearCommentsList(): void;
  addComments(value?: Comment, index?: number): Comment;

  getMatchstats(): MatchStats | undefined;
  setMatchstats(value?: MatchStats): void;
  hasMatchstats(): boolean;
  clearMatchstats(): void;

  getPlayerstats(): PlayerStats | undefined;
  setPlayerstats(value?: PlayerStats): void;
  hasPlayerstats(): boolean;
  clearPlayerstats(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Commentary.AsObject;
  static toObject(includeInstance: boolean, msg: Commentary): Commentary.AsObject;
  static serializeBinaryToWriter(message: Commentary, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Commentary;
  static deserializeBinaryFromReader(message: Commentary, reader: jspb.BinaryReader): Commentary;
}

export namespace Commentary {
  export type AsObject = {
    matchid: string,
    matchinfoList: Array<MatchInfo.AsObject>,
    lineup?: Lineup.AsObject,
    subs?: Lineup.AsObject,
    substitutions?: Substitutions.AsObject,
    commentsList: Array<Comment.AsObject>,
    matchstats?: MatchStats.AsObject,
    playerstats?: PlayerStats.AsObject,
  }
}

export class MatchInfo extends jspb.Message {
  getStadium(): string;
  setStadium(value: string): void;

  getAttendance(): string;
  setAttendance(value: string): void;

  getReferee(): string;
  setReferee(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MatchInfo.AsObject;
  static toObject(includeInstance: boolean, msg: MatchInfo): MatchInfo.AsObject;
  static serializeBinaryToWriter(message: MatchInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MatchInfo;
  static deserializeBinaryFromReader(message: MatchInfo, reader: jspb.BinaryReader): MatchInfo;
}

export namespace MatchInfo {
  export type AsObject = {
    stadium: string,
    attendance: string,
    referee: string,
  }
}

export class Lineup extends jspb.Message {
  getLocalteamList(): Array<Position>;
  setLocalteamList(value: Array<Position>): void;
  clearLocalteamList(): void;
  addLocalteam(value?: Position, index?: number): Position;

  getVisitorteamList(): Array<Position>;
  setVisitorteamList(value: Array<Position>): void;
  clearVisitorteamList(): void;
  addVisitorteam(value?: Position, index?: number): Position;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Lineup.AsObject;
  static toObject(includeInstance: boolean, msg: Lineup): Lineup.AsObject;
  static serializeBinaryToWriter(message: Lineup, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Lineup;
  static deserializeBinaryFromReader(message: Lineup, reader: jspb.BinaryReader): Lineup;
}

export namespace Lineup {
  export type AsObject = {
    localteamList: Array<Position.AsObject>,
    visitorteamList: Array<Position.AsObject>,
  }
}

export class Position extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getNumber(): string;
  setNumber(value: string): void;

  getName(): string;
  setName(value: string): void;

  getPos(): string;
  setPos(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Position.AsObject;
  static toObject(includeInstance: boolean, msg: Position): Position.AsObject;
  static serializeBinaryToWriter(message: Position, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Position;
  static deserializeBinaryFromReader(message: Position, reader: jspb.BinaryReader): Position;
}

export namespace Position {
  export type AsObject = {
    id: string,
    number: string,
    name: string,
    pos: string,
  }
}

export class Substitutions extends jspb.Message {
  getLocalteamList(): Array<Substitution>;
  setLocalteamList(value: Array<Substitution>): void;
  clearLocalteamList(): void;
  addLocalteam(value?: Substitution, index?: number): Substitution;

  getVisitorteamList(): Array<Substitution>;
  setVisitorteamList(value: Array<Substitution>): void;
  clearVisitorteamList(): void;
  addVisitorteam(value?: Substitution, index?: number): Substitution;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Substitutions.AsObject;
  static toObject(includeInstance: boolean, msg: Substitutions): Substitutions.AsObject;
  static serializeBinaryToWriter(message: Substitutions, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Substitutions;
  static deserializeBinaryFromReader(message: Substitutions, reader: jspb.BinaryReader): Substitutions;
}

export namespace Substitutions {
  export type AsObject = {
    localteamList: Array<Substitution.AsObject>,
    visitorteamList: Array<Substitution.AsObject>,
  }
}

export class Substitution extends jspb.Message {
  getOffname(): string;
  setOffname(value: string): void;

  getOnname(): string;
  setOnname(value: string): void;

  getOffid(): string;
  setOffid(value: string): void;

  getOnid(): string;
  setOnid(value: string): void;

  getMinute(): string;
  setMinute(value: string): void;

  getTableid(): string;
  setTableid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Substitution.AsObject;
  static toObject(includeInstance: boolean, msg: Substitution): Substitution.AsObject;
  static serializeBinaryToWriter(message: Substitution, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Substitution;
  static deserializeBinaryFromReader(message: Substitution, reader: jspb.BinaryReader): Substitution;
}

export namespace Substitution {
  export type AsObject = {
    offname: string,
    onname: string,
    offid: string,
    onid: string,
    minute: string,
    tableid: string,
  }
}

export class Comment extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getImportant(): string;
  setImportant(value: string): void;

  getGoal(): string;
  setGoal(value: string): void;

  getMinute(): string;
  setMinute(value: string): void;

  getComment(): string;
  setComment(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Comment.AsObject;
  static toObject(includeInstance: boolean, msg: Comment): Comment.AsObject;
  static serializeBinaryToWriter(message: Comment, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Comment;
  static deserializeBinaryFromReader(message: Comment, reader: jspb.BinaryReader): Comment;
}

export namespace Comment {
  export type AsObject = {
    id: string,
    important: string,
    goal: string,
    minute: string,
    comment: string,
  }
}

export class MatchStats extends jspb.Message {
  getLocalteamList(): Array<TeamStats>;
  setLocalteamList(value: Array<TeamStats>): void;
  clearLocalteamList(): void;
  addLocalteam(value?: TeamStats, index?: number): TeamStats;

  getVisitorteamList(): Array<TeamStats>;
  setVisitorteamList(value: Array<TeamStats>): void;
  clearVisitorteamList(): void;
  addVisitorteam(value?: TeamStats, index?: number): TeamStats;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MatchStats.AsObject;
  static toObject(includeInstance: boolean, msg: MatchStats): MatchStats.AsObject;
  static serializeBinaryToWriter(message: MatchStats, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MatchStats;
  static deserializeBinaryFromReader(message: MatchStats, reader: jspb.BinaryReader): MatchStats;
}

export namespace MatchStats {
  export type AsObject = {
    localteamList: Array<TeamStats.AsObject>,
    visitorteamList: Array<TeamStats.AsObject>,
  }
}

export class TeamStats extends jspb.Message {
  getShotstotal(): string;
  setShotstotal(value: string): void;

  getShotsongoal(): string;
  setShotsongoal(value: string): void;

  getFouls(): string;
  setFouls(value: string): void;

  getCorners(): string;
  setCorners(value: string): void;

  getOffsides(): string;
  setOffsides(value: string): void;

  getPossessiontime(): string;
  setPossessiontime(value: string): void;

  getYellowcards(): string;
  setYellowcards(value: string): void;

  getRedcards(): string;
  setRedcards(value: string): void;

  getSaves(): string;
  setSaves(value: string): void;

  getTableid(): string;
  setTableid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TeamStats.AsObject;
  static toObject(includeInstance: boolean, msg: TeamStats): TeamStats.AsObject;
  static serializeBinaryToWriter(message: TeamStats, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TeamStats;
  static deserializeBinaryFromReader(message: TeamStats, reader: jspb.BinaryReader): TeamStats;
}

export namespace TeamStats {
  export type AsObject = {
    shotstotal: string,
    shotsongoal: string,
    fouls: string,
    corners: string,
    offsides: string,
    possessiontime: string,
    yellowcards: string,
    redcards: string,
    saves: string,
    tableid: string,
  }
}

export class PlayerStats extends jspb.Message {
  getLocalteam(): Players | undefined;
  setLocalteam(value?: Players): void;
  hasLocalteam(): boolean;
  clearLocalteam(): void;

  getVisitorteam(): Players | undefined;
  setVisitorteam(value?: Players): void;
  hasVisitorteam(): boolean;
  clearVisitorteam(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PlayerStats.AsObject;
  static toObject(includeInstance: boolean, msg: PlayerStats): PlayerStats.AsObject;
  static serializeBinaryToWriter(message: PlayerStats, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PlayerStats;
  static deserializeBinaryFromReader(message: PlayerStats, reader: jspb.BinaryReader): PlayerStats;
}

export namespace PlayerStats {
  export type AsObject = {
    localteam?: Players.AsObject,
    visitorteam?: Players.AsObject,
  }
}

export class Players extends jspb.Message {
  getPlayerList(): Array<Player>;
  setPlayerList(value: Array<Player>): void;
  clearPlayerList(): void;
  addPlayer(value?: Player, index?: number): Player;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Players.AsObject;
  static toObject(includeInstance: boolean, msg: Players): Players.AsObject;
  static serializeBinaryToWriter(message: Players, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Players;
  static deserializeBinaryFromReader(message: Players, reader: jspb.BinaryReader): Players;
}

export namespace Players {
  export type AsObject = {
    playerList: Array<Player.AsObject>,
  }
}

export class Player extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getNum(): string;
  setNum(value: string): void;

  getName(): string;
  setName(value: string): void;

  getPos(): string;
  setPos(value: string): void;

  getPosx(): string;
  setPosx(value: string): void;

  getPosy(): string;
  setPosy(value: string): void;

  getShotstotal(): string;
  setShotstotal(value: string): void;

  getShotsongoal(): string;
  setShotsongoal(value: string): void;

  getGoals(): string;
  setGoals(value: string): void;

  getAssists(): string;
  setAssists(value: string): void;

  getOffsides(): string;
  setOffsides(value: string): void;

  getFoulsdrawn(): string;
  setFoulsdrawn(value: string): void;

  getFoulscommitted(): string;
  setFoulscommitted(value: string): void;

  getSaves(): string;
  setSaves(value: string): void;

  getYellowcards(): string;
  setYellowcards(value: string): void;

  getRedcards(): string;
  setRedcards(value: string): void;

  getPenscore(): string;
  setPenscore(value: string): void;

  getPenmiss(): string;
  setPenmiss(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Player.AsObject;
  static toObject(includeInstance: boolean, msg: Player): Player.AsObject;
  static serializeBinaryToWriter(message: Player, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Player;
  static deserializeBinaryFromReader(message: Player, reader: jspb.BinaryReader): Player;
}

export namespace Player {
  export type AsObject = {
    id: string,
    num: string,
    name: string,
    pos: string,
    posx: string,
    posy: string,
    shotstotal: string,
    shotsongoal: string,
    goals: string,
    assists: string,
    offsides: string,
    foulsdrawn: string,
    foulscommitted: string,
    saves: string,
    yellowcards: string,
    redcards: string,
    penscore: string,
    penmiss: string,
  }
}

