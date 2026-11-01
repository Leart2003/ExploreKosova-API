# Explore Kosova API

This project is a simple full-stack app for finding places in Kosovo. I made it with a C# ASP.NET Core API on the backend and a React app on the frontend.

The app lets users:
- see places on a map
- filter places by category
- view details of a place
- login/register
- save favorite places
- leave reviews
- manage places and categories if they are admin

## What I used

Backend:
- ASP.NET Core
- Entity Framework Core
- SQL Server
- Identity
- JWT for login
- Swagger

Frontend:
- React
- React Router
- Axios
- Bootstrap
- Leaflet

## Project structure

```text
ExploreKosova-API/
├── SmartCity-API/
│   ├── Controllers/
│   ├── Program.cs
│   ├── appsettings.json
│   └── SmartCity-API.csproj
├── Domain/
│   ├── Entities/
│   ├── Dtos/
│   ├── Interface/
│   └── Mappers/
├── Infrastructure/
│   ├── DB/
│   ├── Repository/
│   └── Migrations/
├── Application/
├── SmartCityTest/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── SmartCity-API.slnx
├── README.md
└── .gitignore
```

## Main idea

The app is basically a tourist app for Kosovo. Users can search for places nearby, look at information about them, and see them on a map. The backend handles the database and API requests, and the frontend shows everything to the user.

## How to run the backend

1. Open the project in Visual Studio or VS Code.
2. Change the connection string in `SmartCity-API/appsettings.json` to your own SQL Server.

Example:

```json
"ConnectionStrings": {
  "DefaultConnection": "Data Source=YOUR_SERVER;Initial Catalog=SmartCity;Integrated Security=True; TrustServerCertificate=True"
}
```

3. Run this command:

```bash
dotnet restore
```

4. Then start the API:

```bash
dotnet run --project SmartCity-API/SmartCity-API.csproj
```

5. Swagger should open in the browser if you run it in development mode.

## How to run the frontend

1. Go to the frontend folder:

```bash
cd frontend
```

2. Install the packages:

```bash
npm install
```

3. Start the app:

```bash
npm start
```

It usually opens on:

```text
http://localhost:3000
```

## Some endpoints

Here are the main API routes:

### Auth
- `POST /api/Auth/register`
- `POST /api/Auth/login`
- `POST /api/Auth/change-password`

### Categories
- `GET /api/Category`
- `POST /api/Category` (admin only)
- `PUT /api/Category/{id}` (admin only)
- `DELETE /api/Category/{id}` (admin only)

### Places
- `GET /api/Places`
- `GET /api/Places/nearby`
- `GET /api/Places/{id}`
- `PUT /api/Places/{id}` (admin only)
- `DELETE /api/Places/{id}` (admin only)

### Reviews and favorites
- `GET /api/Reviews`
- `POST /api/Reviews`
- `GET /api/Favorite`
- `POST /api/Favorite`

## Notes

This project is still a student/project-style app, so it is not perfect. Some things can be improved later like better validation, cleaner code, better admin pages, and deployment setup.

I used JWT for login and ASP.NET Identity for users. The frontend talks to the backend using Axios.

## Future improvements

Maybe later I can add:
- better image upload
- search by name
- pagination
- more admin features
- better design
- production deployment

## Final comment

This project was a good learning project for me because I got to work with both backend and frontend, database design, auth, and map features together.

