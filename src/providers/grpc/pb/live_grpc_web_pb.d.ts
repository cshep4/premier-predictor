import * as grpcWeb from 'grpc-web';

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';
import * as request_pb from './request_pb';
import * as prediction_pb from './prediction_pb';

import {
  MatchSummary,
  UpcomingMatchesResponse} from './live_pb';

export class LiveMatchServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; });

  getUpcomingMatches(
    request: google_protobuf_empty_pb.Empty,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<UpcomingMatchesResponse>;

  getMatchSummary(
    request: request_pb.PredictionRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<MatchSummary>;

}

export class LiveMatchServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; });

  getUpcomingMatches(
    request: google_protobuf_empty_pb.Empty,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<UpcomingMatchesResponse>;

  getMatchSummary(
    request: request_pb.PredictionRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<MatchSummary>;

}

