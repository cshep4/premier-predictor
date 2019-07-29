import {NextFunction, Request, response, Response} from "express";
import {LiveMatchServiceClient} from "./pb/live_grpc_web_pb";
import {Empty} from "google-protobuf/google/protobuf/empty_pb";
import {LiveMatchServiceClientFactory} from "./factory";

export class LiveMatchService {
  private client: LiveMatchServiceClient;
  constructor() {
    this.client = LiveMatchServiceClientFactory();
  }

  getUpcomingMatches(token) {

    // let stream = this.client.getUpcomingMatches(new Empty(), {'token': token});
    //
    // stream.on('data', (response) => {
    //   console.log(response);
    // });
    //
    // stream.on('status', (status) => {
    //   console.log(status.code);
    //   console.log(status.details);
    //   console.log(status.metadata);
    // });
    //
    // stream.on('end', () => {
    //   // stream end signal
    // });
  }
}
