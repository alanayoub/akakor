<template>
    <div class="A-main-tabs">
        <div class="a-tabs">
            <ul>
                <li v-for="tab in tabs" class="a-tab" :class="{'a-active': tab.isActive}">
                    <span type="text" data-toggle="tab" @click="setActive(tab)" @blur="blur(tab)" v-bind:ref="tab.id" contenteditable="true">{{ tab.name }}</span>
                </li>
                <li class="a-add-tab" :class="{'a-active': newTabEnabled}">
                    <span @click="openNewTab">
                        <i class="fa fa-plus-circle" aria-hidden="true"></i>
                    </span>
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
                    id : `home_${+new Date}`,
                    home: true,
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
                        tab.home = false;
                        tab.layout = layout.val.layout;
                    }
                });
            })
            window.akakor.bus.$on('PRIVATE_LAYOUT_SELECTED', layout => {
                this.tabs.forEach(tab => {
                    if (tab.isActive) {
                        tab.private = true;
                        tab.id = layout.key;
                        tab.home = false;
                        tab.name = layout.val.title;
                        tab.layout = layout.val.layout;
                    }
                });
            })
            window.akakor.bus.$on('PUBLIC_LAYOUT_SELECTED', layout => {
                const id = 0; // dummy id that doesnt exist
                const config = {
                    layout: layout.val.layout,
                    title: layout.val.title,
                    id
                }
                window.akakor.api.save(config).then(new_id => {
                    window.akakor.bus.$emit('NEW_LAYOUT_CREATED', id, Object.assign(config, {
                        id: new_id
                    }));
                });
            })
            window.akakor.bus.$on('NEW_LAYOUT_CREATED', (id, data) => {
                this.tabs.forEach(tab => {
                    if (tab.id === id) {
                        tab.default = false;
                        tab.private = true;
                        tab.home = false;
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
        computed: {
            newTabEnabled() {
                const lastIsActive = this.tabs.slice(-1)[0].isActive;
                const currentIsHome = this.tabs[0].home;
                const homeExists = this.tabs.filter(tab => tab.home).length;
                return !homeExists || !(lastIsActive || currentIsHome);
            },
        },
        methods: {
            blur(tab) {
                tab.name = this.$refs[tab.id][0].textContent;
                const title = tab.name;
                const id = tab.id;
                const is_home = id.startsWith('home_');
                if (is_home) return;
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
                this.newTabEnabled;
            },
            openNewTab() {
                const homeTab = this.tabs.filter(tab => tab.home)[0]
                if (homeTab) {
                    this.setActive(homeTab);
                }
                else {
                    const newTab = {
                        name: `Untitled`,
                        id: `home_${+new Date}`,
                        home: true,
                        isActive: true,
                        layout: false
                    };
                    this.tabs.push(newTab);
                    this.setActive(newTab);
                }
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
                padding: 0;
                cursor: default;
                &.a-tab {
                    font-family: 'Roboto', sans-serif;
                    font-size: 20px;
                    font-weight: bold;
                    color: #005d95;
                    display: inline-block;
                    list-style: none;
                    margin: 0 5px 0 0;
                    cursor: default;
                    background: none;
                    position: relative;
                    display: inline-block;
                    float: left;
                    span {
                        padding: 13px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        max-width: 150px;
                        display: inline-block;
                        float: left;
                        position: relative;
                    }
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
                    top: 13px;
                    position: relative;
                    left: 4px;
                    &.a-active {
                        .fa {
                            color: #2186b3;
                        }
                    }
                    .fa {
                        font-size: 20px;
                        color: #ccc;
                        border: 1px solid #fff;
                        border-radius: 12px;
                        background: #fff;
                    }
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
        top: 50px;
    }
    .a-content {
        display: none;
        &.a-active {
            display: block;
        }
    }
</style>
