# Test Management System

A modern Test Management System built using **React 19**, **TypeScript**, **Redux Toolkit**, and **Tailwind CSS**. The application allows administrators to create, manage, and track tests through an intuitive dashboard.

---

## Features

### Authentication
- Login with JWT Authentication
- Protected Routes
- Axios Interceptors
- Automatic Logout on Unauthorized Access

### Dashboard
- View all tests
- Responsive Data Table
- Search & Filter
- Sort by Test Name & Created Date
- Pagination
- Status Badges
- Edit / View / Delete Actions

### Test Creation
- Create New Test
- Edit Existing Test
- Subject Selection
- Topic & Sub-topic Selection
- Marking Scheme
- Difficulty Level
- Save as Draft
- Publish Test

### Question Management
- Add Questions
- Edit Questions
- Preview Test

---

# Tech Stack

| Technology | Version |
|------------|----------|
| React | 19 |
| TypeScript | Latest |
| Redux Toolkit | Latest |
| React Router DOM | v7 |
| Tailwind CSS | v4 |
| Axios | Latest |
| React Hook Form | Latest |
| Zod | Latest |
| React Hot Toast | Latest |
| Lucide React | Latest |
|react-quill | 
| papaparse |
---

# Project Structure

```text
src/
│
├── api/
│   ├── axios.ts
│   ├── endpoints.ts
│   └── test.api.ts
│
├── assets/
│
├── components/
│   ├── r-Button/
│   ├── r-DropDown/
│   ├── r-Input/
│   ├── r-Table/
│   ├── Sidebar/
│   └── ...
│
├── features/
│   ├── actions/
│   ├── reducers/
│   └── store.ts
│
├── hooks/
│
├── layouts/
│
├── pages/
│
├── routes/
│
├── schemas/
│
├── types/
│
├── utils/
│
└── App.tsx
```

---

# Installation

Clone the repository

```bash
git clone <repository-url>
```

Move into project

```bash
cd test-management-system
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

---

# Environment Variables

Create a `.env` file in the project root.

```env
VITE_API_URL=https://your-api-url/api
```

---

# Available Scripts

Start development server

```bash
npm run dev
```

Build project

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

Lint

```bash
npm run lint
```

---

# API Integration

## Authentication

```
POST /auth/login
```

## Tests

```
GET /tests
POST /tests
PUT /tests/:id
DELETE /tests/:id
```

---

# Dashboard Features

- Sticky Header
- Sorting
- Pagination
- Search
- Status Badges
- Action Buttons

---

# State Management

Redux Toolkit is used for:

- Tests
- Subjects
- Topics
- Sub Topics

Architecture

```
API
   ↓
AsyncThunk
   ↓
Redux Slice
   ↓
Custom Hook
   ↓
Component
```

---

# Reusable Components

- Button
- Input
- Dropdown
- Table
- Status Badge
- Sidebar
- Header
- Pagination
- Table etc


---

# UI Highlights

- Responsive Design
- Clean Dashboard
- Professional Table Layout
- Mobile Friendly
- Accessible Components
- Modern Tailwind UI

---

# Future Enhancements

- Server-side Pagination
- Advanced Filters
- Bulk Actions
- Import/Export Tests
- Dark Mode
- Analytics Dashboard
- Role-based Access Control

---


**Mazhar Shaikh**

Frontend Developer ReactJS | NextJs | Angular 19 | MUI | Node.js | Express.js etc

- TypeScript
- Redux Toolkit
- Tailwind CSS

---
