export class Iframe {
    constructor({golden_layout, container, state}) {

        const html = `
            <iframe src="${state.url}" width="100%" height="100%"></iframe>
        `;

        container.getElement().html(html);

    }
}
