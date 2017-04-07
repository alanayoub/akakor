const layout = {
    content: [{
        type: 'row',
        content:[
            {
                type: 'column',
                content:[{
                    type: 'component',
                    isClosable: true,
                    componentName: 'Zoopla.co.uk',
                    componentState: {
                        label: 'Zoopla label'
                    },
                    height: 50
                },{
                    type: 'component',
                    isClosable: true,
                    componentName: 'Postcodearea.co.uk',
                    componentState: {
                        label: 'Demographics'
                    },
                    height: 50
                }]
            }
        ]
    }]
};

const panels = [
    {
        id: 0,
        name: 'Zoopla.co.uk',
        src: 'http://www.zoopla.co.uk/market/london/n3/finchley-central-finchley-church-end/',
        selectors: ['.market-panel']
    },
    {
        id: 1,
        name: 'Postcodearea.co.uk',
        src: 'http://www.postcodearea.co.uk/postaltowns/london/n3/demographics/',
        selectors: ['#socialgrade', '#sex', '#ethnicgroups'],
        css: `
            #socialgrade {
                top: 0!important;
            }
            #sex {
                top: 240px!important;
            }
            #ethnicgroups {
                top: 480px!important;
            }
        `
    }
];

export { layout, panels }
