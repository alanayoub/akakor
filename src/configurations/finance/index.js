const layout = {
    content: [{
        type: 'row',
        content:[
            {
                type: 'column',
                width: 20,
                content: [{
                    type: 'component',
                    componentName: 'StockTwits',
                    componentState: {},
                    height: 100,
                }]

            },
            {
                type: 'column',
                width: 60,
                content:[{
                    type: 'component',
                    componentName: 'DASH',
                    componentState: {},
                    height: 50
                },{
                    type: 'component',
                    componentName: 'BTC',
                    componentState: {},
                    height: 50
                }]
            },
            {
                type: 'column',
                width: 20,
                content:[{
                    type: 'component',
                    componentName: 'MarketCap',
                    componentState: {},
                    height: 100
                }]
            },
        ]
    }]
};

const panels = [
    {
        name: 'MarketCap',
        src: 'https://coinmarketcap.com/',
        selectors: []
    },
    {
        name: 'DASH',
        src: 'https://uk.tradingview.com/chart/?symbol=DASHUSDT',
        selectors: []
    },
    {
        name: 'BTC',
        src: 'https://uk.tradingview.com/chart/?symbol=BTCUSD',
        selectors: []
    },
    {
            name: 'StockTwits',
            src: 'https://stocktwits.com/symbol/BTC',
            selectors: []
    }
];

export { layout, panels }
