<template>
    <div>
        <ul>
            <li v-for="layout in layouts">
                <div class="a-title">{{ layout.val.title }}</div>
                <div class="a-author">Author: {{ layout.val.author_display_name }}</div>
                <div class="a-description">
                    {{ layout.val.description }}
                    <div class="a-more" @click="more()">more</div>
                </div>
                <div class="a-download" @click="load_layout(layout)">
                    <i class="fa fa-cloud-download" aria-hidden="true"></i>
                    <span>Download</span>
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
            },
            more(layout) {
                layout.more = true;
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
        margin: 2px 0 20px 0;
        list-style: none;
        padding: 0 2px;
        cursor: default;
    }
    .a-title {
        color: #2186b2;
        font-size: 16px;
    }
    .a-author {
        font-style: italic;
        color: #999;
    }
    .a-description {
        position: relative;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 50px;
    }
    .a-more {
        position: absolute;
        top: 30px;
        right: 0;
        background: #fff;
        color: #2186b3;
        border-bottom: 1px solid;
        padding: 0;
        margin: 0;
        cursor: pointer;
    }
    .a-download {
        display: inline-block;
        background: #2186b3;
        color: #fff;
        padding: 5px 10px!important;
        cursor: pointer;
        margin: 5px;
    }
    .a-download span {
        margin-left: 5px;
    }
    .a-download:hover span {
        border-bottom: none;
    }
    li > div {
        padding: 5px;
    }
</style>
