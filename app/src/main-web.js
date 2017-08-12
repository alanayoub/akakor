import 'babel-polyfill';
import $ from 'jquery';
import Vue from 'vue';

import App from './App.vue';
import { API } from './api';

const api = new API();
const bus = new Vue();
const auth = api.auth;
const db = api.db;

const ELECTRON_ORIGIN = 'http://localhost:8081';
const WEB_ORIGIN = 'http://localhost:8081';
const IS_ELECTRON = !!(window && window.process && window.process.type);
const ORIGIN = IS_ELECTRON ? ELECTRON_ORIGIN : WEB_ORIGIN;
const HOME_URL = 'https://www.google.com/';

window.$ = $;
window.akakor = {
    db,
    auth,
    api,
    bus,
    IS_ELECTRON,
    ORIGIN,
    HOME_URL,
}
let app;

auth.onAuthStateChanged(user => {
    const loc = window.location.href;
    const signin = `${ORIGIN}/signin.html`;
    if (!user && loc !== signin) window.location.replace(signin);
    if (user) {

        // user is the user credentials we get from google auth
        // db_user is the stored user credentials in our firebase databse
        akakor.api.user = user;
        api.update_user().then(db_user => {
            const usr = db_user.val();
            if (!usr.username) {
                // create username modal
            };
        });

        if (app === void 0) app = new Vue({
          el: '#app',
          render: h => h(App)
        });

    }
});


