/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   nuxeo-page-provider.html
 */

// tslint:disable:variable-name Describing an API that's defined elsewhere.
// tslint:disable:no-any describes the API as best we are able today

/// <reference path="nuxeo-element.d.ts" />
/// <reference path="nuxeo-resource.d.ts" />

declare namespace Nuxeo {
  /**
   * `nuxeo-page-provider` performs queries on the repository and provides paginated results.
   *
   *     <nuxeo-page-provider auto
   *                          query="select * from Document"
   *                          page-size="5"
   *                          sort="dc:modified">
   *     </nuxeo-page-provider>
   *
   *     <nuxeo-page-provider auto page="1"
   *                          provider="default_search"
   *                          page-size="25">
   *     </nuxeo-page-provider>
   *
   *     <nuxeo-page-provider auto offset="2"
   *                          provider="default_search"
   *                          page-size="25">
   *     </nuxeo-page-provider>
   *
   * With `auto` set to `true`, results are fetched whenever
   * the `provider`, `query`, `params`, `page` or `pageSize` properties are changed.
   *
   * When using current page `offset`, the `page` property is ignored.
   *
   * You can fetch results explicitly by calling `fetch` on the
   * element.
   */
  class PageProvider extends Nuxeo.Element {
    readonly _params: any;
    readonly _sortKeys: any;
    readonly _sortValues: any;

    /**
     * The id of a nuxeo-connection to use.
     */
    connectionId: string | null | undefined;

    /**
     * If true, automatically execute the operation when either `provider` or `params` changes.
     */
    auto: boolean | null | undefined;

    /**
     * The delay in milliseconds to debounce the auto fetch call when provider, params, etc. changes.
     */
    autoDelay: number | null | undefined;

    /**
     * The id of a page provider.
     */
    provider: string | null | undefined;

    /**
     * The query.
     */
    query: string | null | undefined;

    /**
     * Computed path of the query endpoint to use.
     */
    readonly path: string | null | undefined;

    /**
     * The query parameters.
     */
    params: object | null | undefined;

    /**
     * The number of results per page.
     */
    pageSize: number | null | undefined;

    /**
     * The current page. Ignored when current page offset is set.
     */
    page: number | null | undefined;

    /**
     * The current page offset.
     */
    offset: number | null | undefined;

    /**
     * The current page entries.
     */
    currentPage: any[] | null | undefined;

    /**
     * Map of properties and direction 'asc' / 'desc'
     */
    sort: object | null | undefined;

    /**
     * Total number of pages.
     */
    numberOfPages: number | null | undefined;

    /**
     * Total number of results.
     */
    resultsCount: number | null | undefined;

    /**
     * Aggregations returned.
     */
    aggregations: object | null | undefined;

    /**
     * Quick filters state.
     */
    quickFilters: any[] | null | undefined;

    /**
     * Returns true if a next page is available.
     */
    isNextPageAvailable: boolean | null | undefined;

    /**
     * Current page's size
     */
    currentPageSize: number | null | undefined;

    /**
     * The `content enricher` of the resource.
     * Can be an object with entity type as keys or list or string (which defaults to `document` entity type).
     */
    enrichers: object | null | undefined;

    /**
     * List of comma separated values of the document schemas to be returned.
     * All document schemas are returned by default.
     */
    schemas: string | null | undefined;

    /**
     * The headers of the request.
     * 'Accept': 'text/plain,application/json' is already set by default.
     */
    headers: object | null | undefined;

    /**
     * Fetch the aggregate bucket's key if it matches a user
     * or directory entry and translate directory label.
     */
    fetchAggregates: boolean | null | undefined;

    /**
     * True while requests are in flight.
     */
    readonly loading: boolean | null | undefined;

    /**
     * If `true`, aggregagtes from page provider definition will not be computed.
     */
    skipAggregates: boolean | null | undefined;
    ready(): void;

    /**
     * Fetch the currentPage.
     *
     * @param options The options of the fetch:
     *   - "skipAggregates" to do not compute aggregations (boolean)
     */
    fetch(options?: object): any;
    _autoFetch(): void;
    _computePath(provider: any, query: any): any;
    _fetchAggregatesChanged(): void;
  }
}

interface HTMLElementTagNameMap {
  'nuxeo-page-provider': Nuxeo.PageProvider;
}
