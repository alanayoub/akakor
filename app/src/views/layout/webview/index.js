import $ from 'jquery';
export class Webview {

    constructor({golden_layout, container, state}) {

        const vm = this;
        vm.container = container;
        vm.$html = $('#webview-template').clone().removeAttr('id').show();
        vm.$webview = vm.$html.find('webview');
        vm.$webview
            .attr('src', state.url)
            .on('did-start-loading', event => {
                console.log('did start loading');
            })
            .on('did-finish-load', () => {
                console.log('did finish load');
                vm.onload();
                // let styles;
                // if (state.selectors && state.selectors.length) {
                //     styles = reset_css();
                //     state.selectors.forEach(sel => {
                //         styles += css(sel);
                //     });
                // }
                // if (state.css) styles += state.css;
                // console.log(styles);
                // console.log(vm);
                // $webview.insertCSS(styles);
            })
            .on('did-stop-loading', () => {
                console.log('did stop loading');
            })
            .on('dom-ready', event => {

                console.log('dom ready');
                // vm.container.getState();

                const title = event.target.getTitle();
                vm.setTitle(title);

            });

        vm.container.getElement().html(vm.$html);

        // window.onresize = dolayout;
        vm.isloading = false;

    }

    setTitle(title) {

        const vm = this;
        // vm.container.getState();
        vm.container.setTitle(title);
        vm.container.extendState({
            title
        });

    }

    onload() {

        const vm = this;
        const webview = vm.$webview[0];
        const html = vm.$html[0];

        const version = navigator.appVersion.substr(navigator.appVersion.lastIndexOf('Chrome/') + 7);
        const match = /([0-9]*)\.([0-9]*)\.([0-9]*)\.([0-9]*)/.exec(version);
        const majorVersion = parseInt(match[1]);
        const buildVersion = parseInt(match[3]);

        vm.dolayout();
        webview.focus();

        html.querySelector('#back').onclick = () => {
            webview.goBack();
        };

        html.querySelector('#forward').onclick = () => {
            webview.goForward();
        };

        html.querySelector('#home').onclick = () => {
            vm.navigateTo(akakor.HOME_URL);
        };

        html.querySelector('#reload').onclick = () => {
            if (vm.isloading) {
                webview.stop();
            } else {
                webview.reload();
            }
        };

        html.querySelector('#reload').addEventListener('webkitAnimationIteration', () => {
            if (!isLoading) {
                html.classList.remove('loading');
            }
        });

        html.querySelector('#location-form').onsubmit = event => {
          event.preventDefault();
          vm.navigateTo(html.querySelector('#location').value);
        };

        webview.addEventListener('crashed', event => vm.handleexit(event));
        webview.addEventListener('did-start-loading', event => vm.handleloadstart(event));
        webview.addEventListener('did-stop-loading', event => vm.handleloadstop(event));
        webview.addEventListener('did-fail-load', event => vm.handleloadabort(event));
        webview.addEventListener('did-get-redirect-request', event => vm.handleloadredirect(event));
        webview.addEventListener('load-commit', event => vm.handleloadcommit(event));
        webview.addEventListener('new-window', event => vm.handleNewWindow(event));

        // test for the presence of the experimental <webview> zoom and find apis.
        if (typeof(webview.setZoomFactor) == 'function' && typeof(webview.findInPage) == 'function') {
          let findmatchcase = false;

          html.querySelector('#zoom').onclick = () => {
              if (html.querySelector('#zoom-box').style.display == '-webkit-flex') {
                  vm.closeZoomBox();
              } else {
                  vm.openZoomBox();
              }
          };

          html.querySelector('#zoom-form').onsubmit = event => {
            event.preventDefault();
            const zoomtext = html.querySelector('#zoom-text');
            let zoomfactor = Number(zoomtext.value);
            if (zoomfactor > 5) {
                zoomtext.value = "5";
                zoomfactor = 5;
            } else if (zoomfactor < 0.25) {
                zoomtext.value = "0.25";
                zoomfactor = 0.25;
            }
            webview.setZoomFactor(zoomfactor);
          }

          html.querySelector('#zoom-in').onclick = event => {
              event.preventDefault();
              vm.increasezoom();
          }

          html.querySelector('#zoom-out').onclick = event => {
              event.preventDefault();
              vm.decreasezoom();
          }

          html.querySelector('#find').onclick = () => {
              if (html.querySelector('#find-box').style.display == 'block') {
                  html.querySelector('webview').stopFindInPage('clearSelection');
                  vm.closeFindBox();
              } else {
                  vm.openFindBox();
              }
          };

          html.querySelector('#find-text').oninput = event => {
              webview.findInPage(html.querySelector('#find-text').value, {matchcase: findmatchcase});
          }

          html.querySelector('#find-text').onkeydown = event => {
              if (event.ctrlkey && event.keycode == 13) {
                  event.preventDefault();
                  webview.stopFindInPage('activate');
                  vm.closeFindBox();
              }
          }

          html.querySelector('#match-case').onclick = event => {
              event.preventDefault();
              findmatchcase = !findmatchcase;
              const matchcase = html.querySelector('#match-case');
              if (findmatchcase) {
                  matchcase.style.color = 'blue';
                  matchcase.style['font-weight'] = 'bold';
              } else {
                  matchcase.style.color = 'black';
                  matchcase.style['font-weight'] = '';
              }
              webview.findInPage(html.querySelector('#find-text').value, {matchcase: findmatchcase});
          }

          html.querySelector('#find-backward').onclick = event => {
              event.preventDefault();
              webview.findInPage(html.querySelector('#find-text').value, {backward: true, matchcase: findmatchcase});
          }

          html.querySelector('#find-form').onsubmit = event => {
              event.preventDefault();
              webview.findInPage(html.querySelector('#find-text').value, {matchcase: findmatchcase});
          }

          webview.addEventListener('findupdate', vm.handlefindupdate);
          html.addEventListener('keydown', vm.handlekeydown);
        } else {
          const zoom = html.querySelector('#zoom');
          const find = html.querySelector('#find');
          zoom.style.visibility = 'hidden';
          zoom.style.position = 'absolute';
          find.style.visibility = 'hidden';
          find.style.position = 'absolute';
        }
    }

    dolayout() {

        const vm = this;
        const webview = vm.$webview[0];
        const html = vm.$html[0];
        const controls = html.querySelector('#controls');
        const sadwebview = html.querySelector('#sad-webview');
        const windowwidth = html.clientwidth;
        const windowheight = html.clientheight;
        const webviewwidth = windowwidth;
        const webviewheight = windowheight - controls.offsetheight;

        webview.style.width = webviewwidth + 'px';
        webview.style.height = webviewheight + 'px';
        sadwebview.style.width = webviewwidth + 'px';
        sadwebview.style.height = webviewheight * 2/3 + 'px';
        sadwebview.style.paddingtop = webviewheight/3 + 'px';

    }

    navigateTo(url) {

        const vm = this;
        const webview = vm.$webview[0];
        vm.resetexitedstate();
        webview.focus();
        webview.src = url;

    }

    handleNewWindow(event) {
        console.log('open new window', event);
    }

    handleexit(event) {

        const html = this.$html[0];
        html.classList.add('exited');
        if (event.type == 'abnormal') {
            html.classList.add('crashed');
        } else if (event.type == 'killed') {
            html.classList.add('killed');
        }
    }

    resetexitedstate() {

        const html = this.$html[0];
        html.classList.remove('exited');
        html.classList.remove('crashed');
        html.classList.remove('killed');

    }

    handlefindupdate(event) {

        const html = this.$html[0];
        const findresults = html.querySelector('#find-results');
        if (event.searchtext === '') {
            findresults.innertext = '';
        } else {
            findresults.innertext = `${event.activematchordinal} of ${event.numberofmatches}`;
        }

        // ensure that the find box does not obscure the active match.
        if (event.finalupdate && !event.canceled) {
            const findbox = html.querySelector('#find-box');
            findbox.style.left = '';
            findbox.style.opacity = '';
            const findboxrect = findbox.getboundingclientrect();
            if (vm.findboxobscuresactivematch(findboxrect, event.selectionrect)) {
                // move the find box out of the way if there is room on the screen, or
                // make it semi-transparent otherwise.
                const potentialleft = event.selectionrect.left - findboxrect.width - 10;
                if (potentialleft >= 5) {
                    findbox.style.left = potentialleft + 'px';
                } else {
                    findbox.style.opacity = '0.5';
                }
            }
        }
    }

    findboxobscuresactivematch(findboxrect, matchrect) {
        return findboxrect.left < matchrect.left + matchrect.width &&
            findboxrect.right > matchrect.left &&
            findboxrect.top < matchrect.top + matchrect.height &&
            findboxrect.bottom > matchrect.top;
    }

    handlekeydown(event) {
        if (event.ctrlkey) {
            switch (event.keycode) {
                // ctrl+f.
                case 70:
                    event.preventDefault();
                    vm.openFindBox();
                    break;

                // ctrl++.
                case 107:
                case 187:
                    event.preventDefault();
                    vm.increasezoom();
                    break;

                // ctrl+-.
                case 109:
                case 189:
                    event.preventDefault();
                    vm.decreasezoom();
            }
        }
    }

    handleloadcommit(event) {

        console.log('load commit');
        const vm = this;
        const webview = vm.$webview[0];
        const html = this.$html[0];
        vm.resetexitedstate();

        if (!event.isMainFrame) return;

        html.querySelector('#location').value = event.url;
        html.querySelector('#back').disabled = !webview.canGoBack();
        html.querySelector('#forward').disabled = !webview.canGoForward();
        vm.closeBoxes();

    }

    handleloadstart(event) {

        const vm = this;
        const html = vm.$html[0];
        html.classList.add('loading');
        vm.isloading = true;
        vm.resetexitedstate();

        if (!event.isMainFrame) return;

        html.querySelector('#location').value = event.url;

    }

    handleloadstop(event) {

        // we don't remove the loading class immediately, instead we let the animation
        // finish, so that the spinner doesn't jerkily reset back to the 0 position.
        this.isloading = false;

    }

    handleloadabort(event) {

        console.log('handleloadabort');
        console.log('loadabort');
        console.log('  url: ' + event.url);
        console.log('  isMainFrame: ' + event.isMainFrame);
        console.log('  type: ' + event.type);

    }

    handleloadredirect(event) {

        const vm =  this;
        const html = vm.$html[0];
        vm.resetexitedstate();

        if (!event.isMainFrame) return;

        html.querySelector('#location').value = event.newurl;

    }

    getnextpresetzoom(zoomfactor) {

        const preset = [0.25, 0.33, 0.5, 0.67, 0.75, 0.9, 1, 1.1, 1.25, 1.5, 1.75, 2, 2.5, 3, 4, 5];
        let low = 0;
        let high = preset.length - 1;
        let mid;
        while (high - low > 1) {
            mid = Math.floor((high + low)/2);
            if (preset[mid] < zoomfactor) {
                low = mid;
            } else if (preset[mid] > zoomfactor) {
                high = mid;
            } else {
                return {low: preset[mid - 1], high: preset[mid + 1]};
            }
        }
        return {low: preset[low], high: preset[high]};

    }

    increasezoom() {

        const vm = this;
        const webview = vm.$webview[0];
        const html = this.$html[0];

        webview.getZoomFactor(zoomfactor => {
            const nexthigherzoom = vm.getnextpresetzoom(zoomfactor).high;
            webview.setZoomFactor(nexthigherzoom);
            html.querySelector('#zoom-text').value = nexthigherzoom.toString();
        });

    }

    decreasezoom() {

      const vm = this;
      const webview = vm.$webview[0];
      const html = this.$html[0];

      webview.getZoomFactor(zoomfactor => {
        const nextlowerzoom = vm.getnextpresetzoom(zoomfactor).low;
        webview.setZoomFactor(nextlowerzoom);
        html.querySelector('#zoom-text').value = nextlowerzoom.toString();
      });

    }

    openZoomBox() {

      const vm = this;
      const webview = vm.$webview[0];
      const html = this.$html[0];

      webview.getZoomFactor(function(zoomfactor) {
        const zoomtext = html.querySelector('#zoom-text');
        zoomtext.value = Number(zoomfactor.toFixed(6)).toString();
        html.querySelector('#zoom-box').style.display = '-webkit-flex';
        zoomtext.select();
      });

    }

    closeZoomBox() {

      const html = this.$html[0];
      html.querySelector('#zoom-box').style.display = 'none';

    }

    openFindBox() {

      const html = this.$html[0];
      html.querySelector('#find-box').style.display = 'block';
      html.querySelector('#find-text').select();

    }

    closeFindBox() {

      const html = this.$html[0];
      const findbox = html.querySelector('#find-box');
      findbox.style.display = 'none';
      findbox.style.left = '';
      findbox.style.opacity = '';
      html.querySelector('#find-results').innertext= '';

    }

    closeBoxes() {

        const vm = this;
        vm.closeZoomBox();
        vm.closeFindBox();

    }

}
