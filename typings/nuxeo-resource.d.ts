/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   nuxeo-resource.html
 */

// tslint:disable:variable-name Describing an API that's defined elsewhere.
// tslint:disable:no-any describes the API as best we are able today

/// <reference path="nuxeo-element.d.ts" />
/// <reference path="nuxeo-connection.d.ts" />

declare namespace Nuxeo {
  /**
   * `nuxeo-resource` allows managing REST on a Nuxeo server.
   *
   *     <nuxeo-resource auto
   *         path="Document.Query"
   *         on-response="handleResponse"></nuxeo-resource>
   *
   * With `auto` set to `true`, the GET method is executed whenever
   * its `path` properties are changed.
   *
   * Note: The `params` attribute must be double quoted JSON.
   *
   * You can trigger a method explicitly by calling `get`, `post`, `put` or `delete` on the
   * element.
   */
  class Resource extends Nuxeo.Element {
    /**
     * The id of a nuxeo-connection to use.
     */
    connectionId: string | null | undefined;

    /**
     * The success response status
     */
    success: boolean | null | undefined;

    /**
     * The error response
     */
    error: object | null | undefined;

    /**
     * If true, automatically execute the operation when either `path` or `params` changes.
     */
    auto: boolean | null | undefined;

    /**
     * The HTTP method to use ('GET', 'POST', 'PUT', or 'DELETE'). Default is 'GET'
     */
    method: string | null | undefined;

    /**
     * The path of the resource.
     */
    path: string | null | undefined;

    /**
     * The parameters to send.
     */
    params: object | null | undefined;

    /**
     * The data to pass to the server.
     */
    data: object | null | undefined;

    /**
     * The response from the server.
     */
    response: object | null | undefined;

    /**
     * The `entity-type` of the resource.
     */
    type: string | null | undefined;

    /**
     * The headers of the request.
     * 'Accept': 'text/plain,application/json' is already set by default.
     */
    headers: object | null | undefined;

    /**
     * The `content enricher` of the resource.
     * Can be an object with entity type as keys or list or string with the entity type defined by
     * `enrichers-entity`.
     */
    enrichers: object | null | undefined;

    /**
     * The `content enricher` entity-type of the resource. Default value for Nuxeo Document Model
     */
    enrichersEntity: string | null | undefined;

    /**
     * The `content type` of the request
     */
    contentType: string | null | undefined;

    /**
     * List of comma separated values of the document schemas to be returned.
     * All document schemas are returned by default.
     */
    schemas: string | null | undefined;

    /**
     * The delay in milliseconds to debounce the auto get call when path, params, etc. changes.
     */
    autoDelay: number | null | undefined;

    /**
     * Active request count.
     */
    readonly activeRequests: number | null | undefined;

    /**
     * If true, documents changed by the call will be reindexed synchronously server side.
     */
    syncIndexing: boolean | null | undefined;

    /**
     * True while requests are in flight.
     */
    readonly loading: boolean | null | undefined;

    /**
     * Execute a 'GET' request
     */
    get(): any;

    /**
     * Execute a 'POST' request
     */
    post(): any;

    /**
     * Execute a 'PUT' request
     */
    put(): any;

    /**
     * Execute a 'DELETE' request
     */
    remove(): any;

    /**
     * Execute the request
     */
    execute(): any;
    _autoGet(): void;
    _doExecute(params: any, options: any): any;
    _isLoading(): void;
  }
}

interface HTMLElementTagNameMap {
  'nuxeo-resource': Nuxeo.Resource;
}
