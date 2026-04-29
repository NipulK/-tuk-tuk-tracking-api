# Real-Time Tuk-Tuk Tracking and Movement Logging System

## Introduction

This project implements a comprehensive RESTful API for a Real-Time Tuk-Tuk Tracking and Movement Logging System. The system enables administrators and authorized personnel to register vehicles, track their real-time locations, and maintain historical records of vehicle movements across geographic regions. The API is built with modern Node.js technologies and follows industry-standard practices for security, scalability, and maintainability.

The primary objective of this system is to provide a robust backend infrastructure that supports vehicle fleet management, GPS coordinate logging, location history retrieval, and role-based access control for different user types within the transportation management domain.

## Features

The system provides the following core features:

- **User Authentication and Authorization**: Secure user registration and login using JSON Web Tokens (JWT) with password hashing via bcryptjs.
- **Role-Based Access Control (RBAC)**: Differentiated access levels for Admin and User roles with middleware-enforced endpoint protection.
- **Vehicle Management**: Create, retrieve, update, and delete vehicle records with associated metadata including registration numbers, owner information, and device tracking identifiers.
- **Real-Time Location Tracking**: Record and store GPS coordinates (latitude, longitude) along with additional telemetry data such as speed and heading.
- **Location History Retrieval**: Query historical location data with optional date range filtering for specific vehicles.
- **Master Data Management**: Provision and retrieval of geographic master data including provinces, districts, and police station information.
- **Interactive API Documentation**: Swagger UI integration for comprehensive API exploration and testing at /api-docs.
- **Simulation Engine**: Automated vehicle and location data generation for testing and demonstration purposes.
- **Database Persistence**: MongoDB-based storage with Mongoose ORM for schema validation and data integrity.

## Technology Stack

The project utilizes the following technologies and libraries:

- **Runtime Environment**: Node.js (v22.13.0 or compatible)
- **Web Framework**: Express.js (v5.2.1)
- **Database**: MongoDB Atlas (cloud-hosted)
- **ODM/ORM**: Mongoose (v9.5.0)
- **Authentication**: JSON Web Tokens (jsonwebtoken v9.0.3)
- **Password Security**: bcryptjs (v3.0.3)
- **Cross-Origin Requests**: CORS (v2.8.6)
- **Request Logging**: Morgan (v1.10.1)
- **API Documentation**: Swagger/OpenAPI (swagger-jsdoc v6.2.8, swagger-ui-express v5.0.1)
- **Environment Configuration**: dotenv (v17.4.2)
- **Development Tool**: Nodemon (v3.1.14)

## Project Structure

```
tuk-tuk-tracking-api/
├── src/
│   ├── app.js                          # Express application configuration
│   ├── server.js                       # Server startup and entry point
│   ├── config/
│   │   ├── db.js                       # MongoDB connection configuration
│   │   └── swagger.js                  # Swagger/OpenAPI specification
│   ├── controllers/
│   │   ├── authController.js           # Authentication handler functions
│   │   ├── vehicleController.js        # Vehicle CRUD operations
│   │   ├── locationController.js       # Location tracking and history
│   │   └── masterDataController.js     # Province, district, station data
│   ├── models/
│   │   ├── User.js                     # User schema definition
│   │   ├── Vehicle.js                  # Vehicle schema definition
│   │   ├── LocationLog.js              # Location log schema definition
│   │   ├── Province.js                 # Province schema definition
│   │   ├── District.js                 # District schema definition
│   │   └── PoliceStation.js            # Police station schema definition
│   ├── routes/
│   │   ├── authRoutes.js               # Authentication endpoints
│   │   ├── vehicleRoutes.js            # Vehicle management endpoints
│   │   ├── locationRoutes.js           # Location tracking endpoints
│   │   ├── masterDataRoutes.js         # Master data endpoints
│   │   ├── testRoutes.js               # Testing utility endpoints
│   │   └── simulationRoutes.js         # Simulation data generation
│   ├── middleware/
│   │   └── authMiddleware.js           # JWT verification and role authorization
│   └── data/
│       └── seedData.js                 # Database seed script
├── .env                                # Environment configuration file
├── .gitignore                          # Git exclusion patterns
├── package.json                        # Project dependencies and scripts
└── README.md                           # Project documentation
```

## Installation Instructions

### Prerequisites

- Node.js (version 18.0.0 or higher)
- npm (Node Package Manager)
- MongoDB Atlas account with active cluster
- Terminal/Command line interface

### Setup Steps

1. Clone the repository:
```bash
git clone <repository-url>
cd tuk-tuk-tracking-api
```

2. Install project dependencies:
```bash
npm install
```

3. Create a `.env` file in the project root directory with required environment variables (see Environment Variables section).

4. Verify the MongoDB connection configuration in the `.env` file.

## Environment Variables

Create a `.env` file in the project root directory with the following configuration:

```
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=<your-secret-key>
MONGO_CONNECT_RETRY_DELAY_MS=3000
MONGO_DNS_SERVERS=8.8.8.8,1.1.1.1
```

### Configuration Details

- **PORT**: Server listening port (default: 3000)
- **MONGO_URI**: MongoDB Atlas connection string with credentials
- **JWT_SECRET**: Secret key for JWT token generation and verification (use a strong, random string)
- **MONGO_CONNECT_RETRY_DELAY_MS**: Delay in milliseconds between connection retry attempts
- **MONGO_DNS_SERVERS**: Custom DNS servers for MongoDB SRV record resolution (optional)

## How to Run the Project

### Development Mode with Auto-Reload

Start the server in development mode with automatic restart on file changes:

```bash
npm run dev
```

The API will be accessible at: `http://localhost:3000`

API documentation will be available at: `http://localhost:3000/api-docs`

### Production Mode

Start the server in production mode:

```bash
npm start
```

## Seed Data

The project includes a seed data script that initializes the database with master geographic data.

### Running the Seed Script

```bash
npm run seed
```

This script performs the following operations:

- Clears existing province, district, and police station data
- Inserts all 9 provinces of Sri Lanka with proper naming conventions
- Creates 25 districts across all provinces with province associations
- Populates police stations for each district with station codes
- Outputs a success message upon completion

The seed data includes comprehensive coverage of Sri Lankan administrative divisions necessary for the vehicle tracking system.

## Simulation Data

The project includes a simulation engine for generating realistic vehicle tracking data for testing and demonstration purposes.

### Running the Simulation

```bash
npm run simulate
```

This command generates and populates the database with simulated vehicle and location tracking data.

## API Documentation

The API includes comprehensive Swagger/OpenAPI documentation accessible through an interactive web interface.

### Accessing Documentation

After starting the server, navigate to:

```
http://localhost:3000/api-docs
```

The Swagger UI provides:

- Complete endpoint listing with HTTP methods
- Request/response schema definitions
- Parameter descriptions and requirements
- Live testing interface for API endpoints
- Authentication configuration for protected endpoints

### Testing with External Tools

API endpoints can also be tested using tools such as:

- Postman (API client)
- cURL (command-line tool)
- Insomnia (REST client)
- Thunder Client (VS Code extension)

## Authentication

The API implements JWT-based authentication for secure endpoint access.

### Token Generation

Users obtain a JWT token by successfully authenticating through the login endpoint:

```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Response contains the authentication token:

```
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Token Usage

Include the token in the Authorization header for all protected requests:

```
Authorization: Bearer <token>
```

Example:

```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
     http://localhost:3000/api/vehicles
```

### Token Expiration

Tokens expire after 24 hours. Users must obtain a new token by logging in again after expiration.

## API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/auth/register | Register new user account | No |
| POST | /api/auth/login | Authenticate user and obtain JWT token | No |

### Master Data Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /api/master-data/provinces | Retrieve all provinces | Yes |
| GET | /api/master-data/districts | Retrieve all districts (optional query: provinceId) | Yes |
| GET | /api/master-data/police-stations | Retrieve police stations (optional query: provinceId, districtId) | Yes |

### Vehicle Management Endpoints

| Method | Endpoint | Description | Auth Required | Role Required |
|--------|----------|-------------|---|---|
| POST | /api/vehicles | Create new vehicle record | Yes | Admin |
| GET | /api/vehicles | Retrieve all vehicles (supports filtering) | Yes | User |
| GET | /api/vehicles/:id | Retrieve specific vehicle by ID | Yes | User |
| PUT | /api/vehicles/:id | Update vehicle information | Yes | Admin |
| DELETE | /api/vehicles/:id | Delete vehicle record | Yes | Admin |

### Location Tracking Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| POST | /api/location | Record new location data point | No |
| GET | /api/location/latest/:vehicleId | Retrieve latest location for vehicle | Yes |
| GET | /api/location/history/:vehicleId | Retrieve location history with optional date range filtering | Yes |

### Query Parameters for Location History

- `from`: Start date in ISO 8601 format (optional)
- `to`: End date in ISO 8601 format (optional)

Example:
```
GET /api/location/history/vehicleId?from=2026-01-01&to=2026-01-31
```

## Simulation Details

The simulation engine generates realistic vehicle and location tracking data for system testing and demonstration.

### Data Generation Specifications

- **Number of Vehicles**: 200 vehicles are created with diverse characteristics
- **Vehicle Distribution**: Vehicles are distributed across different provinces, districts, and police stations
- **Location Data Points**: Each vehicle generates between 100-200 location records
- **Time Span**: Location data spans a 7-day period with realistic time intervals
- **Geographic Coverage**: Location points are generated within Sri Lankan administrative boundaries

### Simulation Outputs

The simulation generates:

- 200 vehicle documents with complete metadata
- 20,000-40,000 location log entries across all vehicles
- GPS coordinates with realistic latitude/longitude values
- Speed and heading telemetry data for each location point
- Properly timestamped records for historical analysis

### Use Cases

The simulation data enables:

- Performance testing with realistic database volumes
- UI/UX demonstration with comprehensive tracking data
- Historical analysis queries and reporting demonstrations
- Real-time tracking simulation scenarios
- System scalability validation

## Security

The system implements multiple security measures to protect data and ensure authorized access.

### Password Security

- Passwords are hashed using bcryptjs with a salt factor of 10
- Passwords are never stored in plain text format
- Password comparisons use cryptographic comparison methods to prevent timing attacks

### JWT Authentication

- JSON Web Tokens are cryptographically signed using the JWT_SECRET
- Tokens include user identification and role information
- Token expiration is set to 24 hours
- Expired tokens are rejected by authentication middleware

### Role-Based Access Control

- User roles (Admin, User) are enforced at the middleware level
- Protected endpoints verify user authentication and authorization before processing requests
- Administrative operations require explicit Admin role verification

### Database Security

- MongoDB Atlas IP Access List restricts database connections to authorized networks
- Database credentials are stored in environment variables and not committed to version control
- Connection strings use SSL/TLS encryption for data in transit

### CORS Configuration

- Cross-Origin Resource Sharing is configured to accept requests from authorized origins
- Prevents unauthorized cross-site request attacks

## Deployment

### Deployment Status

This project is currently in development and testing phase. The system is not yet deployed to a production environment.

### Recommended Deployment Platforms

For production deployment, consider the following platforms:

- **Heroku**: Easy deployment for Node.js applications
- **AWS Elastic Beanstalk**: Scalable cloud platform with auto-scaling capabilities
- **DigitalOcean App Platform**: Developer-friendly deployment platform
- **Azure App Service**: Microsoft cloud platform integration
- **Railway**: Modern deployment platform with Git integration

### Pre-Deployment Checklist

Before production deployment:

- Configure production environment variables securely
- Set up MongoDB Atlas production cluster with appropriate security groups
- Enable HTTPS/SSL certificates
- Configure domain name routing
- Implement request rate limiting
- Set up application monitoring and error logging
- Configure backup and disaster recovery procedures
- Perform security audits and penetration testing

## Author

Nipul Kanishka

## License

This project is developed for academic purposes as part of a university coursework assignment. All rights are reserved for educational use.

The use of this project is restricted to academic and educational contexts. Commercial use, redistribution, or modification without explicit permission is not permitted.
