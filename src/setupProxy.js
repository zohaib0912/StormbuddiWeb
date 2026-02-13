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

  // Proxy for contact, demo, and signup APIs to backend server
  app.use(
    '/api/contact',
    createProxyMiddleware({
      target: 'https://app.stormbuddi.com/',
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/api/contact/send-email': '/api/stormbuddi-website/contact/submit',
      },
      onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('Accept', 'application/json');
        proxyReq.setHeader('Content-Type', 'application/json');
        console.log('Proxying contact request to:', proxyReq.path);
      },
      onError: (err, req, res) => {
        console.error('Contact proxy error:', err);
      },
    })
  );

  app.use(
    '/api/demo',
    createProxyMiddleware({
      target: 'https://app.stormbuddi.com/',
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/api/demo/send-email': '/api/stormbuddi-website/demo/submit',
      },
      onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('Accept', 'application/json');
        proxyReq.setHeader('Content-Type', 'application/json');
        console.log('Proxying demo request to:', proxyReq.path);
      },
      onError: (err, req, res) => {
        console.error('Demo proxy error:', err);
      },
    })
  );

  app.use(
    '/api/signup',
    createProxyMiddleware({
      target: 'https://app.stormbuddi.com/',
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/api/signup/send-email': '/api/stormbuddi-website/signup/submit',
      },
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
};

