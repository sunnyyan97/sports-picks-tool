#!/bin/bash

echo "🏀 Sunny's Expert Picks - Quick Start"
echo "======================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Install dependencies if needed
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing dependencies..."
    cd backend
    npm install
    cd ..
    echo "✅ Dependencies installed"
    echo ""
fi

# Check for .env file
if [ ! -f "backend/.env" ]; then
    echo "⚠️  No .env file found!"
    echo ""
    echo "Please create backend/.env with your Anthropic API key:"
    echo "  1. Copy backend/.env.example to backend/.env"
    echo "  2. Get your API key from https://console.anthropic.com/settings/keys"
    echo "  3. Add it to the .env file"
    echo ""
    echo "Example .env file:"
    echo "ANTHROPIC_API_KEY=sk-ant-your-key-here"
    echo ""
    exit 1
fi

# Start the server
echo "🚀 Starting server..."
echo "📱 App will be available at: http://localhost:3000"
echo "Press Ctrl+C to stop"
echo ""

cd backend
npm start
