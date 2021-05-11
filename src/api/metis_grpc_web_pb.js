/**
 * @fileoverview gRPC-Web generated client stub for api
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js')
const proto = {};
proto.api = require('./metis_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.MetisClient =
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

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.MetisPromiseClient =
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

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.CreateProjectRequest,
 *   !proto.api.CreateProjectResponse>}
 */
const methodDescriptor_Metis_CreateProject = new grpc.web.MethodDescriptor(
  '/api.Metis/CreateProject',
  grpc.web.MethodType.UNARY,
  proto.api.CreateProjectRequest,
  proto.api.CreateProjectResponse,
  /**
   * @param {!proto.api.CreateProjectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.CreateProjectResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.CreateProjectRequest,
 *   !proto.api.CreateProjectResponse>}
 */
const methodInfo_Metis_CreateProject = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.CreateProjectResponse,
  /**
   * @param {!proto.api.CreateProjectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.CreateProjectResponse.deserializeBinary
);


/**
 * @param {!proto.api.CreateProjectRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.CreateProjectResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.CreateProjectResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.MetisClient.prototype.createProject =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.Metis/CreateProject',
      request,
      metadata || {},
      methodDescriptor_Metis_CreateProject,
      callback);
};


/**
 * @param {!proto.api.CreateProjectRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.CreateProjectResponse>}
 *     Promise that resolves to the response
 */
proto.api.MetisPromiseClient.prototype.createProject =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.Metis/CreateProject',
      request,
      metadata || {},
      methodDescriptor_Metis_CreateProject);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.ListProjectsRequest,
 *   !proto.api.ListProjectsResponse>}
 */
const methodDescriptor_Metis_ListProjects = new grpc.web.MethodDescriptor(
  '/api.Metis/ListProjects',
  grpc.web.MethodType.UNARY,
  proto.api.ListProjectsRequest,
  proto.api.ListProjectsResponse,
  /**
   * @param {!proto.api.ListProjectsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.ListProjectsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.ListProjectsRequest,
 *   !proto.api.ListProjectsResponse>}
 */
const methodInfo_Metis_ListProjects = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.ListProjectsResponse,
  /**
   * @param {!proto.api.ListProjectsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.ListProjectsResponse.deserializeBinary
);


/**
 * @param {!proto.api.ListProjectsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.ListProjectsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.ListProjectsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.MetisClient.prototype.listProjects =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.Metis/ListProjects',
      request,
      metadata || {},
      methodDescriptor_Metis_ListProjects,
      callback);
};


/**
 * @param {!proto.api.ListProjectsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.ListProjectsResponse>}
 *     Promise that resolves to the response
 */
proto.api.MetisPromiseClient.prototype.listProjects =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.Metis/ListProjects',
      request,
      metadata || {},
      methodDescriptor_Metis_ListProjects);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.UpdateProjectRequest,
 *   !proto.api.UpdateProjectResponse>}
 */
const methodDescriptor_Metis_UpdateProject = new grpc.web.MethodDescriptor(
  '/api.Metis/UpdateProject',
  grpc.web.MethodType.UNARY,
  proto.api.UpdateProjectRequest,
  proto.api.UpdateProjectResponse,
  /**
   * @param {!proto.api.UpdateProjectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.UpdateProjectResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.UpdateProjectRequest,
 *   !proto.api.UpdateProjectResponse>}
 */
const methodInfo_Metis_UpdateProject = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.UpdateProjectResponse,
  /**
   * @param {!proto.api.UpdateProjectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.UpdateProjectResponse.deserializeBinary
);


/**
 * @param {!proto.api.UpdateProjectRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.UpdateProjectResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.UpdateProjectResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.MetisClient.prototype.updateProject =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.Metis/UpdateProject',
      request,
      metadata || {},
      methodDescriptor_Metis_UpdateProject,
      callback);
};


/**
 * @param {!proto.api.UpdateProjectRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.UpdateProjectResponse>}
 *     Promise that resolves to the response
 */
proto.api.MetisPromiseClient.prototype.updateProject =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.Metis/UpdateProject',
      request,
      metadata || {},
      methodDescriptor_Metis_UpdateProject);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.DeleteProjectRequest,
 *   !proto.api.DeleteProjectResponse>}
 */
const methodDescriptor_Metis_DeleteProject = new grpc.web.MethodDescriptor(
  '/api.Metis/DeleteProject',
  grpc.web.MethodType.UNARY,
  proto.api.DeleteProjectRequest,
  proto.api.DeleteProjectResponse,
  /**
   * @param {!proto.api.DeleteProjectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.DeleteProjectResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.DeleteProjectRequest,
 *   !proto.api.DeleteProjectResponse>}
 */
const methodInfo_Metis_DeleteProject = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.DeleteProjectResponse,
  /**
   * @param {!proto.api.DeleteProjectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.DeleteProjectResponse.deserializeBinary
);


/**
 * @param {!proto.api.DeleteProjectRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.DeleteProjectResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.DeleteProjectResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.MetisClient.prototype.deleteProject =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.Metis/DeleteProject',
      request,
      metadata || {},
      methodDescriptor_Metis_DeleteProject,
      callback);
};


/**
 * @param {!proto.api.DeleteProjectRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.DeleteProjectResponse>}
 *     Promise that resolves to the response
 */
proto.api.MetisPromiseClient.prototype.deleteProject =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.Metis/DeleteProject',
      request,
      metadata || {},
      methodDescriptor_Metis_DeleteProject);
};


module.exports = proto.api;

