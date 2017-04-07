import { SelectLayoutView } from '../layout_selector';
export class MainTabs {

    constructor({selector}) {
        const $selector = $(selector);
        $selector.html(this.template);
        this.$tabs_container = $selector.find('.A-main-tabs .a-tabs ul');
        this.$contents_container = $selector.find('.A-main-tabs .a-contents');
        this.$tabs_container.on('click', '.a-tab', event => {
            const $target = $(event.target);
            const id = $target.closest('[data-id]').data('id');
            this.show_tab(id);
        });
        $selector.on('click', '.a-add-tab', event => {
            this.new_default_tab();
        });
        $selector.on('blur', '[contenteditable]', event => {
            event.stopPropagation();
            const title = event.target.textContent;
            const id = $(event.target).data('id');
            const is_default = id.startsWith('default_');
            if (is_default) return;
            akakor.api.update_title({
                title,
                id
            });
        });
        this.new_default_tab();
    }

    new_tab(title, cb) {
        const id = `default_${String(Math.random()).substring(2)}`;
        const $new_tab = $(this.template_tabs(id, title));
        const $add_tab = this.$tabs_container.find('.a-add-tab');
        $new_tab.insertBefore($add_tab);
        this.$contents_container.append(this.template_content(id));
        this.show_tab(id);
        const $container = this.$contents_container.find(`[data-id=${id}]`);
        const $tab = this.$tabs_container.find(`[data-id=${id}]`);
        cb($container, $tab);
    }

    new_default_tab() {
        this.new_tab('Untitled Layout', ($container, $tab) => {
            new SelectLayoutView({$container, $tab});
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
                <div class="a-tabs">
                    <ul>
                        <li class="a-add-tab">+</li>
                    </ul>
                </div>
                <div class="a-contents"></div>
            </div>
        `;
    }

    template_tabs(id, title) {
        return `
            <li class="a-tab" data-id="${id}" contenteditable="true">${title}</li>
        `;
    }

    template_content(id) {
        return `
            <div class="a-content" data-id="${id}"></div>
        `;
    }

}
