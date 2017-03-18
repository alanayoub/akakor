export class Iframe {
    constructor({golden_layout, state}) {

        const html = `
            <iframe src="${state.url}" width="100%" height="100%"></iframe>
        `;

        golden_layout.registerComponent(state.title, function (container, state) {
            container.getElement().html(html);
        });

    }
}
