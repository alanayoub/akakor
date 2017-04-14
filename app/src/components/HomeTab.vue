<template>
    <div class="A-layout-selector">
        <div class="flex-row">
            <div class="flex-row-item">
                <div class="flex-column">
                    <h1>Private Layouts</h1>
                    <PrivateLayouts></PrivateLayouts>
                    <h1>Public Layouts</h1>
                    <div>pub</div>
                </div>
            </div>
            <div class="flex-row-item">
                <div class="flex-column">
                    <h1>Default Layouts</h1>
                    <DefaultLayouts></DefaultLayouts>
                </div>
            </div>
            <div class="flex-row-item">
                <div class="flex-column">
                    <h1>News</h1>
                    <div>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quis turpis ut libero pretium egestas vitae eu lorem. Donec eu nunc tincidunt, malesuada purus sed, vehicula neque. Integer sit amet erat nisl. Cras quis turpis euismod, maximus velit quis, malesuada sapien. Phasellus sodales massa vel nibh gravida, a vestibulum purus commodo. Cras pulvinar odio maximus, fringilla lorem ut, convallis ipsum. Donec eget diam placerat, consectetur metus a, auctor eros. Sed vulputate mattis pulvinar
                    </div>
                </div>
            </div>
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

<style land="scss" scoped>
    .A-layout-selector {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: 20px;
    }
    .flex-row {
        display: flex;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
    .flex-row-item {
        flex: 1 100%;
    }
    .flex-column {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .flex-column > div,
    .flex-column > ul {
        flex: 1 100%;
        overflow: auto;
        padding: 0 20px;
    }
    h1 {
        padding: 0 20px;
        height: 30px;
    }
</style>
