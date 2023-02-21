module.exports = {
    js2svg: {
        indent: 4,
        pretty: true,
    },
    plugins: [
        {
            name: "preset-default",
            params: {
                overrides: {
                    removeViewBox: false,
                },
            },
        },
        {
            name: "removeAttrs",
            params: {
                attrs: "(class)"
            }
        },
        "removeDimensions",
        "removeXMLNS",
    ],
};
