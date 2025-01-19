#!/bin/bash

# Check if script is run as root
if [ "$EUID" -ne 0 ]; then 
    echo "Please run as root"
    exit 1
fi

# Configuration variables
BINARY_PATH=""
SERVICE_NAME=""
DESCRIPTION=""
USER=""

# Parse command line arguments
while getopts "b:n:d:u:" opt; do
    case $opt in
        b) BINARY_PATH="$OPTARG";;
        n) SERVICE_NAME="$OPTARG";;
        d) DESCRIPTION="$OPTARG";;
        u) USER="$OPTARG";;
        ?) echo "Usage: $0 -b binary_path -n service_name -d description -u user"
           exit 1;;
    esac
done

# Validate required parameters
if [ -z "$BINARY_PATH" ] || [ -z "$SERVICE_NAME" ] || [ -z "$DESCRIPTION" ] || [ -z "$USER" ]; then
    echo "Missing required parameters"
    echo "Usage: $0 -b binary_path -n service_name -d description -u user"
    exit 1
fi

# Check if binary exists
if [ ! -f "$BINARY_PATH" ]; then
    echo "Binary file not found: $BINARY_PATH"
    exit 1
fi

# Check if user exists
if ! id "$USER" >/dev/null 2>&1; then
    echo "User does not exist: $USER"
    exit 1
fi

# Create systemd service file
cat > "/etc/systemd/system/${SERVICE_NAME}.service" << EOF
[Unit]
Description=$DESCRIPTION
After=network.target

[Service]
Type=simple
User=$USER
ExecStart=$BINARY_PATH
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF

# Set proper permissions
chmod 644 "/etc/systemd/system/${SERVICE_NAME}.service"

# Reload systemd daemon
systemctl daemon-reload

# Enable and start the service
systemctl enable "$SERVICE_NAME"
systemctl start "$SERVICE_NAME"

# Check service status
systemctl status "$SERVICE_NAME"

echo "Service installation completed successfully"
