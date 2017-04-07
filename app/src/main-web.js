import 'babel-polyfill';
import $ from 'jquery';
import { MainTabs } from './views/main_tabs';
import { API } from './api';

const api = new API();
const auth = api.auth;
const db = api.db;

window.$ = $;
window.akakor = {
    db,
    auth,
    api
}

auth.onAuthStateChanged(user => {
    const loc = window.location.href;
    const signin = 'http://localhost:8080/signin.html';
    if (!user && loc !== signin) window.location.replace(signin);
    if (user) {

        akakor.api.user = user;
        api.update_user();

        const main_tabs = new MainTabs({
            selector: 'body > section'
        });

        $('header').on('click', '.a-save', event => {});

        $('header').on('click', '.a-signout', event => {
            console.log('signing out');
            auth.signOut();
        });

    }
});
