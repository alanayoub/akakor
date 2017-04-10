<template>
    <div class="A-layout-selector">
        <h1>Select a Layout</h1>
        <div>
            <header>Private Layouts</header>
            <PrivateLayouts></PrivateLayouts>
        </div>
        <div>
            <header>Default Layouts</header>
            <DefaultLayouts></DefaultLayouts>
        </div>
    </div>
</template>

<script>
    import PrivateLayouts from './PrivateLayouts.vue';
    import DefaultLayouts from './DefaultLayouts.vue';
    export default {
        data() {
            return {};
        },
        components: {
            PrivateLayouts,
            DefaultLayouts
        }
    }
</script>

<style scoped>
</style>
