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

        api.update_user(user);

        const main_tabs = new MainTabs({
            selector: 'body > section'
        });

        $('header').on('click', '.a-save', event => {
            // console.log(akakor.layout.toConfig());
        });

        $('header').on('click', '.a-signout', event => {
            console.log('signing out');
            auth.signOut();
        });

    }
});

//
// Add mobile checkbox
// Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Mobile Safari/537.36
//

//
// NOTES: Add
// * Google
// * http://finviz.com/map.ashx?t=sec&st=
//
