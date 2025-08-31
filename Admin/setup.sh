#!/bin/bash

echo "🚀 Setting up EcoLift Admin Dashboard..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install backend dependencies
echo "📦 Installing backend dependencies..."
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd client
npm install
cd ..

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp env.example .env
    echo "✅ .env file created. Please update it with your configuration."
else
    echo "✅ .env file already exists"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Update the .env file with your MongoDB connection and credentials"
echo "2. Ensure MongoDB is running with the required databases:"
echo "   - pickup-service (collection: pickuprequests)"
echo "   - user-service (collection: users)"
echo "3. Run the application:"
echo "   - Development: npm run dev"
echo "   - Production: npm run build && npm start"
echo ""
echo "Default login credentials:"
echo "Username: admin"
echo "Password: admin123"
echo ""
echo "Access the application at: http://localhost:3000"
