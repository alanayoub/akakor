<template>
    <Modal :show="show" :on-close="close">
        <div class="modal-header">
            <h3>Make a public copy</h3>
        </div>
        <div class="modal-body">
            <p>Making a public copy of a layout allows anyone to download and use a version of this layout.</p>
        </div>
        <div class="modal-footer text-right">
            <button @click="upload_config()">Upload Copy</button>
            <button @click="close()">Cancel</button>
        </div>
    </Modal>
</template>

<script>
    import Modal from './Modal.vue';
    export default {
        data() {
            return {
                show: false
            };
        },
        components: {
            Modal
        },
        created(layout) {
            window.akakor.bus.$on('SHOW_UPLOAD_DIALOG', layout => {
                this.layout = layout;
                this.show = true;
            });
        },
        methods: {
            close() {
                this.show = false;
            },
            upload_config() {
                // window.akakor.api.delete_configuration({id: this.layout.key});
                this.close();
            }
        }
    }
</script>

<style scoped>
</style>
