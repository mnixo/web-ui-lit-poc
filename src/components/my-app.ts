/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { customElement, html, LitElement, property } from 'lit-element';
import { updateMetadata } from 'pwa-helpers/metadata.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';

// These are the elements needed by this element.
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import { menuIcon } from './my-icons';
import './snack-bar';

// @ts-ignore
import { Router } from '@vaadin/router';

import '@nuxeo/nuxeo-elements/nuxeo-connection';

@customElement('my-app')
class MyApp extends LitElement {
  @property({ type: String })
  public appTitle: string = '';

  @property({ type: String })
  public baseUrl: string = '';

  @property({ type: String })
  protected _page: string = 'doc';

  @property({ type: Boolean })
  protected _drawerOpened: boolean = false;

  @property({ type: Boolean })
  protected _snackbarOpened: boolean = false;

  @property({ type: Boolean })
  protected _offline: boolean = false;

  @property({ type: String })
  protected _route: string = '';

  @property({ type: Object })
  private __snackbarTimer?: number;

  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/3.0/docs/devguide/settings#setting-passive-touch-gestures
    setPassiveTouchGestures(true);
  }

  protected render() {
    // Anything that's related to rendering should be done in here.
    return html`
      <style>
        :host {
          --app-drawer-width: 256px;
          display: block;

          --app-primary-color: #e91e63;
          --app-secondary-color: #293237;
          --app-dark-text-color: var(--app-secondary-color);
          --app-light-text-color: white;
          --app-section-even-color: #f7f7f7;
          --app-section-odd-color: white;

          --app-header-background-color: white;
          --app-header-text-color: var(--app-dark-text-color);
          --app-header-selected-color: var(--app-primary-color);

          --app-drawer-background-color: var(--app-secondary-color);
          --app-drawer-text-color: var(--app-light-text-color);
          --app-drawer-selected-color: #78909c;

          /* -- Nuxeo Branding colors -- */
          --nuxeo-primary-color: #ccc;
        }

        app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }

        app-header {
          text-align: center;
          background-color: var(--app-header-background-color);
          color: var(--app-header-text-color);
          border-bottom: 1px solid #eee;
        }

        .toolbar-top {
          background-color: var(--app-header-background-color);
        }

        .menu-btn {
          background: none;
          border: none;
          fill: var(--app-header-text-color);
          cursor: pointer;
          height: 44px;
          width: 44px;
          position: absolute;
          top: 0;
          left: 0;
        }

        .drawer-list {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          padding: 24px;
          background: var(--app-drawer-background-color);
          position: relative;
        }

        .drawer-list > a {
          display: block;
          text-decoration: none;
          color: var(--app-drawer-text-color);
          line-height: 40px;
          padding: 0 24px;
        }

        .drawer-list > a[selected] {
          color: var(--app-drawer-selected-color);
        }

        /* Workaround for IE11 displaying <main> as inline */
        main {
          display: block;
        }

        .main-content {
          /* padding-top: 64px; */
          /* min-height: 100vh; */
        }

        .main-content > * {
          display: block;
        }
      </style>

      <nuxeo-connection url="${this.baseUrl}"></nuxeo-connection>

      <!-- Drawer content -->
      <app-drawer-layout>
        <app-drawer swipe-open slot="drawer">
          <nav class="drawer-list">
            <a ?selected="${this._page === 'browse'}" href="/browse">Browse</a>
            <a ?selected="${this._page === 'search'}" href="/search">Search</a>
          </nav>
        </app-drawer>
        <!-- Header -->
        <app-header-layout>
          <!-- Main content -->
          <main role="main" class="main-content">
          </main>
        </app-header-layout>
        <button class="menu-btn" title="Menu" drawer-toggle>${menuIcon}</button>
      </app-drawer-layout>

      <snack-bar ?active="${this._snackbarOpened}">
        You are now ${this._offline ? 'offline' : 'online'}.</snack-bar
      >
    `;
  }

  protected firstUpdated() {
    installOfflineWatcher((offline) => this._offlineChanged(offline));
    const content = this.shadowRoot && this.shadowRoot.querySelector('.main-content');
    const router = new Router(content);
    router.setRoutes([
      { path: '/', redirect: '/doc' },
      {
        action: () => import(/* webpackChunkName: "browser" */ '../components/poc-browser')
          .then(() => this._loadPage('browse')),
        component: 'poc-browser',
        name: 'browse',
        path: '/browse:path(.*)',
      },
      {
        action: () => import(/* webpackChunkName: "browser" */ '../components/poc-search')
          .then(() => this._loadPage('search')),
        component: 'poc-search',
        name: 'search',
        path: '/search',
      },
      {
        action: () => import(/* webpackChunkName: "404" */ '../components/my-view404')
          .then(() => this._loadPage('')),
        component: 'my-view404',
        path: '(.*)',
      },
    ]);
  }

  protected updated(changedProps: Map<string, object>) {
    if (changedProps.has('_page')) {
      const pageTitle = this.appTitle + ' - ' + this._page;
      updateMetadata({
        description: pageTitle,
        title: pageTitle,
        // This object also takes an image property, that points to an img src.
      });
    }
  }

  private _offlineChanged(offline: boolean) {
    const previousOffline = this._offline;
    this._offline = offline;

    // Don't show the snackbar on the first load of the page.
    if (previousOffline === undefined) {
      return;
    }
    window.clearTimeout(this.__snackbarTimer);
    this._snackbarOpened = true;
    this.__snackbarTimer = window.setTimeout(() => {
      this._snackbarOpened = false;
    }, 3000);
  }

  private _loadPage(page: string) {
    this._page = page;
  }
}
