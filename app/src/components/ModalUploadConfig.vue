<template>
    <Modal :show="show" :on-close="close" class="A-upload-dialog">
        <div class="modal-header">
            <h3>Make a public copy</h3>
        </div>
        <div class="modal-body">
            <p>Making a public copy of a layout allows anyone to download and use a version of this layout.</p>
            <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
        </div>
        <div class="modal-footer text-right"></div>
    </Modal>
</template>

<script>
    import VueFormGenerator from "vue-form-generator/dist/vfg-core.js";
    import Modal from './Modal.vue';
    export default {
        data() {
            const vm = this;
            return {
                show: false,
                model: {
                    id: 1,
                    title: "Example",
                    description: "https://example.com",
                    update: Infinity
                },
                schema: {
                    fields: [
                        {
                            type: "input",
                            inputType: "text",
                            label: "Title",
                            model: "title",
                            styleClasses: "a-title"
                        },
                        {
                            type: "input",
                            inputType: "textarea",
                            label: "Description",
                            model: "description",
                            placeholder: "Description",
                            rows: 4,
                            max: 10000,
                            styleClasses: "a-description"
                        },
                        {
                            type: 'submit',
                            buttonText: 'Cancel',
                            validateBeforeSubmit: false,
                            styleClasses: "a-submit-cancel",
                            onSubmit(event) {
                                vm.close();
                            }
                        },
                        {
                            type: 'submit',
                            buttonText: 'Upload Copy',
                            validateBeforeSubmit: true,
                            styleClasses: "a-submit-upload",
                            onSubmit(event) {
                                vm.upload_config();
                            }
                        },
                    ]
                },
                formOptions: {
                    validateAfterLoad: true,
                    validateAfterChanged: true
                }
            };
        },
        components: {
            Modal,
            'vue-form-generator': VueFormGenerator.component
        },
        created(layout) {
            window.akakor.bus.$on('SHOW_UPLOAD_DIALOG', layout => {
                this.layout = layout;
                this.show = true;
            });
        },
        methods: {
            close() {
                console.log('close');
                this.show = false;
            },
            upload_config() {
                console.log('upload config');
                // window.akakor.api.delete_configuration({id: this.layout.key});
                this.close();
            }
        }
    }
</script>

<style scoped>
</style>

<style>
    .A-upload-dialog .form-group.a-submit-upload.field-submit,
    .A-upload-dialog .form-group.a-submit-upload.field-submit .field-wrap {
        display: inline-block;
        width: auto;
        float: right;
        margin-right: 5px;
    }
    .A-upload-dialog .form-group.a-submit-cancel.field-submit,
    .A-upload-dialog .form-group.a-submit-cancel.field-submit .field-wrap {
        display: inline-block;
        width: auto;
        float: right;
    }
</style>
