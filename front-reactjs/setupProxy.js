const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "/weatherforecast",
    "/shop",
    "/shop/index",
    "/shop/create",
    "/shop/categories",
    "/shop/category",
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: 'https://localhost:45762',
        secure: false
    });

    app.use(appProxy);
};