'use strict';

var _finance = require('./configurations/finance');

var $ = require('jquery');
var GoldenLayout = require('golden-layout');

// import { layout, panels } from './configurations/property';


function reset_css() {
    return '\n        body {\n            visibility: hidden!important;\n            position: fixed!important;\n            top: 0!important;\n            right: 0!important;\n            bottom: 0!important;\n            left: 0!important;\n            z-index: 999999!important;\n            width: 100%!important;\n            height: 100%!important;\n            overflow: hidden!important;\n            padding: 0!important;\n            margin: 0!important;\n        }\n        body:after {\n            content: \'\';\n            position: fixed;\n            top: 0;\n            right: 0;\n            bottom: 0;\n            left: 0;\n            background: #eee;\n        }\n        iframe {\n            display: none!important;\n        }\n    ';
}

function css(selector) {
    return '\n        ' + selector + ' {\n            visibility: visible!important;\n            position: fixed!important;\n            top: 0!important;\n            right: 0!important;\n            bottom: 0!important;\n            left: 0!important;\n            z-index: 999999!important;\n            width: 100%!important;\n            height: 100%!important;\n            overflow: hidden!important;\n            padding: 0!important;\n            margin: 0!important;\n        }\n    ';
}

function new_component(layout, config) {

    layout.registerComponent(config.name, function (container, state) {

        var webview = document.createElement('webview');
        webview.autosize = 'on';
        webview.src = config.src;

        webview.addEventListener('did-start-loading', function () {
            console.log('did start loading');
        });

        webview.addEventListener('did-finish-load', function () {
            console.log('did finish load');
            var styles = void 0;
            if (config.selectors.length) {
                styles = reset_css();
                config.selectors.forEach(function (sel) {
                    styles += css(sel);
                });
            }
            if (config.css) styles += config.css;
            console.log(styles);
            webview.insertCSS(styles);
        });

        webview.addEventListener('did-stop-loading', function () {
            console.log('did stop loading');
        });

        webview.addEventListener('dom-ready', function () {
            console.log('dom ready');
        });

        container.getElement().html(webview);
    });
}

var myLayout = new GoldenLayout(_finance.layout, document.getElementById('app'));

_finance.panels.forEach(function (panel) {
    return new_component(myLayout, panel);
});

$(window).resize(function () {
    myLayout.updateSize();
});

myLayout.init();