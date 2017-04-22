<template>
  <div id="app">
    <header>
        <div class="t-left">
            <div class="t-logo">
                <i class="fa fa-rocket" aria-hidden="true"></i>
                <span>Nebula</span>
            </div>
        </div>
        <div class="t-right">
            <div class="t-user">
                <img :src="photo" alt="User Photo" />
            </div>
        </div>
    </header>
    <section>
        <Tabs></Tabs>
    </section>
    <footer></footer>
  </div>
</template>

<script>
    import Tabs from './components/Tabs.vue';
    export default {
        data() {
            return {
                email: '',
                photo: ''
            }
        },
        created() {
            const vm = this;
            const api = window.akakor.api;
            vm.photo = api.current_user.photoURL;
            vm.email = api.current_user.email;
        },
        components: {
            Tabs
        }
    }

</script>

<style lang="scss">
    $fa-font-path: '/lib/font-awesome/fonts';
    @import './lib/font-awesome/scss/font-awesome.scss';
    body {
        font-family: 'Lato', sans-serif;
        font-size: 14px;
        line-height: 24px;
        margin: 0;
        padding: 0;
        overflow: hidden;
        #app {
            background: #fff;
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 1000;
            > header {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                background: #000050;
                border-bottom: 1px solid #fff;
                > div {
                    height: 29px;
                    line-height: 29px;
                }
                .t-left {
                    width: 500px;
                    background: linear-gradient(to right, #2187b3 0%,#000050 100%);
                    color: #fff;
                    float: left;
                    padding: 0 5px;
                }
                .t-right {
                    float: right;
                    padding: 0 5px;
                }
                .t-logo {
                    .fa {
                        font-size: 16px;
                        margin-right: 5px;
                    }
                    span {
                        font-family: 'Roboto', sans-serif;
                        font-size: 16px;
                        font-weight: bold;
                    }
                }
                .t-user {
                    color: #fff;
                }
            }
            > section {
                position: absolute;
                top: 30px;
                left: 0;
                right: 0;
                bottom: 0;
            }
            > footer {
                display: none;
            }
        }
    }

    h1, h2, h3 {
        line-height: 1.4;
        font-weight: 300;
        font-family: 'Roboto', sans-serif;
    }

    webview, iframe {
        background: #fff;
        display: inline-flex;
        border: none;
        width: 100%;
        height: 100%;
    }

    .A-form-new {
        width: 100%;
        height: 100%;
        .a-container {
            padding: 20px;
        }
        fieldset {
            margin: 20px auto;
            max-width: 500px;
            border: none;
            color: #fff;
        }
        fieldset.vue-form-generator .form-group {
            max-width: 500px!important;
            color: #333;
            margin: auto;
        }
    }

    //
    // Header
    //
    .t-user img {
        width: 40px;
        height: 40px;
        position: relative;
        top: 14px;
        border-radius: 2px;
        z-index: 23;
        border: 2px solid #fff;
        right: 4px;
    }



    //
    // Golden Layout
    //
    .lm_goldenlayout {
        background: #fff;
    }
    .lm_header .lm_tab,
    .lm_content {
        background: #f1efee;
        border: none;
    }
    .lm_header {
        height: 24px!important;
        .lm_tab {
            border-top-right-radius: 2px;
            height: 17px;
            font-size: 14px;
            &.lm_active {
                box-shadow: none;
                background: #00ce82;
                color: #fff;
                padding-bottom: 6px;
            }
            .lm_title {
                line-height: 10px;
                max-width: 140px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .lm_close_tab {
                background: none;
                display: inline-block;
                font: normal normal normal 14px/1 FontAwesome;
                font-size: inherit;
                text-rendering: auto;
                -webkit-font-smoothing: antialiased;
                &:before {
                    content: "\f00d"
                }
            }
        }

        .lm_controls {
            top: 2px;
            li {
                line-height: 18px;
            }
            .a-add-tab {
                width: 60px;
            }
            .a-divider {
                width: 0;
                color: #c1e6f6;
                border-left: 3px solid #c1e6f6;
                margin: 0 15px;
            }
        }
    }

    .lm_splitter.lm_horizontal .lm_drag_handle {
        position: absolute;
        width: 11px;
        left: -3px;
        cursor: e-resize;
        height: 100%;
    }

    //
    // Vue form generator
    //
    .vue-form-generator {
        border: none;
        margin: 0;
        padding: 0;
    }
</style>
