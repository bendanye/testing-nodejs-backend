module.exports = {
    roots: ["test"],
    runner: "groups",
    testRegex: '.*.test.js',
    coverageDirectory: "./reports/coverage",
    collectCoverage: true,
    coverageReporters: ["text", "html"],
    collectCoverageFrom: [
        "./src/**/*.js"
    ],
    reporters: [
        "default",
        ["./node_modules/jest-html-reporter", {
            "outputPath": "./reports/test-report.html",
            "pageTitle": "Test Report"
        }]
    ]
};