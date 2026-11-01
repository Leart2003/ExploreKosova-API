# Explore Kosova API

A full-stack web application for discovering places in Kosovo, built with ASP.NET Core for the backend and React for the frontend. The platform allows users to browse locations, filter by category, view place details, save favorites, leave reviews, and authenticate using JWT-based security.

## Overview

Explore Kosova helps users discover points of interest across Kosovo using a map-based experience. It includes:

- Place discovery near a user’s location or a default city center
- Category-based filtering
- Place detail pages with ratings and reviews
- User authentication and authorization
- Favorite management
- Admin-only management for categories and places
- Integration with a SQL Server database and a React frontend

## Tech Stack

Backend
- ASP.NET Core 10
- Entity Framework Core
- ASP.NET Core Identity
- JWT Authentication
- SQL Server
- Swagger / OpenAPI

Frontend
- React 19
- React Router
- Axios
- Bootstrap
- Leaflet / React Leaflet

## Architecture

This repository is organized as a modular solution:

- `SmartCity-API/` — ASP.NET Core Web API
- `Domain/` — entities, DTOs, interfaces, and mapping profiles
- `Infrastructure/` — DbContext, repositories, database migrations
- `Application/` — application-layer project
- `frontend/` — React web client
- `SmartCityTest/` — test project

## Main Features

### Public API
- List all places
- Find nearby places by latitude/longitude/radius
- Get place by ID
- Get all categories
- Filter places by category

### Authentication
- Register new users
- Login with email and password
- JWT token generation
- Role-based access using Admin and Tourist roles
- Change password endpoint for authenticated users

### Place and Review Management
- Add, update, and delete categories (Admin only)
- Add, update, and delete places (Admin only)
- Add reviews and compute average ratings
- Favorite places for logged-in users
- Place images support via repository and DTO structures

## Repository Structure

```text
ExploreKosova-API/
├── SmartCity-API/
│   ├── Controllers/
│   ├── Properties/
│   ├── Program.cs
│   ├── appsettings.json
│   ├── appsettings.Development.json
│   ├── SmartCity-API.csproj
│   └── SmartCity-API.http
├── Domain/
│   ├── Dtos/
│   ├── Entities/
│   ├── Interface/
│   ├── Mappers/
│   └── *.csproj
├── Infrastructure/
│   ├── DB/
│   ├── Migrations/
│   ├── Repository/
│   └── *.csproj
├── Application/
│   └── *.csproj
├── SmartCityTest/
│   └── UnitTest1.cs
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
├── SmartCity-API.slnx
├── package-lock.json
├── .gitignore
└── README.md
```

## Prerequisites

Before running the project, make sure you have:

- .NET SDK 10.0 or later
- SQL Server instance
- Node.js 18+ and npm
- A browser to run the frontend

## Backend Setup

1. Open the solution project in the repository.
2. Update the connection string in `SmartCity-API/appsettings.json` to match your local SQL Server setup:

```json
"ConnectionStrings": {
  "DefaultConnection": "Data Source=YOUR_SERVER;Initial Catalog=SmartCity;Integrated Security=True; TrustServerCertificate=True"
}
```

3. Restore dependencies:

```bash
dotnet restore
```

4. Run the API:

```bash
dotnet run --project SmartCity-API/SmartCity-API.csproj
```

5. Swagger is enabled in development and can be accessed at:

```text
https://localhost:5001/swagger
```

The API uses JWT authentication, and the signing configuration is defined in `appsettings.json` under the `Jwt` section.

## Frontend Setup

1. Go to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the app:

```bash
npm start
```

The frontend will typically run on:

```text
http://localhost:3000
```

## Environment Notes

The frontend includes environment configuration in `frontend/.env` and uses API calls through the Axios instance defined in the app.

If your backend runs on a different port or host, update the API base URL accordingly.

## Authentication

The API exposes the following auth endpoints:

- `POST /api/Auth/register`
- `POST /api/Auth/login`
- `POST /api/Auth/change-password`

Authenticated requests use JWT bearer tokens. Tokens include claims such as:

- user ID
- email
- full name
- role

## Core API Endpoints

### Categories
- `GET /api/Category`
- `GET /api/Category/{id}`
- `POST /api/Category` (Admin only)
- `PUT /api/Category/{id}` (Admin only)
- `DELETE /api/Category/{id}` (Admin only)

### Places
- `GET /api/Places`
- `GET /api/Places/nearby?latitude={lat}&longitude={lng}&radiusKm={radius}&categoryId={id}`
- `GET /api/Places/{id}`
- `PUT /api/Places/{id}` (Admin only)
- `DELETE /api/Places/{id}` (Admin only)

### Reviews
- `GET /api/Reviews`
- `POST /api/Reviews`
- `PUT /api/Reviews/{id}`
- `DELETE /api/Reviews/{id}`

### Favorites
- `GET /api/Favorite`
- `POST /api/Favorite`
- `DELETE /api/Favorite/{id}`

## Data Model Highlights

The API models Kosovo travel destinations with properties such as:

- name
- description
- address
- city
- latitude
- longitude
- category
- images
- reviews
- favorite records

## Notes

This project is currently a local development application and is structured around a map-based discovery experience for places in Kosovo. The backend and frontend are separated, allowing the API to be consumed by a web client or future mobile client.

## Future Improvements

Potential enhancements include:

- image upload support for place photos
- more advanced admin dashboards
- search and pagination
- multilingual support
- production deployment configuration
- CI/CD pipeline
- testing improvements and expanded unit/integration coverage

## Contributing

Contributions are welcome. If you want to improve the project:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

