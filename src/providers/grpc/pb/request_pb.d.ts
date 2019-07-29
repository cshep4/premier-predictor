import * as jspb from "google-protobuf"

export class IdRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: IdRequest): IdRequest.AsObject;
  static serializeBinaryToWriter(message: IdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IdRequest;
  static deserializeBinaryFromReader(message: IdRequest, reader: jspb.BinaryReader): IdRequest;
}

export namespace IdRequest {
  export type AsObject = {
    id: string,
  }
}

export class EmailRequest extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmailRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EmailRequest): EmailRequest.AsObject;
  static serializeBinaryToWriter(message: EmailRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmailRequest;
  static deserializeBinaryFromReader(message: EmailRequest, reader: jspb.BinaryReader): EmailRequest;
}

export namespace EmailRequest {
  export type AsObject = {
    email: string,
  }
}

export class PredictionRequest extends jspb.Message {
  getUserid(): string;
  setUserid(value: string): void;

  getMatchid(): string;
  setMatchid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PredictionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PredictionRequest): PredictionRequest.AsObject;
  static serializeBinaryToWriter(message: PredictionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PredictionRequest;
  static deserializeBinaryFromReader(message: PredictionRequest, reader: jspb.BinaryReader): PredictionRequest;
}

export namespace PredictionRequest {
  export type AsObject = {
    userid: string,
    matchid: string,
  }
}

