//
function calculate_percentages(layout) {
    var l = layout;
    var unique = [...new Set(l.join('').split(''))];
    var length = l[0].length;
    var height = l.length;
    var chars = {};
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

//
function has_all_different(str1, str2) {
    const unique1 = [...new Set(str1.split(''))];
    const unique2 = [...new Set(str2.split(''))];
    const unique3 = [...new Set(unique1.concat(unique2))];
    return unique3.length === unique1.length + unique2.length;
}

//
function split(l) {
    var last1; // current
    var last2; // last
    var result = [];
    // line is "next"
    l.forEach((line, idx) => {
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
    return matrix.reduce((a, str) => {
        a.push(str.split(''));
        return a;
    }, []);
}

//
function to_string(matrix) {
    return matrix.reduce((a, arr) => {
        a.push(arr.join(''));
        return a;
    }, []);
}

//
var transpose_matrix = m => m[0].map((x,i) => m.map(x => x[i]));

//
function find_split(matrix) {
    let result = split(matrix);
    let axes = 'w';
    if (!Object.values(result).length) {
        matrix = to_string(transpose_matrix(to_array(matrix)));
        result = split(matrix);
        axes = 'h';
    }
    return {
        [axes]: result
    }
}
function generate_layout(matrix, state) {

    let config = {};
    let dimensions = calculate_percentages(matrix);

    (function recurse(matrix, ref) {

        let type = 'column';
        const split = find_split(matrix);
        const idxs = Object.values(split)[0];

        if (Array.isArray(ref)) {}
        else if (!ref.content || !ref.content.length) {
            ref.content = [];
            ref = ref.content;
        }

        const content = [];
        if (idxs.length) {
            if (split.h) {
                matrix = to_string(transpose_matrix(to_array(matrix)));
                type = 'row';
            }
            ref.push({type, content});
            ref = content;
            for (let i = 0; i < idxs.length + 1; i++) {
                let new_matrix = matrix.slice(i === 0 ? 0 : idxs[i-1], idxs[i]);
                if (type === 'row') new_matrix = to_string(transpose_matrix(to_array(new_matrix)));
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

function Layout({layout, state}) {

    var config = generate_layout(layout, state);
    var myLayout = new GoldenLayout(config);

    Object.values(state).forEach(item => {
        console.log('item', item);
        myLayout.registerComponent(item.title, function (container, state) {
            container.getElement().html(`<h2>${state.url}</h2>`);
        });
    })

    myLayout.init();
    return myLayout;
}

export { Layout };
