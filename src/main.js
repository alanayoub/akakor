import 'babel-polyfill';
import $ from 'jquery';
window.$ = $;

// import "vue-form-generator/dist/vfg-core.css";

import { Layout } from './views/layout';

//
// Layout
//
const GoldenLayout = require('golden-layout');
// import * as config from './configurations/alan:c:trading.json';
import * as config from './configurations/alan:c:web.json';
const akakor = {};
akakor.layout = new Layout({
    selector: document.querySelector('body > section'),
    layout: config.layout,
    state: config.state
});

//
// Add "new tab" button
//
akakor.layout.on('stackCreated', function (stack) {
    stack.on('activeContentItemChanged', function (contentItem) {

        setTimeout(() => {

            const $header = contentItem.parent.header.element;
            const $tabs = $header.find('.lm_tabs');
            const $controls = $header.find('.lm_controls');

            let $add_tab = $header.find('.t-add-tab');
            if (!$add_tab.length) {
                contentItem.parent.header.controlsContainer.prepend('<li class="t-add-tab" style="background: #fff">+</li>');
                $add_tab = $header.find('.t-add-tab');
                $add_tab.off('click.addtab').on('click.addtab', function (event) {

                    stack.addChild({
                        id: +new Date(),
                        type: 'component',
                        componentName: 'default',
                        componentState: {title: '', url: ''}
                    });

                });
            }

            $add_tab.css({
                left: `${$tabs.width() + $controls.width() - $header.width()}px`
            });

        }, 0)

    });
});

//
// Handle Resize
//
$(window).resize(() => {
    akakor.layout.updateSize();
});

//
// Save
//
$('header').on('click', '.a-save', event => {
    console.log(akakor.layout.toConfig());
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
