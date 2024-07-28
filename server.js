require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Servire file statici dalla cartella "public"
app.use(express.static(path.join(__dirname, 'public')));

// Proxy per le API SolarEdge
app.use('/api', createProxyMiddleware({
    target: 'https://monitoringapi.solaredge.com',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '',
    },
    onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('Access-Control-Allow-Origin', '*');
    },
    onProxyRes: (proxyRes, req, res) => {
        res.header('Access-Control-Allow-Origin', '*');
    },
}));

// Route per le pagine
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/monitoring', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'monitoring.html'));
});

app.get('/cloud', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cloud.html'));
});

app.get('/install', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'install.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Serve the index.html file for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
