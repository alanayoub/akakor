import { Form } from '../../form/new';
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
        new Form();

        container.getElement().html($html);
        setTimeout(function () {

            var vm = new Vue({
                el: `.A-form-new.a-form-${id}`,
                components: {
                    'vue-form-generator': VueFormGenerator.component
                },
                data: {
                    model: {
                        id: 1,
                        title: "Example",
                        url: "https://example.com",
                        update: "Don't Update"
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
                                values: [
                                    "Don't Update",
                                    "Every 1 minute",
                                    "Every 5 minutes",
                                    "Every 30 minutes"
                                ]
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
                                        componentState: {title: event.title, url: event.url}
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
