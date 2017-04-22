<template>
    <div>
        <ul v-if="layouts.length > 0">
            <li v-for="layout in layouts">
                <div class="a-text" @click="load_layout(layout)">
                    <span>{{ layout.val.title }}</span>
                </div>
                <div class="a-upload" title="Upload Layout" @click="upload_dialog(layout)">
                    <i class="fa fa-cloud-upload" aria-hidden="true"></i>
                </div>
                <div class="a-delete" title="Delete Layout" @click="delete_dialog(layout)">
                    <i class="fa fa-times" aria-hidden="true"></i>
                </div>
            </li>
        </ul>
        <ul v-else>
            <li><div class="a-none">You have not created any layouts</div></li>
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
            const type = 'private';
            const callback = function get_private_configs(data) {
                const layouts = [];
                if (data.val() !== null) {
                    for (let [key, val] of Object.entries(items)) {
                        layouts.push({
                            key, val
                        });
                    }
                }
                vm.layouts = layouts;
            };
            window.akakor.api.get_configurations({type, callback});
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

<style lang="scss" scoped>
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
    .a-none {
        color: #ccc;
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
        position: absolute;
        right: 34px;
        width: 24px;
        text-align: center;
        height: 24px;
        top: 0;
        color: #fff;
        line-height: 24px;
        cursor: pointer;
        .fa {
            position: relative;
            font-size: 18px;
            line-height: 24px;
        }
    }
    .a-upload:hover {
        background: #000050;
    }
    .a-delete {
        display: none;
        width: 24px;
        text-align: center;
        height: 24px;
        position: absolute;
        top: 0;
        right: 0;
        color: #fff;
        line-height: 24px;
        cursor: pointer;
        .fa {
            position: relative;
            font-size: 18px;
            line-height: 24px;
        }
    }
    .a-delete:hover {
        background: #000050;
    }

</style>
