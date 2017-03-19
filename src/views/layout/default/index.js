export class Default {
    constructor({golden_layout, state}) {

        const $html = $(`
            <div class="a-default" data-id="${state.id}">
                <button class="a-new-tab">New Tab</button>
                Hello, this is the default view biotches
            </div>
        `);

        golden_layout.registerComponent(state.title, function (container, state) {

            container.getElement().html($html);

            $html.find('.a-new-tab').off('click').on('click', event => {

                container.parent.parent.addChild({
                    id: 'blah',
                    type: 'component',
                    componentName: 'untitled',
                    componentState: {title: "untitled", url: ""}
                });

            });
        });

    }
}
