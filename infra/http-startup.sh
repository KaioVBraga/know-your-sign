#!/bin/bash

# Update and install Node.js
apt update
apt install -y curl

# Install Node.js (LTS version)
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Create a simple Express app
mkdir -p /opt/web-api
cat <<EOF > /opt/web-api/server.js
const express = require('express');
const app = express();
const port = 80;

app.get('/', (req, res) => {
  res.send('Hello from Node.js on GCE!');
});

app.listen(port, '0.0.0.0', () => {
  console.log(\`Server listening on port \${port}\`);
});
EOF

# Initialize project and install dependencies
cd /opt/web-api
npm init -y
npm install express

# Start the app
nohup node server.js > /dev/null 2>&1 &