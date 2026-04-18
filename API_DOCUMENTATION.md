# Projects API Documentation

## Base URL
```
http://localhost:3000/api/projects
```

## Endpoints

### 1. GET - Fetch All Projects
**Endpoint:** `GET /api/projects`

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Project Name",
    "description": "Project description",
    "location": "Location",
    "budget": 5000,
    "status": "active",
    "startDate": "2024-01-01T00:00:00Z",
    "endDate": "2024-12-31T00:00:00Z",
    "latitude": null,
    "longitude": null,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
]
```

---

### 2. POST - Create a New Project
**Endpoint:** `POST /api/projects`

**Request Body:**
```json
{
  "name": "New Project",
  "description": "Project description",
  "location": "Project location",
  "budget": 5000,
  "startDate": "2024-01-01",
  "endDate": "2024-12-31"
}
```

**Response (201 Created):**
```json
{
  "id": "uuid",
  "name": "New Project",
  "description": "Project description",
  "location": "Project location",
  "budget": 5000,
  "status": "active",
  "startDate": "2024-01-01T00:00:00Z",
  "endDate": "2024-12-31T00:00:00Z",
  "latitude": null,
  "longitude": null,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

---

### 3. PUT - Update a Project
**Endpoint:** `PUT /api/projects`

**Request Body:**
```json
{
  "id": "project-uuid",
  "name": "Updated Project Name",
  "description": "Updated description",
  "location": "Updated location",
  "budget": 10000,
  "startDate": "2024-01-01",
  "endDate": "2024-12-31"
}
```

**Response (200 OK):**
```json
{
  "id": "project-uuid",
  "name": "Updated Project Name",
  "description": "Updated description",
  "location": "Updated location",
  "budget": 10000,
  "status": "active",
  "startDate": "2024-01-01T00:00:00Z",
  "endDate": "2024-12-31T00:00:00Z",
  "latitude": null,
  "longitude": null,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-02T00:00:00Z"
}
```

---

### 4. DELETE - Delete a Project
**Endpoint:** `DELETE /api/projects`

**Request Body:**
```json
{
  "id": "project-uuid"
}
```

**Response (200 OK):**
```json
{
  "message": "Project deleted successfully"
}
```

---

### 5. GET - Fetch a Single Project by ID
**Endpoint:** `GET /api/projects/[id]`

**Example:** `GET /api/projects/project-uuid`

**Response (200 OK):**
```json
{
  "id": "project-uuid",
  "name": "Project Name",
  "description": "Project description",
  "location": "Location",
  "budget": 5000,
  "status": "active",
  "startDate": "2024-01-01T00:00:00Z",
  "endDate": "2024-12-31T00:00:00Z",
  "latitude": null,
  "longitude": null,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

---

### 6. DELETE - Delete a Project by ID
**Endpoint:** `DELETE /api/projects/[id]`

**Example:** `DELETE /api/projects/project-uuid`

**Response (200 OK):**
```json
{
  "message": "Project deleted successfully"
}
```

---

## Example cURL Requests

### Create a Project
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Agricultural Survey 2024",
    "description": "Comprehensive agricultural survey",
    "location": "Rural Area",
    "budget": 50000,
    "startDate": "2024-02-01",
    "endDate": "2024-12-31"
  }'
```

### Get All Projects
```bash
curl http://localhost:3000/api/projects
```

### Update a Project
```bash
curl -X PUT http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "id": "project-uuid",
    "name": "Updated Survey",
    "description": "Updated description",
    "location": "Updated location",
    "budget": 60000,
    "startDate": "2024-02-01",
    "endDate": "2024-12-31"
  }'
```

### Delete a Project
```bash
curl -X DELETE http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"id": "project-uuid"}'
```

---

## Error Handling

All endpoints return appropriate status codes:
- **200**: Success
- **201**: Created
- **400**: Bad Request (missing required fields)
- **404**: Not Found (resource doesn't exist)
- **500**: Internal Server Error

Error Response Example:
```json
{
  "error": "Project name is required"
}
```
