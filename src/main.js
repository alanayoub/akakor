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

akakor.layout.on('stackCreated', function(stack) {
    console.log('stack', stack);
    function dostuff(header) {

        const $header = header.element;
        const $tabs = $header.find('.lm_tabs');
        const $controls = $header.find('.lm_controls');
        let $add_tab = $header.find('.t-add-tab');


        // $controls
        //     .css({left: $tabs.width() + 'px'});

        // $controls
        //     .find('> li')
        //     .css({float: 'right'});

        // const listItems = $controls.find('> li');
        // $controls.append(listItems.get().reverse());

        if (!$add_tab.length) {
            header.controlsContainer.prepend('<li class="t-add-tab" style="background: #fff">foo</li>');
        }
        $add_tab = $header.find('.t-add-tab');

        const header_width = $header.width();
        const tabs_width = $tabs.width();
        const controls_width = $controls.width();
        const left = `${tabs_width + controls_width - header_width}px`;

        $add_tab.css({
            left: left
        });
    }
    stack.on( 'activeContentItemChanged', function( contentItem ){
        console.log(contentItem);
        dostuff(contentItem.parent.header);
        // const $header = contentItem.parent.header.element;
        // const $tabs = $header.find('.lm_tabs');
        // const $controls = $header.find('.lm_controls');
        // $controls.css({
        //     left: $tabs.width() + 'px'
        // });
        // $controls.find('> li').css({float: 'right'});
        // .wrapAll('<div>').addClass('t-right').css({
        //     'right': 0
        // });

        // var list = $controls.find('.t-right');
        // var listItems = list.find('> li');
        // list.append(listItems.get().reverse());


        // interact with the contentItem
    });
    // stack.getActiveContentItem().container.extendState({color: '#faa'});
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
