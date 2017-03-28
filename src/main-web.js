import 'babel-polyfill';
import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import 'firebase/auth';
import 'firebase/database';
import $ from 'jquery';

import { MainTabs } from './views/main_tabs';

window.$ = $;
const GoldenLayout = require('golden-layout');

firebase.initializeApp({
    apiKey: "AIzaSyAWPm9I7EinJ1eo_wvhJWzGZQ4FkyIf0tY",
    authDomain: "akakor-b9059.firebaseapp.com",
    databaseURL: "https://akakor-b9059.firebaseio.com",
    storageBucket: "akakor-b9059.appspot.com",
    messagingSenderId: "300145344405"
});

firebase.auth().onAuthStateChanged(firebaseUser => {
    const loc = window.location.href;
    const signin = 'http://localhost:8080/signin.html';
    if (!firebaseUser && loc !== signin) window.location.replace(signin);
    if (firebaseUser) {


        const main_tabs = new MainTabs({
            selector: 'body > section'
        });

        $(window).resize(() => {
            // akakor.layout.updateSize();
        });

        $('header').on('click', '.a-save', event => {
            console.log(akakor.layout.toConfig());
        });

        $('header').on('click', '.a-signout', event => {
            console.log('signing out');
            firebase.auth().signOut();
        });
    }
});




//
// Notes
//

//
// Add mobile checkbox
// Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Mobile Safari/537.36
//

//
// NOTES: Add
// * Google
// * http://finviz.com/map.ashx?t=sec&st=
//


//
// Layout patterns for test
//
// //
// var l = [
//   '000111111',
//   '000222333',
//   '000222333',
//   '444444444',
// ];
// var l2 = [
//   '00112222',
//   '00112222',
//   '33112222',
//   '44442222',
//   '55555566',
// ];
// var l3 = [
//   '00112222',
//   '00112222',
//   '33112222',
//   '44442222',
//   '55555566',
//   '55555566',
//   '77777777',
// ];
// var l4 = [
//   '012',
//   '345',
//   '678'
// ];
// var l5 = [
//   '00002000',
//   '00002000',
//   '00002000',
//   '11112111',
//   '00002000',
//   '00002000',
//   '00002000',
// ];
// var l6 = [
//     '0001112222222233',
//     '0001112222222233',
//     '0001112222222233',
//     '0001114444444455',
//     '0001114444444455',
//     '0001114444444455',
//     '6666666677777777'
// ]
