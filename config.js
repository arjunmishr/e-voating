module.exports = {
    "server": {
        "baseDir": ["./src", "./build/contracts"],
        "routes": {
            "/node_modules": "node_modules"
        },
        middleware: {
            1: app,
        },
    },
    port: 3000,
};