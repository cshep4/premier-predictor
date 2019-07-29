/**
 * @fileoverview gRPC-Web generated client stub for model
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js')

var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js')

var request_pb = require('./request_pb.js')

var prediction_pb = require('./prediction_pb.js')
const proto = {};
proto.model = require('./live_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.model.LiveMatchServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.model.LiveMatchServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Empty,
 *   !proto.model.UpcomingMatchesResponse>}
 */
const methodDescriptor_LiveMatchService_GetUpcomingMatches = new grpc.web.MethodDescriptor(
  '/model.LiveMatchService/GetUpcomingMatches',
  grpc.web.MethodType.SERVER_STREAMING,
  google_protobuf_empty_pb.Empty,
  proto.model.UpcomingMatchesResponse,
  /** @param {!proto.google.protobuf.Empty} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.model.UpcomingMatchesResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Empty,
 *   !proto.model.UpcomingMatchesResponse>}
 */
const methodInfo_LiveMatchService_GetUpcomingMatches = new grpc.web.AbstractClientBase.MethodInfo(
  proto.model.UpcomingMatchesResponse,
  /** @param {!proto.google.protobuf.Empty} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.model.UpcomingMatchesResponse.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Empty} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.model.UpcomingMatchesResponse>}
 *     The XHR Node Readable Stream
 */
proto.model.LiveMatchServiceClient.prototype.getUpcomingMatches =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/model.LiveMatchService/GetUpcomingMatches',
      request,
      metadata || {},
      methodDescriptor_LiveMatchService_GetUpcomingMatches);
};


/**
 * @param {!proto.google.protobuf.Empty} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.model.UpcomingMatchesResponse>}
 *     The XHR Node Readable Stream
 */
proto.model.LiveMatchServicePromiseClient.prototype.getUpcomingMatches =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/model.LiveMatchService/GetUpcomingMatches',
      request,
      metadata || {},
      methodDescriptor_LiveMatchService_GetUpcomingMatches);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.model.PredictionRequest,
 *   !proto.model.MatchSummary>}
 */
const methodDescriptor_LiveMatchService_GetMatchSummary = new grpc.web.MethodDescriptor(
  '/model.LiveMatchService/GetMatchSummary',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.model.PredictionRequest,
  proto.model.MatchSummary,
  /** @param {!proto.model.PredictionRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.model.MatchSummary.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.model.PredictionRequest,
 *   !proto.model.MatchSummary>}
 */
const methodInfo_LiveMatchService_GetMatchSummary = new grpc.web.AbstractClientBase.MethodInfo(
  proto.model.MatchSummary,
  /** @param {!proto.model.PredictionRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.model.MatchSummary.deserializeBinary
);


/**
 * @param {!proto.model.PredictionRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.model.MatchSummary>}
 *     The XHR Node Readable Stream
 */
proto.model.LiveMatchServiceClient.prototype.getMatchSummary =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/model.LiveMatchService/GetMatchSummary',
      request,
      metadata || {},
      methodDescriptor_LiveMatchService_GetMatchSummary);
};


/**
 * @param {!proto.model.PredictionRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.model.MatchSummary>}
 *     The XHR Node Readable Stream
 */
proto.model.LiveMatchServicePromiseClient.prototype.getMatchSummary =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/model.LiveMatchService/GetMatchSummary',
      request,
      metadata || {},
      methodDescriptor_LiveMatchService_GetMatchSummary);
};


module.exports = proto.model;

