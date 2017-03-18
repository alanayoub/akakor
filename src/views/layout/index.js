import 'jquery';
import { Webview } from './webview';
import { Default } from './default';
import { Iframe } from './iframe';

export class Layout {

    constructor({selector, layout, state}) {

        const electron = !!(window && window.process && window.process.type);
        const GoldenLayout = require('golden-layout');
        const golden_layout = new GoldenLayout(Layout.generate(layout, state), selector);

        Object.values(state).forEach(item => {
            if (!item.url)
                new Default({golden_layout, state: item});
            else if (electron)
                new Webview({golden_layout, state: item});
            else
                new Iframe({golden_layout, state: item});
        });

        golden_layout.init();
        return golden_layout;

    }

    static generate(matrix, state) {

        const dimensions = Layout.dimensions(matrix);
        let config = {
            settings: {
                showPopoutIcon: true,
                showMaximiseIcon: true,
                showCloseIcon: true,
                reorderEnabled: true,
                selectionEnabled: true,
            },
            dimensions: {
                minItemHeight: 10,
                minItemWidth: 10,
                headerHeight: 20,
            }
        };

        (function recurse(matrix, ref) {

            const split = Layout.find_split(matrix);
            const idxs = Object.values(split)[0];
            const content = [];
            let type = 'column';

            if (!Array.isArray(ref)) {
                if (!ref.content || !ref.content.length) {
                    ref.content = [];
                    ref = ref.content;
                }
            }

            if (idxs.length) {
                if (split.h) {
                    matrix = Layout.transpose_matrix(matrix);
                    type = 'row';
                }
                ref.push({type, content});
                ref = content;
                for (let i = 0; i < idxs.length + 1; i++) {
                    let new_matrix = matrix.slice(i === 0 ? 0 : idxs[i-1], idxs[i]);
                    if (type === 'row') new_matrix = Layout.transpose_matrix(new_matrix);
                    recurse(new_matrix, ref);
                }
            }
            else {
                const id = matrix[0].split('')[0];
                ref.push({
                    type: 'component',
                    width: dimensions[id].w,
                    height: dimensions[id].h,
                    componentName: state[id].title || 'unamed',
                    componentState: state[id]
                })
            }

        })(matrix, config);

        return config;

    }

    static dimensions(layout) {

        const l = layout;
        const unique = [...new Set(l.join('').split(''))];
        const length = l[0].length;
        const height = l.length;
        const chars = {};

        for (let i = 0; i < unique.length; i++) {
            const char = unique[i];
            chars[char] = [];
            for (let j = 0; j < l.length; j++) {
                for (let k = 0; k < length; k++) {
                    if (char === l[j][k]) {
                        if (!chars[char][j]) chars[char][j] = [];
                        chars[char][j].push(char);
                    }
                }
            }
            chars[char] = chars[char].filter(Boolean);
            chars[char] = {
                w: (chars[char][0].length / length) * 100,
                h: (chars[char].length / height) * 100
            }
        }

        return chars;

    }

    static is_split_different(str1, str2) {

        const unique1 = [...new Set(str1.split(''))];
        const unique2 = [...new Set(str2.split(''))];
        const unique3 = [...new Set(unique1.concat(unique2))];

        return unique3.length === unique1.length + unique2.length;

    }

    static split_matrix(l) {

        const result = [];
        let last1; // current
        let last2; // last

        l.forEach((line, idx) => { // line is "next"
           if (last1 === last2 && last1 && last2) {
               if (Layout.is_split_different(last1, line)) {
                   result.push(idx);
               }
           }
           last1 = line;
           last2 = last1;
        });

        return result;

    }

    static find_split(matrix) {

        let result = Layout.split_matrix(matrix);
        let axes = 'w';

        if (!Object.values(result).length) {
            matrix = Layout.transpose_matrix(matrix);
            result = Layout.split_matrix(matrix);
            axes = 'h';
        }

        return {
            [axes]: result
        }

    }

    static transpose_matrix(matrix) {

        function to_array(matrix) {
            return matrix.reduce((a, str) => {
                a.push(str.split(''));
                return a;
            }, []);
        }

        function to_string(matrix) {
            return matrix.reduce((a, arr) => {
                a.push(arr.join(''));
                return a;
            }, []);
        }

        function transpose(matrix) {
            return matrix[0].map((x,i) => matrix.map(x => x[i]));
        }

        return to_string(transpose(to_array(matrix)));

g   }

}
