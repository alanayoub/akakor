<template>
    <div>
        <ul>
            <li v-for="layout in layouts">
                <div class="a-text" @click="load_layout(layout)">
                    <span>{{ layout.val.title }}</span>
                </div>
                <div class="a-upload" title="Upload Layout" @click="upload_dialog(layout)">U</div>
                <div class="a-delete" title="Delete Layout" @click="delete_dialog(layout)">X</div>
            </li>
        </ul>
        <ModalUploadConfig></ModalUploadConfig>
        <ModalDeleteConfig></ModalDeleteConfig>
    </div>
</template>

<script>
    import ModalUploadConfig from './ModalUploadConfig.vue';
    import ModalDeleteConfig from './ModalDeleteConfig.vue';
    export default {
        data() {
            const layouts = [];
            return {
                layouts
            };
        },
        components: {
            ModalUploadConfig,
            ModalDeleteConfig
        },
        created() {
            const vm = this;
            window.akakor.api.get_configurations('private', function get_private_configs(data) {
                const layouts = [];
                for (let [key, val] of Object.entries(data.val())) {
                    layouts.push({
                        key, val
                    });
                }
                vm.layouts = layouts;
            });
        },
        methods: {
            delete_dialog(layout) {
                window.akakor.bus.$emit('SHOW_DELETE_DIALOG', layout);
            },
            upload_dialog(layout) {
                window.akakor.bus.$emit('SHOW_UPLOAD_DIALOG', layout);
            },
            load_layout(layout) {
                window.akakor.bus.$emit('PRIVATE_LAYOUT_SELECTED', layout);
            }
        }
    }
</script>

<style scoped>
    ul {
        margin: 0;
        padding: 0;
    }
    li {
        position: relative;
        margin: 2px 0;
        list-style: none;
        padding: 0 2px;
        cursor: default;
        height: 34px;
    }
    li:hover {
        background: #2186b3;
        color: #fff;
    }
    li:hover .a-upload,
    li:hover .a-delete {
        display: block;
    }
    li:hover span {
        border-bottom: none;
    }
    li > div {
        padding: 5px;
    }
    .a-text {
        position: absolute;
        left: 0;
        right: 30px;
    }
    .a-text span {
        border-bottom: 1px solid;
    }
    .a-upload {
        display: none;
        background: #000050;
        float: right;
        width: 10px;
        text-align: center;
        height: 10px;
        position: relative;
        top: 7px;
        right: 5px;
        color: #fff;
        line-height: 10px;
        border-radius: 4px;
        cursor: pointer;
    }
    .a-upload:hover {
        background: #fff;
    }
    .a-delete {
        display: none;
        background: #000050;
        float: right;
        width: 10px;
        text-align: center;
        height: 10px;
        position: relative;
        top: 7px;
        right: 5px;
        color: #fff;
        line-height: 10px;
        border-radius: 4px;
        cursor: pointer;
    }
    .a-delete:hover {
        color: #c50c0c;
        background: #fff;
    }

</style>
