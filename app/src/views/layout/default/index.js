import VueFormGenerator from "vue-form-generator/dist/vfg-core.js";
import Vue from 'vue/dist/vue';
export class Default {

    constructor({golden_layout, container, state}) {

        const id = +new Date();
        const $html = $(`
            <div class="A-form-new a-form-${id}">
                <div class="a-container">
                    <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
                </div>
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
                        update: 0
                    },
                    schema: {
                        fields: [
                            {
                                type: "input",
                                inputType: "text",
                                label: "Title",
                                model: "title",
                                required: true,
                                validator: VueFormGenerator.validators.string
                            },
                            {
                                type: "input",
                                inputType: "text",
                                label: "url",
                                model: "url",
                                required: true,
                                validator: VueFormGenerator.validators.string
                            },
                            {
                                type: "input",
                                inputType: "text",
                                label: "Reload every x seconds",
                                hint: "0 = don't reload",
                                maxlength: 10,
                                model: "update",
                                required: true,
                                visible: true,
                                validator: VueFormGenerator.validators.number
                            },
                            {
                                type: 'submit',
                                buttonText: 'Submit',
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
                                            update: event.update
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
