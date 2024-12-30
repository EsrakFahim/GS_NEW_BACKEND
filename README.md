# API Documentation

This document provides an overview of the API routes available in the application.

## Base URL

The base URL for all API endpoints is `/api/v1`.

## Routes

### Client Routes

- **Endpoint:** `/api/v1/client`
- **Description:** Handles client-related operations.
- **File:** [src/routes/client.routes.js](src/routes/client.routes.js)

### Contact Routes

- **Endpoint:** `/api/v1/contact`
- **Description:** Handles contact-related operations.
- **File:** [src/routes/contact.routes.js](src/routes/contact.routes.js)

### Service Routes

- **Endpoint:** `/api/v1/service`
- **Description:** Handles service-related operations.
- **File:** [src/routes/service.routes.js](src/routes/service.routes.js)

### Projects Routes

- **Endpoint:** `/api/v1/projects`
- **Description:** Handles project-related operations.
- **File:** [src/routes/projects.routes.js](src/routes/projects.routes.js)

### Team Member Routes

- **Endpoint:** `/api/v1/team-member`
- **Description:** Handles team member-related operations.
- **File:** [src/routes/teamMember.routes.js](src/routes/teamMember.routes.js)

### Price Plan Routes

- **Endpoint:** `/api/v1/price-plan`
- **Description:** Handles price plan-related operations.
- **File:** [src/routes/pricePlan.routes.js](src/routes/pricePlan.routes.js)

### Agency Stats Routes

- **Endpoint:** `/api/v1/agency-stats`
- **Description:** Handles agency stats-related operations.
- **File:** [src/routes/agencyStats.routes.js](src/routes/agencyStats.routes.js)

### Home Page Routes

- **Endpoint:** `/api/v1/home-page`
- **Description:** Handles home page-related operations.
- **File:** [src/routes/homeItems.routes.js](src/routes/homeItems.routes.js)

### About Page Routes

- **Endpoint:** `/api/v1/about-page`
- **Description:** Handles about page-related operations.
- **File:** [src/routes/aboutItems.routes.js](src/routes/aboutItems.routes.js)

## Middleware

The application uses the following middleware:

- **CORS:** Configured to allow all origins and credentials.
- **Cookie Parser:** Parses cookies attached to the client request object.
- **JSON Parser:** Parses incoming requests with JSON payloads.
- **URL-encoded Parser:** Parses incoming requests with URL-encoded payloads.
- **Static Files:** Serves static files from the `public` directory.

## Setup

To set up the application, follow these steps:

1. Install dependencies:
   ```sh
   npm install