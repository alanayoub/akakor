<template>
    <div class="A-main-tabs">
        <div class="a-tabs">
            <ul>
                <li v-for="tab in tabs" class="a-tab" :class="{'a-active': tab.isActive}">
                    <span type="text" data-toggle="tab" @click="setActive(tab)" @blur="blur(tab)" v-bind:ref="tab.id" contenteditable="true">{{ tab.name }}</span>
                </li>
                <li class="a-add-tab">
                    <span @click="openNewTab">+</span>
                </li>
            </ul>
        </div>
        <div class="a-contents">
            <div v-for="tab in tabs" class="a-content" :class="{'a-active': tab.isActive}">
                <LayoutTab v-if="tab.layout" :tab="tab"></LayoutTab>
                <HomeTab v-else :tab="tab"></HomeTab>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';
    import HomeTab from './HomeTab.vue';
    import LayoutTab from './LayoutTab.vue';
    export default {
        data() {
            return {
                tabs: [{
                    name: 'Untitled',
                    id : `default_${+new Date}`,
                    isActive: true,
                    layout: false
                }],
                activeTab: {}
            }
        },
        components: {
            HomeTab,
            LayoutTab
        },
        created() {
            window.akakor.bus.$on('DEFAULT_LAYOUT_SELECTED', layout => {
                this.tabs.forEach(tab => {
                    if (tab.isActive) {
                        tab.default = true;
                        tab.layout = layout.val.layout;
                    }
                });
            })
            window.akakor.bus.$on('PRIVATE_LAYOUT_SELECTED', layout => {
                this.tabs.forEach(tab => {
                    if (tab.isActive) {
                        tab.private = true;
                        tab.id = layout.key;
                        tab.name = layout.val.title;
                        tab.layout = layout.val.layout;
                    }
                });
            })
            window.akakor.bus.$on('NEW_LAYOUT_CREATED', (id, data) => {
                this.tabs.forEach(tab => {
                    if (tab.id === id) {
                        tab.default = false;
                        tab.private = true;
                        tab.title = data.title;
                        tab.layout = data.layout;
                        tab.id = data.id;
                    }
                });
            })
        },
        ready() {
            this.setActive(this.tabs[0]);
        },
        methods: {
            blur(tab) {
                tab.name = this.$refs[tab.id][0].textContent;
                const title = tab.name;
                const id = tab.id;
                const is_default = id.startsWith('default_');
                if (is_default) return;
                window.akakor.api.update_title({
                    title,
                    id
                });
            },
            setActive(tab) {
                tab.isActive = true;
                this.activeTab = tab;
                this.tabs.forEach(tab => {
                    if (tab.id !== this.activeTab.id) {
                        tab.isActive = false;
                    }
                });
            },
            openNewTab() {
                const newTab = {
                    name: `Untitled`,
                    id: `default_${+new Date}`,
                    isActive: true,
                    layout: false
                };
                this.tabs.push(newTab);
                this.setActive(newTab);
            },
            closeTab() {}
        }
    }
</script>

<style lang="scss" scoped>
    .a-tabs {
        background: #c1e6f6;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        height: 50px;
        > ul {
            margin: 0;
            padding: 0;
            position: absolute;
            bottom: 0;
            li {
                display: inline-block;
                list-style: none;
                margin: 0 5px 0 0;
                padding: 5px;
                cursor: default;
                &.a-tab {
                    font-family: 'Roboto', sans-serif;
                    font-size: 20px;
                    font-weight: bold;
                    line-height: 31px;
                    color: #005d95;
                    display: inline-block;
                    list-style: none;
                    margin: 0 5px 0 0;
                    padding: 5px;
                    cursor: default;
                    height: 31px;
                    padding: 10px;
                    background: none;
                    position: relative;
                    &.a-active {
                        background: #fff;
                        &:after {
                            content: '';
                            position: absolute;
                            top: -1px;
                            display: block;
                            left: 0;
                            right: 0;
                            background: #fff;
                            height: 2px;
                        }
                        &:before {
                            content: '';
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            box-shadow: 10px 0 15px -10px rgba(31, 73, 125, 0.1), -10px 0 15px -10px rgba(0, 0, 0, 0.1);
                        }
                    }
                }
                &.a-add-tab {
                    font-size: 20px;
                    line-height: 17px;
                }
            }
        }
    }
    .a-contents,
    .a-content {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .a-contents {
        top: 51px;
    }
    .a-content {
        display: none;
        &.a-active {
            display: block;
        }
    }
</style>
