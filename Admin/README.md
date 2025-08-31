# EcoLift Admin Dashboard

A comprehensive admin dashboard for waste management system with JWT authentication, real-time statistics, user management, and interactive map visualization.

## Features

- 🔐 **JWT Authentication** with static credentials
- 📊 **Dashboard Statistics** with real-time data
- 👥 **User Management** with filtering (All/Collectors/Customers)
- 🗺️ **Interactive Map** showing pickup locations and collector locations
- 📈 **Recent Requests** tracking
- 🎨 **Modern UI** with Tailwind CSS
- 📱 **Responsive Design**

## Tech Stack

### Backend
- **Node.js** with TypeScript
- **Express.js** for API server
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Helmet** for security
- **Rate limiting** for API protection

### Frontend
- **React** with TypeScript
- **React Router** for navigation
- **Axios** for API calls
- **Leaflet** for interactive maps
- **Lucide React** for icons
- **Tailwind CSS** for styling

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecolift-admin-dashboard
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   npm install
   
   # Install frontend dependencies
   cd client
   npm install
   cd ..
   ```

3. **Environment Configuration**
   
   Copy the environment example file and configure your settings:
   ```bash
   cp env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   # Server Configuration
   PORT=3001
   NODE_ENV=development
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=24h
   
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017
   PICKUP_SERVICE_DB=pickup-service
   USER_SERVICE_DB=user-service
   
   # Admin Credentials
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123
   
   # Frontend URL (for CORS)
   FRONTEND_URL=http://localhost:3000
   ```

4. **Database Setup**
   
   Ensure your MongoDB instance is running and has the required databases:
   - `pickup-service` with collection `pickuprequests`
   - `user-service` with collection `users`

## Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   npm run dev:server
   ```

2. **Start the frontend development server**
   ```bash
   npm run dev:client
   ```

3. **Or run both simultaneously**
   ```bash
   npm run dev
   ```

### Production Mode

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## Usage

1. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001/api

2. **Login**
   - Username: `admin` (or as configured in .env)
   - Password: `admin123` (or as configured in .env)

3. **Dashboard Features**
   - **Overview Tab**: View statistics and recent requests
   - **Users Tab**: Manage and filter users (All/Collectors/Customers)
   - **Map Tab**: Interactive map with location filtering

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with credentials

### Dashboard (Protected)
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/users` - Get users with transaction counts
- `GET /api/dashboard/pickup-requests` - Get pickup requests for map
- `GET /api/dashboard/recent-requests` - Get recent pickup requests

### Health Check
- `GET /api/health` - Server health status

## Database Schema

### Pickup Requests Collection
```json
{
  "_id": "ObjectId",
  "customerId": "ObjectId",
  "location": {
    "type": "Point",
    "coordinates": [longitude, latitude]
  },
  "items": [
    {
      "type": "string",
      "quantity": "number",
      "description": "string",
      "_id": "ObjectId"
    }
  ],
  "status": "Accepted|In Progress|Completed",
  "collectorLocation": {
    "type": "Point",
    "coordinates": [longitude, latitude]
  },
  "requestType": "string",
  "collectorId": "ObjectId",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Users Collection
```json
{
  "_id": "ObjectId",
  "name": "string",
  "phone": "string",
  "email": "string",
  "password": "string (hashed)",
  "role": "customer|collector",
  "address": {
    "addressNo": "string",
    "street": "string",
    "city": "string",
    "district": "string"
  },
  "wasteTypes": ["string"],
  "fcmToken": "string",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- CORS protection
- Rate limiting
- Helmet security headers
- Input validation and sanitization

## Customization

### Changing Admin Credentials
Update the environment variables:
```env
ADMIN_USERNAME=your-username
ADMIN_PASSWORD=your-password
```

### Styling
The application uses Tailwind CSS. Customize colors and styling in:
- `client/tailwind.config.js` - Tailwind configuration
- `client/src/index.css` - Global styles

### API Configuration
Modify API endpoints and configuration in:
- `client/src/services/api.ts` - API service configuration
- `src/routes/` - Backend route handlers

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify database names match configuration

2. **Port Already in Use**
   - Change PORT in `.env` file
   - Kill processes using the port

3. **Build Errors**
   - Clear node_modules and reinstall
   - Check TypeScript configuration
   - Verify all dependencies are installed

4. **Map Not Loading**
   - Check internet connection (Leaflet requires external tiles)
   - Verify Leaflet CSS is loaded
   - Check browser console for errors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.
