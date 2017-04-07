'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//
function calculate_percentages(layout) {
    var l = layout;
    var unique = [].concat(_toConsumableArray(new Set(l.join('').split(''))));
    var length = l[0].length;
    var height = l.length;
    var chars = {};
    for (var i = 0; i < unique.length; i++) {
        var char = unique[i];
        chars[char] = [];
        for (var j = 0; j < l.length; j++) {
            for (var k = 0; k < length; k++) {
                if (char === l[j][k]) {
                    if (!chars[char][j]) chars[char][j] = [];
                    chars[char][j].push(char);
                }
            }
        }
        chars[char] = chars[char].filter(Boolean);
        chars[char] = {
            w: chars[char][0].length / length * 100,
            h: chars[char].length / height * 100
        };
    }
    return chars;
}

//
function has_all_different(str1, str2) {
    var unique1 = [].concat(_toConsumableArray(new Set(str1.split(''))));
    var unique2 = [].concat(_toConsumableArray(new Set(str2.split(''))));
    var unique3 = [].concat(_toConsumableArray(new Set(unique1.concat(unique2))));
    return unique3.length === unique1.length + unique2.length;
}

//
function split(l) {
    var last1; // current
    var last2; // last
    var result = [];
    // line is "next"
    l.forEach(function (line, idx) {
        if (last1 === last2 && last1 && last2) {
            if (has_all_different(last1, line)) {
                result.push(idx);
            }
        }
        last1 = line;
        last2 = last1;
    });
    return result;
}

//
function to_array(matrix) {
    return matrix.reduce(function (a, str) {
        a.push(str.split(''));
        return a;
    }, []);
}

//
function to_string(matrix) {
    return matrix.reduce(function (a, arr) {
        a.push(arr.join(''));
        return a;
    }, []);
}

//
var transpose_matrix = function transpose_matrix(m) {
    return m[0].map(function (x, i) {
        return m.map(function (x) {
            return x[i];
        });
    });
};

//
function find_split(matrix) {
    var result = split(matrix);
    var axes = 'w';
    if (!Object.values(result).length) {
        matrix = to_string(transpose_matrix(to_array(matrix)));
        result = split(matrix);
        axes = 'h';
    }
    return _defineProperty({}, axes, result);
}
function generate_layout(matrix, state) {

    var config = {};
    var dimensions = calculate_percentages(matrix);

    (function recurse(matrix, ref) {

        var type = 'column';
        var split = find_split(matrix);
        var idxs = Object.values(split)[0];

        if (Array.isArray(ref)) {} else if (!ref.content || !ref.content.length) {
            ref.content = [];
            ref = ref.content;
        }

        var content = [];
        if (idxs.length) {
            if (split.h) {
                matrix = to_string(transpose_matrix(to_array(matrix)));
                type = 'row';
            }
            ref.push({ type: type, content: content });
            ref = content;
            for (var i = 0; i < idxs.length + 1; i++) {
                var new_matrix = matrix.slice(i === 0 ? 0 : idxs[i - 1], idxs[i]);
                if (type === 'row') new_matrix = to_string(transpose_matrix(to_array(new_matrix)));
                recurse(new_matrix, ref);
            }
        } else {
            var id = matrix[0].split('')[0];
            ref.push({
                type: 'component',
                width: dimensions[id].w,
                height: dimensions[id].h,
                componentName: state[id].title || 'unamed',
                componentState: state[id]
            });
        }
    })(matrix, config);

    return config;
}

function Layout(_ref2) {
    var layout = _ref2.layout,
        state = _ref2.state;


    var config = generate_layout(layout, state);
    var myLayout = new GoldenLayout(config);

    Object.values(state).forEach(function (item) {
        console.log('item', item);
        myLayout.registerComponent(item.title, function (container, state) {
            container.getElement().html('<h2>' + state.url + '</h2>');
        });
    });

    myLayout.init();
    return myLayout;
}

exports.Layout = Layout;