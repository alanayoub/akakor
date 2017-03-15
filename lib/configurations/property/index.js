'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var layout = {
    content: [{
        type: 'row',
        content: [{
            type: 'column',
            content: [{
                type: 'component',
                isClosable: true,
                componentName: 'Zoopla.co.uk',
                componentState: {
                    label: 'Zoopla label'
                },
                height: 50
            }, {
                type: 'component',
                isClosable: true,
                componentName: 'Postcodearea.co.uk',
                componentState: {
                    label: 'Demographics'
                },
                height: 50
            }]
        }]
    }]
};

var panels = [{
    id: 0,
    name: 'Zoopla.co.uk',
    src: 'http://www.zoopla.co.uk/market/london/n3/finchley-central-finchley-church-end/',
    selectors: ['.market-panel']
}, {
    id: 1,
    name: 'Postcodearea.co.uk',
    src: 'http://www.postcodearea.co.uk/postaltowns/london/n3/demographics/',
    selectors: ['#socialgrade', '#sex', '#ethnicgroups'],
    css: '\n            #socialgrade {\n                top: 0!important;\n            }\n            #sex {\n                top: 240px!important;\n            }\n            #ethnicgroups {\n                top: 480px!important;\n            }\n        '
}];

exports.layout = layout;
exports.panels = panels;