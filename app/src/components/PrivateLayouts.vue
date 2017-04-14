<template>
    <ul>
        <li v-for="layout in layouts">
            <div class="a-text">
                <span @click="load_layout(layout)">{{ layout.val.title }}</span>
            </div>
            <div class="a-delete">X</div>
        </li>
    </ul>
</template>

<script>
    export default {
        data() {
            const layouts = [];
            window.akakor.api.get_configurations('private').then(data => {
                for (let [key, val] of Object.entries(data.val())) {
                    layouts.push({
                        key, val
                    });
                }
            });
            return {
                layouts
            };
        },
        methods: {
            load_layout(layout) {
                window.akakor.bus.$emit('PRIVATE_LAYOUT_SELECTED', layout);
            }
        }
    }
</script>

<style scoped>
    li {
        margin: 2px 0;
        list-style: none;
        padding: 0 2px;
        cursor: default;
        height: 34px;
    }
    li:hover {
        background: #eee;
    }
    li:hover .a-delete {
        display: block;
    }
    li > div {
        padding: 5px;
    }
    .a-text {
        float: left;
    }
    .a-delete {
        display: none;
        background: #fee;
        float: right;
        width: 20px;
        text-align: center;
    }

</style>
