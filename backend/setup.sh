#!/bin/bash

# Backend Setup Script
# Run this script to install dependencies and start the server

echo "Setting up backend environment..."

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

echo ""
echo "✅ Dependencies installed!"
echo ""
echo "To start the server, run:"
echo "  source venv/bin/activate"
echo "  uvicorn main:app --reload"
echo ""
