export class MainTabs {
    constructor({selector}) {
        const $selector = $(selector);
        $selector.html(this.template);
        this.$tabs_container = $selector.find('.A-main-tabs .a-tabs');
        this.$contents_container = $selector.find('.A-main-tabs .a-contents');
        this.$tabs_container.on('click', '.a-tab', event => {
            const $target = $(event.target);
            const id = $target.closest('[data-id]').data('id');
            this.show_tab(id);
        });
        $selector.find('.a-add-tab').on('click', event => {
            this.new_default_tab();
        });
    }
    new_tab(title, cb) {
        const id = +new Date();
        this.$tabs_container.append(this.template_tabs(id, title));
        this.$contents_container.append(this.template_content(id));
        this.show_tab(id);
        const container = this.$contents_container.find(`[data-id=${id}]`);
        cb(container);
    }
    new_default_tab() {
        this.new_tab('Select a Layout', $el => {
            $el.html('<div>Layouts...</div>');
        });
    }
    show_tab(id) {
        this.$tabs_container.find('.a-tab').removeClass('a-active');
        this.$tabs_container.find(`[data-id="${id}"]`).addClass('a-active');
        this.$contents_container.find('.a-content').hide();
        this.$contents_container.find(`[data-id="${id}"]`).show();
    }
    get template() {
        return `
            <div class="A-main-tabs">
                <ul class="a-tabs"></ul>
                <div class="a-add-tab">+</div>
                <div class="a-contents"></div>
            </div>
        `;
    }
    template_tabs(id, title) {
        return `
            <li class="a-tab" data-id="${id}">${title}</li>
        `;
    }
    template_content(id) {
        return `
            <div class="a-content" data-id="${id}"></div>
        `;
    }
}
