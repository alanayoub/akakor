import { Layout } from '../layout';
// import * as config from '../../configurations/alan:c:web.json';
export class SelectLayoutView {
    constructor(selector) {
        const $selector = $(selector);
        const db = firebase.database();
        const config = {};

        const template = `
            <div class="A-layout-selector">
                <h1>Select a Layout</h1>
                <ul></ul>
            </div>
        `;

        $selector
            .html(template)
            .on('click', 'li', event => {
                const $target = $(event.target);
                const id = $target.data('id');
                new Layout({
                    selector: $selector,
                    layout: config[id]
                });
            });

        db.ref('default_configurations')
            .once('value')
            .then(data => {
                let html = '';
                for (let [key, val] of Object.entries(data.val())) {
                    const layout = JSON.stringify(val.layout);
                    html += `<li data-id="${key}">${layout}</li>`;
                    config[key] = val.layout;
                }
                $('.A-layout-selector ul').html(html);
            });


    }
}
