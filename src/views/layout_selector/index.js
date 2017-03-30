import { Layout } from '../layout';
// import * as config from '../../configurations/alan:c:web.json';
export class SelectLayoutView {

    constructor(selector) {

        const $selector = $(selector);
        const config = {};
        const template = `
            <div class="A-layout-selector">
                <h1>Select a Layout</h1>
                <ul></ul>
            </div>
        `;

        $selector
            .html(template)
            .find('.A-layout-selector')
            .on('click', 'li', event => {
                $selector.empty();
                const $target = $(event.target);
                const id = $target.data('id');
                const layout = new Layout({
                    selector: $selector,
                    layout: config[id]
                });

                akakor.api.save({
                    id,
                    layout: layout.toConfig().content
                })

                $(window).on('resize', event => {
                    layout.updateSize();
                });
            });

        akakor.api.get_default_configurations().then(data => {
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
