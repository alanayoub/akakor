<template>
    <ul>
        <li v-for="layout in layouts">
            <span @click="load_layout(layout)" v-html=layout.html_table></span>
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
            let result = '<table class="T-layout-table">';
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
            return {
                layouts
            };
        },
        created() {
            const vm = this;
            akakor.api.get_configurations('default', function get_default_configs(data) {
                const layouts = [];
                for (let [key, val] of Object.entries(data.val())) {
                    const layout = JSON.stringify(val.layout);
                    const html_table = array_to_table(val.layout);
                    layouts.push({
                        val,
                        key,
                        html_table
                    });
                }
                vm.layouts = layouts;
            });
        },
        methods: {
            load_layout(layout) {
                window.akakor.bus.$emit('DEFAULT_LAYOUT_SELECTED', layout);
            }
        }
    }
</script>

<style>
    .T-layout-table {
        width: 200px;
        height: 150px;
    }
    .T-layout-table td {
        background: #eefaff;
        text-align: center;
        color: #333;
    }

</style>

<style scoped>
    li {
        display: inline-block;
        margin: 10px;
        padding: 5px;
        background: #c1e6f6;
    }
    li:hover {
        background: #2187b3;
    }
</style>
