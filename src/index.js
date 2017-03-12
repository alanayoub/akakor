var $ = require('jquery');
var GoldenLayout = require('golden-layout');

// import { layout, panels } from './configurations/property';
import { layout, panels } from './configurations/finance';

function reset_css() {
    return `
        body {
            visibility: hidden!important;
            position: fixed!important;
            top: 0!important;
            right: 0!important;
            bottom: 0!important;
            left: 0!important;
            z-index: 999999!important;
            width: 100%!important;
            height: 100%!important;
            overflow: hidden!important;
            padding: 0!important;
            margin: 0!important;
        }
        body:after {
            content: '';
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: #eee;
        }
        iframe {
            display: none!important;
        }
    `;
}

function css(selector) {
    return `
        ${selector} {
            visibility: visible!important;
            position: fixed!important;
            top: 0!important;
            right: 0!important;
            bottom: 0!important;
            left: 0!important;
            z-index: 999999!important;
            width: 100%!important;
            height: 100%!important;
            overflow: hidden!important;
            padding: 0!important;
            margin: 0!important;
        }
    `;
}

function new_component(layout, config) {

    layout.registerComponent(config.name, function (container, state) {

        const webview = document.createElement('webview');
        webview.autosize = 'on';
        webview.src = config.src;

        webview.addEventListener('did-start-loading', () => {
            console.log('did start loading');
        });

        webview.addEventListener('did-finish-load', () => {
            console.log('did finish load');
            let styles;
            if (config.selectors.length) {
                styles = reset_css();
                config.selectors.forEach(sel => {
                    styles += css(sel);
                });
            }
            if (config.css) styles += config.css;
            console.log(styles);
            webview.insertCSS(styles);
        });

        webview.addEventListener('did-stop-loading', () => {
            console.log('did stop loading');
        });

        webview.addEventListener('dom-ready', () => {
            console.log('dom ready');
        });

        container.getElement().html(webview);

    });

}

const myLayout = new GoldenLayout(layout, document.getElementById('app'));

panels.forEach(panel => new_component(myLayout, panel));

$(window).resize(() => {
    myLayout.updateSize();
});

myLayout.init();
