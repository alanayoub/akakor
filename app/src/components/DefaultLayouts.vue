<template>
    <ul>
        <li v-for="layout in layouts">
            <span @click.stop.prevent="load_layout()" v-html=layout.html_table></span>
        </li>
    </ul>
</template>

<script>

    function array_to_table(arr) {

        function calculate_dimensions(arr) {
            const unique = new Set(arr.join('').split(''));
            const map = {};
            unique.forEach(char => {
                if (!map[char]) map[char] = {w: 0, h: 0};
                let last_row_idx = -1;
                arr.forEach((row, idx) => {
                    row.split('').forEach(cell => {
                        if (char === cell) {
                            if (last_row_idx !== idx) map[char].h++;
                            if (map[char].h < 2) map[char].w++;
                            last_row_idx = idx;
                        }
                    });
                });
            });
            return map;
        }

        function build_table(arr, dir) {
            let used = {};
            let result = '<table>';
            arr.forEach(row => {
                result += '<tr>';
                row.split('').forEach(cell => {
                    if (!used[cell]) {
                        result += `<td colspan="${dir[cell].w}" rowspan="${dir[cell].h}">${cell}</td>`;
                        used[cell] = true;
                    }
                });
                result += '</tr>';
            });
            result += '</table>';
            return result;
        }

        return build_table(arr, calculate_dimensions(arr));

    }

    export default {
        data() {
            const layouts = [];
            akakor.api.get_configurations('default').then(data => {
                for (let [key, val] of Object.entries(data.val())) {
                    const layout = JSON.stringify(val.layout);
                    const html_table = array_to_table(val.layout);
                    layouts.push({
                        val,
                        key,
                        html_table
                    });
                }
            });
            return {
                layouts,
            };
        }
    }
</script>

<style scoped>
</style>
