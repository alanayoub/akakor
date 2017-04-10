<template>
    <div class="A-main-tabs">
        <div class="a-tabs">
            <ul>
                <li v-for="tab in tabs" class="a-tab" :class="{'a-active': tab.isActive}">
                    <span data-toggle="tab" @click.stop.prevent="setActive(tab)">{{ tab.name }}</span>
                </li>
                <li class="a-add-tab">
                    <span @click="openNewTab">+</span>
                </li>
            </ul>
            <div class="a-contents">
                <div v-for="tab in tabs" class="a-content" :class="{'a-active': tab.isActive}">
                    <HomeTab :tab="tab"></HomeTab>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import HomeTab from './HomeTab.vue';
    export default {
        data() {
            return {
                tabs: [{
                    name: "tab1",
                    id : 0,
                    isActive: true
                }],
                activeTab: {}
            }
        },
        components: {
            HomeTab
        },
        ready: function () {
            this.setActive(this.tabs[0]);
        },
        methods: {
            setActive: function (tab) {
                var self = this;
                tab.isActive = true;
                this.activeTab = tab;
                this.tabs.forEach(function (tab) {
                    /* console.log("TAB => " + tab); */
                    /* console.log("activeTab id => " + self.activeTab.id); */
                    /* console.log("tab id=" + tab.id); */
                    if (tab.id !== self.activeTab.id) {
                        tab.isActive = false;
                    }
                });
            },
            openNewTab: function () {
                var newTab = {
                    name: 'tab' + (this.tabs.length + 1),
                    id: this.tabs.length,
                    isActive: true
                };
                this.tabs.push(newTab);
                this.setActive(newTab);
            },
            closeTab: function () {
                console.log("### CLOSE!");
            }
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
                    display: inline-block;
                    list-style: none;
                    margin: 0 5px 0 0;
                    padding: 5px;
                    cursor: default;
                    height: 31px;
                    padding: 10px;
                    line-height: 31px;
                    font-family: 'Roboto', sans-serif;
                    font-size: 20px;
                    font-weight: bold;
                    color: #005d95;
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
    }
</style>
