import { Layout } from '../layout';
import * as config from '../../configurations/alan:c:web.json';
export class SelectLayoutView {
    constructor(selector) {
        const $selector = $(selector);
        $selector
            .html(`
                <div>
                    Select Layout:
                    <span>Layout 1</span>
                </div>
            `)
            .on('click', 'span', event => {
                new Layout({
                    selector: $selector,
                    layout: config.layout,
                    state: config.state
                });
            });
    }
}
