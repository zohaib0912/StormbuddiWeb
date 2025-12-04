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
      target: 'https://app.stormbuddi.com/',
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

  // Proxy for signup API (local Node.js server - only in development)
  // In production on Vercel, the API route is handled directly by the serverless function
  if (process.env.NODE_ENV === 'development') {
    app.use(
      '/api/signup',
      createProxyMiddleware({
        target: 'http://localhost:5000',
        changeOrigin: true,
        logLevel: 'debug',
        onProxyReq: (proxyReq, req, res) => {
          proxyReq.setHeader('Accept', 'application/json');
          proxyReq.setHeader('Content-Type', 'application/json');
          console.log('Proxying signup request to:', proxyReq.path);
        },
        onError: (err, req, res) => {
          console.error('Signup proxy error:', err);
        },
      })
    );
  }
};

