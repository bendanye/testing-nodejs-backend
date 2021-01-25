module.exports = {
    testRegex: '.*.test.js',
    reporters: [
        "default",
        ["../node_modules/jest-html-reporter", {
            "outputPath": "./reports/test-report.html",
            "pageTitle": "Test Report"
        }]
    ]
};