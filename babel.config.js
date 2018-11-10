module.exports = {
    presets: [
        '@vue/app'
    ],
    // .babelrc
    
    "plugins": [
        ["import", 
            {
                "libraryName": "iview",
                "libraryDirectory": "src/components"
            }
        ],
        [
            "component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
            }
        ],
        ["@babel/plugin-syntax-dynamic-import"]

    ]
    
};
