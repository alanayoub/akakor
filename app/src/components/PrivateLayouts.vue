<template>
    <ul>
        <li v-for="layout in layouts">
            <span @click.stop.prevent="load_layout()">{{ layout.val.title }}</span>
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
        }
    }
</script>

<style scoped>
</style>
