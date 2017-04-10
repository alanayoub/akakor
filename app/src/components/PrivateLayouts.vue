<template>
    <ul>
        <li v-for="layout in layouts">
            <span v-on:click="load_layout(layout)">{{ layout.val.title }}</span>
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
                layouts,
            };
        },
        methods: {
            load_layout(layout) {
                window.akakor.bus.$emit('LAYOUT_SELECTED', layout);
            }
        }
    }
</script>

<style scoped>
</style>
