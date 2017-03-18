export class Webview {
    constructor({golden_layout, state}) {

        const webview = document.createElement('webview');
        webview.autosize = 'on';
        webview.src = state.url;

        webview.addEventListener('did-start-loading', () => {
            console.log('did start loading');
        });

        webview.addEventListener('did-finish-load', () => {
            console.log('did finish load');
            let styles;
            if (state.selectors && state.selectors.length) {
                styles = reset_css();
                state.selectors.forEach(sel => {
                    styles += css(sel);
                });
            }
            if (state.css) styles += state.css;
            console.log(styles);
            webview.insertCSS(styles);
        });

        webview.addEventListener('did-stop-loading', () => {
            console.log('did stop loading');
        });

        webview.addEventListener('dom-ready', () => {
            console.log('dom ready');
        });

        golden_layout.registerComponent(state.title, function (container, state) {
            container.getElement().html(webview);
        });

    }
}
