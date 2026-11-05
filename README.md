# DevTinder Deployment Guide

## Clone Project
git clone <repo-url>        # Clone the repository
cd <project-folder>         # Move into project directory


## Frontend Setup
npm install                 # Install frontend dependencies
npm run build               # Create production build (dist folder)

sudo apt update             # Update server packages
sudo apt install nginx      # Install Nginx web server

sudo systemctl start nginx  # Start Nginx service
sudo systemctl enable nginx # Enable Nginx on server restart

sudo cp -r dist/* /var/www/html/  # Copy frontend build to Nginx directory

# Make sure port 80 is open in server security group


## Backend Setup
# Update DB password in env/config file

# Allow EC2 public IP in MongoDB Atlas network access

npm install pm2 -g          # Install PM2 process manager globally

pm2 start npm --name "devTinder-backend" -- start  # Start backend using PM2

pm2 logs                    # View backend logs


## PM2 Useful Commands
pm2 list                    # Show running processes
pm2 flush <name>            # Clear logs of process
pm2 stop <name>             # Stop process
pm2 delete <name>           # Remove process from PM2


# Nginx Proxy Configuration

sudo nano /etc/nginx/sites-available/default   # Open Nginx config file

# Add this inside the server block
location /api/ {
    proxy_pass http://localhost:3333/;  # Forward /api requests to Node server
    proxy_http_version 1.1;             # Use HTTP 1.1 for proper connection handling
    proxy_set_header Upgrade $http_upgrade;  # Support WebSockets if needed
    proxy_set_header Connection 'upgrade';   # Handle connection upgrade
    proxy_set_header Host $host;             # Pass original host header
    proxy_cache_bypass $http_upgrade;        # Disable cache for upgrades
}

sudo nginx -t                 # Test Nginx configuration
sudo systemctl restart nginx  # Restart Nginx to apply changes