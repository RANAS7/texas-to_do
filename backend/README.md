# Todo Backend API

Node.js TypeScript backend for the Todo application with complete CRUD operations, scheduling, and status management.

## Features

- ✅ Complete CRUD operations for todos
- 📅 Task scheduling with due dates
- 🎯 Priority levels (low, medium, high)
- 📊 Status management (pending, in-progress, completed, cancelled)
- 🔍 Filtering and sorting capabilities
- ✨ Input validation
- 🛡️ Security middleware
- 📝 Comprehensive logging

## API Endpoints

### Todos
- `GET /api/todos` - Get all todos (with optional filtering)
- `GET /api/todos/:id` - Get todo by ID
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

### Health Check
- `GET /api/health` - Server health status

## Query Parameters

### GET /api/todos
- `status` - Filter by status (pending, in-progress, completed, cancelled)
- `priority` - Filter by priority (low, medium, high)
- `sortBy` - Sort by field (createdAt, dueDate, priority)
- `sortOrder` - Sort order (asc, desc)

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
npm start
```

## Environment Variables

```
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```