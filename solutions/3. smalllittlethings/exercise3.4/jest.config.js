module.exports = {
    testRegex: '.*.test.js',
    coverageDirectory: "./reports",
    collectCoverage: true,
    coverageReporters: ["text", "html"],
    reporters: [
        "default",
        ["../node_modules/jest-html-reporter", {
            "outputPath": "./reports/test-report.html",
            "pageTitle": "Test Report"
        }]
    ]
};