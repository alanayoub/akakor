import VueFormGenerator from "vue-form-generator/dist/vfg-core.js";
import Vue from 'vue/dist/vue';
export class Default {
    constructor({golden_layout, container, state}) {

        const id = +new Date();
        const $html = $(`
            <div class="A-form-new a-form-${id}">
                <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
            </div>
        `);

        container.getElement().html($html);

        setTimeout(() => {

            new Vue({
                el: `.A-form-new.a-form-${id}`,
                components: {
                    'vue-form-generator': VueFormGenerator.component
                },
                data: {
                    model: {
                        id: 1,
                        title: "Example",
                        url: "https://example.com",
                        update: Infinity
                    },
                    schema: {
                        fields: [
                            {
                                type: "input",
                                inputType: "text",
                                label: "Title",
                                model: "title"
                            },
                            {
                                type: "input",
                                inputType: "text",
                                label: "url",
                                model: "url"
                            },
                            {
                                type: "select",
                                label: "Update",
                                model: "update",
                                required: true,
                                values: function() {
                                  return [
                                    { id: Infinity, name: "Never" },
                                    { id: 60, name: "1 minute" },
                                    { id: 300, name: "5 minutes" },
                                    { id: 600, name: "10 minutes" },
                                    { id: 1800, name: "30 minutes" }
                                  ]
                                },
                                default: "en-US"
                            },
                            {
                                type: 'submit',
                                label: 'Submit',
                                validateBeforeSubmit: true,
                                onSubmit: function (event) {
                                    const id = +new Date();
                                    const old_component = container.parent;
                                    const new_component = {
                                        id,
                                        type: 'component',
                                        componentName: 'website',
                                        title: event.title,
                                        componentState: {
                                            title: event.title,
                                            url: event.url,
                                            update: ''
                                        }
                                    };
                                    const stack = container.parent.parent;
                                    const component = container.parent;
                                    component.setTitle(event.title);
                                    stack.replaceChild(old_component, new_component);
                                    stack.setActiveContentItem(stack.getItemsById(id)[0]);
                                }
                            }
                        ]
                    },
                    formOptions: {
                        validateAfterLoad: true,
                        validateAfterChanged: true
                    }
                }
            });

        });

    }
}
