import 'babel-polyfill';
import { Layout } from './views/layout';
window.$ = require('jquery');

//
// Layout
//
const GoldenLayout = require('golden-layout');
import * as config from './configurations/alan:c:trading.json';
const akakor = {};
akakor.layout = new Layout({
    selector: document.querySelector('body > section'),
    layout: config.layout,
    state: config.state
});

$(window).resize(() => {
    akakor.layout.updateSize();
});

//
// Save
//
$('header').on('click', '.a-save', event => {
    console.log(akakor.layout.toConfig());
});

// $('body').on('click', '.a-default', event => {
//     console.log('akakor', akakor);
// });



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
