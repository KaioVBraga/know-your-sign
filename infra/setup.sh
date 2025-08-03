#!/bin/bash

DOMAIN="know-your-sign.com"

apt update

apt install -y curl software-properties-common 

# Install MySQL Client
api install -y mariadb-client

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install Certbot
apt install -y certbot

# Allow certbot to use port 80 temporarily
fuser -k 80/tcp || true

# Get SSL cert (non-interactive)
certbot certonly --standalone --non-interactive --agree-tos -m admin@$DOMAIN -d $DOMAIN

# Create Node.js HTTPS server
mkdir -p /opt/web-api
cat <<EOF > /opt/web-api/server.js
const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();
const port = 443;

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/$DOMAIN/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/$DOMAIN/fullchain.pem')
};

app.get('/', (req, res) => {
  res.send('Hello from Node.js with HTTPS!');
});

https.createServer(options, app).listen(port, () => {
  console.log('HTTPS server running');
});
EOF

cd /opt/web-api
npm init -y
npm install express

# Start HTTPS server
nohup node server.js > /dev/null 2>&1 &