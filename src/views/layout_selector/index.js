import { Layout } from '../layout';
// import * as config from '../../configurations/alan:c:web.json';
export class SelectLayoutView {

    constructor({$container, $tab}) {

        const template = `
            <div class="A-layout-selector">
                <h1>Select a Layout</h1>
                <div class="js-private"></div>
                <div class="js-default"></div>
            </div>
        `;
        $container.html(template);

        class PrivateConfig {
            constructor({$list_container, $layout_container}) {
                $list_container
                    .html(this.template)
                    .on('click', 'li', event => {

                        const $target = $(event.target);
                        const id = $target.data('id');

                        akakor.api.get_configuration_private(id).then(data => {
                            const val = data.val();
                            const layout = new Layout({
                                selector: $layout_container,
                                layout: JSON.parse(val.layout),
                                tab: $tab,
                                id
                            });
                        });

                    });
                this.$list_container = $list_container;
                this.render();
                this.configs = {};
            }
            render() {
                const pc = this;
                akakor.api.get_configurations('private').then(data => {
                    let html = '';
                    for (let [key, val] of Object.entries(data.val())) {
                        html += `<li data-id="${key}">${val.title}</li>`;
                        pc.configs[key] = val.config;
                    }
                    $(pc.$list_container).find('ul').html(html);
                });
            }
            get template() {
                return `
                    <div>
                        <header>Private Layouts</header>
                        <ul></ul>
                    </div>
                `;
            }
        }

        class DefaultConfig {
            constructor({$list_container, $layout_container}) {
                $list_container
                    .html(this.template)
                    .on('click', 'li', event => {
                        const $target = $(event.target);
                        const id = $target.data('id');
                        const layout = new Layout({
                            selector: $layout_container,
                            layout: this.configs[id],
                            id
                        });
                    });
                this.$list_container = $list_container;
                this.render();
                this.configs = {};
            }
            render() {
                const dc = this;
                akakor.api.get_configurations('default').then(data => {
                    let html = '';
                    for (let [key, val] of Object.entries(data.val())) {
                        const layout = JSON.stringify(val.layout);
                        html += `<li data-id="${key}">${val.layout}</li>`;
                        dc.configs[key] = val.layout;
                    }
                    $(dc.$list_container).find('ul').html(html);
                });
            }
            get template() {
                return `
                    <div>
                        <header>Default Layouts</header>
                        <ul></ul>
                    </div>
                `;
            }
        }

        new PrivateConfig({
            $list_container: $container.find('.js-private'),
            $layout_container: $container
        });

        new DefaultConfig({
            $list_container: $container.find('.js-default'),
            $layout_container: $container
        });

    }

}
