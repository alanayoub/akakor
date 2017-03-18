export class Default {
    constructor({golden_layout, state}) {

        const $html = $(`
            <div class="a-default">
                Hello, this is the default view biotches
            </div>
        `);

        $html.on('click', event => {
            console.log('akakorrrrr', golden_layout);
        });

        golden_layout.registerComponent(state.title, function (container, state) {
            container.getElement().html($html);
        });

    }
}
