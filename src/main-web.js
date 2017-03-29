import 'babel-polyfill';
import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import 'firebase/auth';
import 'firebase/database';
import $ from 'jquery';

import { MainTabs } from './views/main_tabs';

window.$ = $;
window.firebase = firebase;

firebase.initializeApp({
    apiKey: "AIzaSyAWPm9I7EinJ1eo_wvhJWzGZQ4FkyIf0tY",
    authDomain: "akakor-b9059.firebaseapp.com",
    databaseURL: "https://akakor-b9059.firebaseio.com",
    storageBucket: "akakor-b9059.appspot.com",
    messagingSenderId: "300145344405"
});

const db = firebase.database();
const auth = firebase.auth();

function check_if_user_exists(auth_data) {
    return db
        .ref('users')
        .child(auth_data.uid)
        .once('value')
        .then(dataSnapshot => {
            return Promise.resolve({
                auth_data,
                exists: dataSnapshot.exists(),
            });
        });
}

auth.onAuthStateChanged(user => {
    const loc = window.location.href;
    const signin = 'http://localhost:8080/signin.html';
    if (!user && loc !== signin) window.location.replace(signin);
    if (user) {

        check_if_user_exists(user).then(({auth_data, exists}) => {
            const provider_data = auth_data.providerData[0];
            if (exists) {
                for (let [key, val] of Object.entries(provider_data)) {
                    db.ref(`users/${auth_data.uid}/${key}/`).set(val);
                }
            } else {
                db.ref(`users/${auth_data.uid}`).set(provider_data);
            }
        });

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
