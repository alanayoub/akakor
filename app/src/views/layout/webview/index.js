import $ from 'jquery';
export class Webview {
    constructor({golden_layout, container, state}) {

        const vm = this;
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
                container.getState();
                const title = event.srcElement.getTitle();
                container.setTitle(title);
                container.extendState({
                    title
                });
            });

        container.getElement().html(vm.$html);

        // window.onresize = dolayout;
        vm.isloading = false;

    }

    onload() {

        var vm = this;
        var webview = vm.$webview[0];
        var html = vm.$html[0];
        vm.dolayout();
        webview.focus();

        var version = navigator.appVersion.substr(navigator.appVersion.lastIndexOf('Chrome/') + 7);
        var match = /([0-9]*)\.([0-9]*)\.([0-9]*)\.([0-9]*)/.exec(version);
        var majorVersion = parseInt(match[1]);
        var buildVersion = parseInt(match[3]);

        html.querySelector('#back').onclick = function() {
            webview.goBack();
        };

        html.querySelector('#forward').onclick = function() {
            webview.goForward();
        };

        html.querySelector('#home').onclick = function() {
            vm.navigateTo('http://www.google.com/');
        };

        html.querySelector('#reload').onclick = function() {
            if (vm.isloading) {
                webview.stop();
            } else {
                webview.reload();
            }
        };


        html.querySelector('#reload').addEventListener('webkitAnimationIteration', function () {
            if (!isLoading) {
                html.classList.remove('loading');
            }
        });

        var showcleardataconfirmation = function() {
          html.querySelector('#clear-data-overlay').style.display = '-webkit-box';
          html.querySelector('#clear-data-confirm').style.display = '-webkit-box';
        };

        var hidecleardataconfirmation = function() {
          html.querySelector('#clear-data-overlay').style.display = 'none';
          html.querySelector('#clear-data-confirm').style.display = 'none';
        };

        html.querySelector('#clear-data').onclick = showcleardataconfirmation;

        html.querySelector('#clear-data-ok').onclick = function() {

          hidecleardataconfirmation();

          var getandresetcheckedvaluebyselector = function(sel) {
            var val = html.querySelector(sel).checked;
            html.querySelector(sel).checked = false;
            return val;
          };

          var cleardatatype = {
            appcache: getandresetcheckedvaluebyselector('#clear-appcache'),
            cookies: getandresetcheckedvaluebyselector('#clear-cookies'),
            filesystems: getandresetcheckedvaluebyselector('#clear-fs'),
            indexeddb: getandresetcheckedvaluebyselector('#clear-indexeddb'),
            localstorage: getandresetcheckedvaluebyselector('#clear-localstorage'),
            websql: getandresetcheckedvaluebyselector('#clear-websql'),
          }

          if (majorversion >= 44 || (majorversion == 43 && buildversion >= 2350)) {
            cleardatatype['cache'] = getandresetcheckedvaluebyselector('#clear-cache');
          }

          webview.cleardata(
            { since: 0 }, // remove all browsing data.
            cleardatatype,
            function() { webview.reload(); });
        };

        html.querySelector('#clear-data-cancel').onclick = hidecleardataconfirmation;

        html.querySelector('#location-form').onsubmit = event => {
          event.preventDefault();
          vm.navigateTo(html.querySelector('#location').value);
        };

        webview.addEventListener('exit', vm.handleexit);
        webview.addEventListener('loadstart', vm.handleloadstart);
        webview.addEventListener('loadstop', vm.handleloadstop);
        webview.addEventListener('loadabort', vm.handleloadabort);
        webview.addEventListener('loadredirect', vm.handleloadredirect);
        webview.addEventListener('loadcommit', vm.handleloadcommit);

        // test for the presence of the experimental <webview> zoom and find apis.
        if (typeof(webview.setZoomFactor) == "function" && typeof(webview.findInPage) == "function") {
          var findmatchcase = false;

          html.querySelector('#zoom').onclick = function() {
            if(html.querySelector('#zoom-box').style.display == '-webkit-flex') {
              vm.closezoombox();
            } else {
              vm.openzoombox();
            }
          };

          html.querySelector('#zoom-form').onsubmit = function(e) {
            e.preventDefault();
            var zoomtext = html.querySelector('#zoom-text');
            var zoomfactor = Number(zoomtext.value);
            if (zoomfactor > 5) {
              zoomtext.value = "5";
              zoomfactor = 5;
            } else if (zoomfactor < 0.25) {
              zoomtext.value = "0.25";
              zoomfactor = 0.25;
            }
            webview.setZoomFactor(zoomfactor);
          }

          html.querySelector('#zoom-in').onclick = function(e) {
            e.preventDefault();
            vm.increasezoom();
          }

          html.querySelector('#zoom-out').onclick = function(e) {
            e.preventDefault();
            vm.decreasezoom();
          }

          html.querySelector('#find').onclick = function() {
            if (html.querySelector('#find-box').style.display == 'block') {
              html.querySelector('webview').stopFindInPage('clearSelection');
              vm.closefindbox();
            } else {
              vm.openfindbox();
            }
          };

          html.querySelector('#find-text').oninput = function(e) {
            webview.findInPage(html.querySelector('#find-text').value, {matchcase: findmatchcase});
          }

          html.querySelector('#find-text').onkeydown = function (e) {
            if (event.ctrlkey && event.keycode == 13) {
              e.preventDefault();
              webview.stopFindInPage('activate');
              vm.closefindbox();
            }
          }

          html.querySelector('#match-case').onclick = function(e) {
            e.preventDefault();
            findmatchcase = !findmatchcase;
            var matchcase = html.querySelector('#match-case');
            if (findmatchcase) {
              matchcase.style.color = "blue";
              matchcase.style['font-weight'] = "bold";
            } else {
              matchcase.style.color = "black";
              matchcase.style['font-weight'] = "";
            }
            webview.findInPage(html.querySelector('#find-text').value,
                         {matchcase: findmatchcase});
          }

          html.querySelector('#find-backward').onclick = function(e) {
            e.preventDefault();
            webview.findInPage(html.querySelector('#find-text').value, {backward: true, matchcase: findmatchcase});
          }

          html.querySelector('#find-form').onsubmit = function(e) {
            e.preventDefault();
            webview.findInPage(html.querySelector('#find-text').value, {matchcase: findmatchcase});
          }

          webview.addeventlistener('findupdate', handlefindupdate);
          html.addeventlistener('keydown', handlekeydown);
        } else {
          var zoom = html.querySelector('#zoom');
          var find = html.querySelector('#find');
          zoom.style.visibility = "hidden";
          zoom.style.position = "absolute";
          find.style.visibility = "hidden";
          find.style.position = "absolute";
        }
    }

    dolayout() {
       console.log('dolayout');
       var vm = this;
       var webview = vm.$webview[0];
       var html = vm.$html[0];
       // var webview = html.querySelector('webview');
       var controls = html.querySelector('#controls');

       var controlsheight = controls.offsetheight;
       var windowwidth = html.clientwidth;
       var windowheight = html.clientheight;
       var webviewwidth = windowwidth;
       var webviewheight = windowheight - controlsheight;

       webview.style.width = webviewwidth + 'px';
       webview.style.height = webviewheight + 'px';

       var sadwebview = html.querySelector('#sad-webview');
       sadwebview.style.width = webviewwidth + 'px';
       sadwebview.style.height = webviewheight * 2/3 + 'px';
       sadwebview.style.paddingtop = webviewheight/3 + 'px';
    }

    navigateTo(url) {
      console.log('navigate to');

      var vm = this;
      var webview = vm.$webview[0];
      vm.resetexitedstate();
      // var webview = html.querySelector('webview');
      webview.focus();
      webview.src = url;
    }

    handleexit(event) {
      console.log('handleexit');
      console.log(event.type);
      var html = this.$html[0];
      html.classList.add('exited');
      if (event.type == 'abnormal') {
        html.classList.add('crashed');
      } else if (event.type == 'killed') {
        html.classList.add('killed');
      }
    }

    resetexitedstate() {
      console.log('resetexitstate');
      var html = this.$html[0];
      html.classList.remove('exited');
      html.classList.remove('crashed');
      html.classList.remove('killed');
    }

    handlefindupdate(event) {
      console.log('handlefindupdate');
      var html = this.$html[0];
      var findresults = html.querySelector('#find-results');
      if (event.searchtext == "") {
        findresults.innertext = "";
      } else {
        findresults.innertext =
            event.activematchordinal + " of " + event.numberofmatches;
      }

      // ensure that the find box does not obscure the active match.
      if (event.finalupdate && !event.canceled) {
        var findbox = html.querySelector('#find-box');
        findbox.style.left = "";
        findbox.style.opacity = "";
        var findboxrect = findbox.getboundingclientrect();
        if (findboxobscuresactivematch(findboxrect, event.selectionrect)) {
          // move the find box out of the way if there is room on the screen, or
          // make it semi-transparent otherwise.
          var potentialleft = event.selectionrect.left - findboxrect.width - 10;
          if (potentialleft >= 5) {
            findbox.style.left = potentialleft + "px";
          } else {
            findbox.style.opacity = "0.5";
          }
        }
      }
    }

    findboxobscuresactivematch(findboxrect, matchrect) {
      console.log('findboxobscuresactivematch');
      return findboxrect.left < matchrect.left + matchrect.width &&
          findboxrect.right > matchrect.left &&
          findboxrect.top < matchrect.top + matchrect.height &&
          findboxrect.bottom > matchrect.top;
    }

    handlekeydown(event) {
      console.log('handlekeydown');
      if (event.ctrlkey) {
        switch (event.keycode) {
          // ctrl+f.
          case 70:
            event.preventDefault();
            vm.openfindbox();
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
      console.log('handleloadcommit');
      var html = this.$html[0];
      resetexitedstate();
      if (!event.istoplevel) {
        return;
      }

      html.querySelector('#location').value = event.url;

      var vm = this;
      var webview = vm.$webview[0];
      // var webview = html.querySelector('webview');
      html.querySelector('#back').disabled = !webview.cangoback();
      html.querySelector('#forward').disabled = !webview.cangoforward();
      closeboxes();
    }

    handleloadstart(event) {
      console.log('handleloadstart');
      var html = this.$html[0];
      html.body.classList.add('loading');
      vm.isloading = true;

      resetexitedstate();
      if (!event.istoplevel) {
        return;
      }

      html.querySelector('#location').value = event.url;
    }

    handleloadstop(event) {
      console.log('handleloadstop');
      // we don't remove the loading class immediately, instead we let the animation
      // finish, so that the spinner doesn't jerkily reset back to the 0 position.
      vm.isloading = false;
    }

    handleloadabort(event) {
      console.log('handleloadabort');
      console.log('loadabort');
      console.log('  url: ' + event.url);
      console.log('  istoplevel: ' + event.istoplevel);
      console.log('  type: ' + event.type);
    }

    handleloadredirect(event) {
      console.log('handleloadredirect');
      resetexitedstate();
      if (!event.istoplevel) {
        return;
      }

      var html = this.$html[0];
      html.querySelector('#location').value = event.newurl;
    }

    getnextpresetzoom(zoomfactor) {
      console.log('getnextpresetzoom');
      var preset = [0.25, 0.33, 0.5, 0.67, 0.75, 0.9, 1, 1.1, 1.25, 1.5, 1.75, 2,
                    2.5, 3, 4, 5];
      var low = 0;
      var high = preset.length - 1;
      var mid;
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
      console.log('increasezoom');
      var vm = this;
      var webview = vm.$webview[0];
      var html = this.$html[0];
      // var webview = html.querySelector('webview');
      webview.getZoomFactor(function(zoomfactor) {
        var nexthigherzoom = vm.getnextpresetzoom(zoomfactor).high;
        webview.setZoomFactor(nexthigherzoom);
        html.querySelector('#zoom-text').value = nexthigherzoom.toString();
      });
    }

    decreasezoom() {
      console.log('decreasezoom');
      var vm = this;
      var webview = vm.$webview[0];
      var html = this.$html[0];
      // var webview = html.querySelector('webview');
      webview.getZoomFactor(function(zoomfactor) {
        var nextlowerzoom = vm.getnextpresetzoom(zoomfactor).low;
        webview.setZoomFactor(nextlowerzoom);
        html.querySelector('#zoom-text').value = nextlowerzoom.toString();
      });
    }

    openzoombox() {
      console.log('openzoombox');
      var vm = this;
      var webview = vm.$webview[0];
      var html = this.$html[0];
      webview.getZoomFactor(function(zoomfactor) {
        var zoomtext = html.querySelector('#zoom-text');
        zoomtext.value = Number(zoomfactor.toFixed(6)).toString();
        html.querySelector('#zoom-box').style.display = '-webkit-flex';
        zoomtext.select();
      });
    }

    closezoombox() {
      console.log('closezoombox');
      var html = this.$html[0];
      html.querySelector('#zoom-box').style.display = 'none';
    }

    openfindbox() {
      console.log('openfindbox');
      var html = this.$html[0];
      html.querySelector('#find-box').style.display = 'block';
      html.querySelector('#find-text').select();
    }

    closefindbox() {
      console.log('closefindbox');
      var html = this.$html[0];
      var findbox = html.querySelector('#find-box');
      findbox.style.display = 'none';
      findbox.style.left = "";
      findbox.style.opacity = "";
      html.querySelector('#find-results').innertext= "";
    }

    closeBoxes() {
      console.log('closeboxes');
      closeZoomBox();
      closeFindBox();
    }

}
