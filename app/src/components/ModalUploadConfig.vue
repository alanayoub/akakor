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
    import VueFormGenerator from 'vue-form-generator/dist/vfg-core.js';
    import Modal from './Modal.vue';
    export default {
        data() {
            const vm = this;
            return {
                show: false,
                model: {
                    title: 'test',
                    description: ''
                },
                schema: {
                    fields: [
                        {
                            type: 'input',
                            inputType: 'text',
                            label: 'Title',
                            model: 'title',
                            styleClasses: 'a-title'
                        },
                        {
                            type: 'textArea',
                            inputType: 'textarea',
                            label: 'Description',
                            model: 'description',
                            placeholder: 'Description',
                            rows: 4,
                            max: 10000,
                            styleClasses: 'a-description'
                        },
                        {
                            type: 'submit',
                            buttonText: 'Cancel',
                            validateBeforeSubmit: false,
                            styleClasses: 'a-submit-cancel',
                            onSubmit(event) {
                                vm.close();
                            }
                        },
                        {
                            type: 'submit',
                            buttonText: 'Upload Copy',
                            validateBeforeSubmit: true,
                            styleClasses: 'a-submit-upload',
                            onSubmit(event) {
                                vm.upload_config(event);
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
            window.akakor.bus.$on('SHOW_UPLOAD_DIALOG', config => {
                this.config = config;
                this.model.title = config.val.title;
                this.model.description = config.val.description || '';
                this.show = true;
            });
        },
        methods: {
            close() {
                this.show = false;
            },
            upload_config(event) {
                const vm = this;
                const config = Object.assign({}, vm.config.val, {
                    title: event.title,
                    description: event.description
                });
                console.log(config);
                window.akakor.api.create_public_copy({config});
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
