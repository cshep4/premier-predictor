import * as jspb from "google-protobuf"

import * as request_pb from './request_pb';

export class Prediction extends jspb.Message {
  getUserid(): string;
  setUserid(value: string): void;

  getMatchid(): string;
  setMatchid(value: string): void;

  getHgoals(): number;
  setHgoals(value: number): void;

  getAgoals(): number;
  setAgoals(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Prediction.AsObject;
  static toObject(includeInstance: boolean, msg: Prediction): Prediction.AsObject;
  static serializeBinaryToWriter(message: Prediction, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Prediction;
  static deserializeBinaryFromReader(message: Prediction, reader: jspb.BinaryReader): Prediction;
}

export namespace Prediction {
  export type AsObject = {
    userid: string,
    matchid: string,
    hgoals: number,
    agoals: number,
  }
}

export class MatchPredictionSummary extends jspb.Message {
  getHomewin(): number;
  setHomewin(value: number): void;

  getDraw(): number;
  setDraw(value: number): void;

  getAwaywin(): number;
  setAwaywin(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MatchPredictionSummary.AsObject;
  static toObject(includeInstance: boolean, msg: MatchPredictionSummary): MatchPredictionSummary.AsObject;
  static serializeBinaryToWriter(message: MatchPredictionSummary, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MatchPredictionSummary;
  static deserializeBinaryFromReader(message: MatchPredictionSummary, reader: jspb.BinaryReader): MatchPredictionSummary;
}

export namespace MatchPredictionSummary {
  export type AsObject = {
    homewin: number,
    draw: number,
    awaywin: number,
  }
}

