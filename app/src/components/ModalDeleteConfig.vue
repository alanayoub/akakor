<template>
    <Modal :show="show" :on-close="close">
        <div class="modal-header">
            <h3>Delete Layout</h3>
        </div>
        <div class="modal-body">
            Are you sure you want to delete this layout?
        </div>
        <div class="modal-footer text-right">
            <button @click="delete_config()">Yes</button>
            <button @click="close()">No</button>
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
            window.akakor.bus.$on('SHOW_DELETE_DIALOG', layout => {
                this.layout = layout;
                this.show = true;
            });
        },
        methods: {
            close() {
                this.show = false;
            },
            delete_config() {
                window.akakor.api.delete_configuration({id: this.layout.key});
                this.close();
            }
        }
    }
</script>

<style scoped>
</style>
