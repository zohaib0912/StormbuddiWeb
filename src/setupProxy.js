const { createProxyMiddleware } = require('http-proxy-middleware');

/**
 * Proxy API requests during local development to avoid CORS issues.
 * Update the target if your backend lives elsewhere.
 */
module.exports = function setupProxy(app) {
  // Proxy for pricing API (includes checkout endpoint)
  app.use(
    '/api/pricing',
    createProxyMiddleware({
      target: 'http://192.168.1.182:8000',
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/api/pricing': '/api/pricing',
      },
      onProxyReq: (proxyReq, req, res) => {
        proxyReq.removeHeader('Authorization');
        proxyReq.removeHeader('X-CSRF-TOKEN');
        proxyReq.removeHeader('Cookie');
        proxyReq.setHeader('Accept', 'application/json');
        proxyReq.setHeader('Content-Type', 'application/json');
        console.log('Proxying request to:', proxyReq.path);
      },
      onError: (err, req, res) => {
        console.error('Proxy error:', err);
      },
    })
  );
};

