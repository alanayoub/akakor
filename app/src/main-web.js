import Vue from 'vue'
import App from './App.vue'

import 'babel-polyfill';
import $ from 'jquery';
import { API } from './api';

const api = new API();
const auth = api.auth;
const db = api.db;

const ELECTRON_ORIGIN = 'http://localhost:8081';
const WEB_ORIGIN = 'http://localhost:8081';
const IS_ELECTRON = !!(window && window.process && window.process.type);
const ORIGIN = IS_ELECTRON ? ELECTRON_ORIGIN : WEB_ORIGIN;

window.$ = $;
window.akakor = {
    db,
    auth,
    api,
    IS_ELECTRON,
    ORIGIN
}

auth.onAuthStateChanged(user => {
    const loc = window.location.href;
    const signin = `${ORIGIN}/signin.html`;
    if (!user && loc !== signin) window.location.replace(signin);
    if (user) {

        akakor.api.user = user;
        api.update_user();

        new Vue({
          el: '#app',
          render: h => h(App)
        });

    }
});


