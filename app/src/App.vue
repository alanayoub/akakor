<template>
  <div id="app">
    <header>
        <div class="t-left">
            <div class="t-logo">Nebula</div>
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
    $fa-font-path: './lib/font-awesome/fonts';
    @import './lib/font-awesome/scss/font-awesome.scss';
    body {
        font-family: 'Lato', sans-serif;
        font-size: 14px;
        line-height: 24px;
        margin: 0;
        padding: 0;
        #app {
            background: #fff;
            position: fixed;
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
                    font-family: 'Roboto', sans-serif;
                    font-size: 16px;
                    font-weight: bold;
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
    .lm_header .lm_tab .lm_title {
        line-height: 10px;
    }
    .lm_header .lm_tab,
    .lm_content {
        background: #f1efee;
        border: none;
    }
    .lm_header .lm_tab {
        border-top-right-radius: 2px;
        &.lm_active {
            box-shadow: none;
        }
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
