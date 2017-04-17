<template>
    <div>
        <ul>
            <li v-for="layout in layouts">
                <div class="a-text" @click="load_layout(layout)">
                    <span>{{ layout.val.title }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import ModalDeleteConfig from './ModalDeleteConfig.vue';
    export default {
        data() {
            const layouts = [];
            return {
                layouts
            };
        },
        created() {
            const vm = this;
            const type = 'public';
            const token = '';
            const callback = function get_public_configs(data) {
                const layouts = [];
                for (let [key, val] of Object.entries(data.val())) {
                    layouts.push({
                        key, val
                    });
                }
                vm.layouts = layouts;
            };
            window.akakor.api.get_configurations({type, token, callback});
        },
        methods: {
            load_layout(layout) {
                window.akakor.bus.$emit('PUBLIC_LAYOUT_SELECTED', layout);
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
