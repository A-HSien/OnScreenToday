# How to deploy screen-client-2

## Provisioning

```bash
# Install nvm (note the hardcoded version - check github for latest version)
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash

# Install node @ 0.12.5
nvm install 0.12.5

# Install system dependencies
sudo apt update
    && sudo apt upgrade
    && sudo apt install python build-essential libkrb5-dev nginx

# Clone screen
git clone https://bitbucket.org/haohcraft/screen-client-2

# Create a swapfile (npm is a memory hog)
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Install application dependencies
npm i

# Disable the swapfile
sudo swapoff /swapfile

# Install PM2
npm i -g pm2

# Setup nginx
sudo cp ops/screen.conf /etc/nginx/sites-available/screen
sudo ln -s /etc/nginx/sites-available/screen /etc/nginx/sites-enabled/screen
sudo service nginx restart

# Start screen
pm2 start pm2.json
```

## Deploying

```bash
git pull origin newAPI4Prod
pm2 restart all
```
