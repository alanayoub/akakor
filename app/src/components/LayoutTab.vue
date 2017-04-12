<template>
    <div class="a-container">
        Loading...
    </div>
</template>

<script>
    import { Layout } from '../views/layout';
    export default {
        data() {
            return {};
        },
        props: ['tab'],
        mounted() {
            const vm = this;
            const $container = $(this.$el);

            const id = this.tab.id;

            akakor.api.get_configuration_private(id).then(data => {
                $container.empty();
                const val = data.val();
                const layout = new Layout({
                    selector: $container,
                    layout: JSON.parse(val.layout),
                    title: val.title,
                    tab: 'hmm, fix this',
                    id
                });
            });

        }
    }
</script>

<style scoped>
    .a-container {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
</style>
