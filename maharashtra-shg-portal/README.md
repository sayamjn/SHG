# Maharashtra SHG Portal

A complete web application for Self Help Groups (SHGs) in Maharashtra to register, access government schemes, and manage their group information.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [Accessibility](#accessibility)
- [Translation](#translation)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Maharashtra SHG Portal is a comprehensive platform developed for the Government of Maharashtra to help Self Help Groups access government schemes, register new members, and manage their information. The portal is built with a focus on accessibility, multilingual support (English, Hindi, Marathi), and mobile responsiveness.

## Features

- **Authentication System**: Group-based login with JWT-based authentication
- **Group Registration**: Complete registration system for new SHG members
- **Government Schemes**: Searchable database of government schemes with filtering options
- **Member Management**: Group-wise member listing with search, filter, and pagination
- **Accessibility Features**: 
  - High contrast mode
  - Font size adjustment
  - WCAG 2.1 AA compliance
  - Screen reader support
- **Multilingual Support**: 
  - English
  - Hindi
  - Marathi

## Technology Stack

### Frontend
- React.js
- Tailwind CSS
- React Router for navigation
- i18next for internationalization
- Axios for API calls
- React Icons
- React Toastify for notifications

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads
- Express Validator for input validation

## Project Structure

```
maharashtra-shg-portal/
|
├── client/ - React frontend
|   ├── public/ - Static files and translations
|   └── src/ - React components and logic
|       ├── components/ - Reusable UI components
|       ├── context/ - Context providers
|       ├── pages/ - Page components
|       └── utils/ - Utility functions
|
└── server/ - Node.js backend
    ├── config/ - Configuration files
    ├── controllers/ - Business logic
    ├── middleware/ - Custom middleware
    ├── models/ - Mongoose schemas
    ├── routes/ - API routes
    ├── validation/ - Input validation
    └── uploads/ - File uploads directory
```

## Prerequisites

- Node.js (v14.x or higher)
- MongoDB (v4.x or higher)
- npm or yarn

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/maharashtra-shg-portal.git
   cd maharashtra-shg-portal
   ```

2. Install server dependencies:
   ```
   cd server
   npm install
   ```

3. Install client dependencies:
   ```
   cd ../client
   npm install
   ```

## Environment Setup

### Server Environment (.env)

Create a `.env` file in the `server` directory with the following variables:

```
NODE_ENV=development
PORT=4000
MONGO_URI=mongodb://localhost:27017/maharashtra_shg_portal
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
UPLOAD_PATH=./uploads
```

### Client Environment (.env)

Create a `.env` file in the `client` directory:

```
REACT_APP_API_URL=http://localhost:4000/api
REACT_APP_NAME=Maharashtra SHG Portal
```

## Database Setup

1. Start MongoDB service on your machine
2. The application will connect to the database specified in the `MONGO_URI` environment variable
3. Seed initial data (optional):
   ```
   cd server
   npm run seed
   ```

## Running the Application

### Development Mode

1. Start the backend server:
   ```
   cd server
   npm run dev
   ```

2. In a separate terminal, start the frontend React app:
   ```
   cd client
   npm start
   ```

3. Access the application at `http://localhost:3000`

### Production Mode

1. Build the React frontend:
   ```
   cd client
   npm run build
   ```

2. Start the production server:
   ```
   cd ../server
   npm start
   ```

## Deployment

### Deploying to Heroku

1. Create a Heroku account and install the Heroku CLI
2. Initialize a git repository if not already done
3. Login to Heroku:
   ```
   heroku login
   ```
4. Create a new Heroku app:
   ```
   heroku create maharashtra-shg-portal
   ```
5. Add MongoDB addon or configure external MongoDB connection:
   ```
   heroku addons:create mongodb
   ```
6. Set environment variables:
   ```
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your_jwt_secret_key_here
   heroku config:set JWT_EXPIRE=30d
   ```
7. Deploy the application:
   ```
   git push heroku main
   ```

### Deploying to AWS

1. Create an EC2 instance with Ubuntu
2. Install Node.js, npm, and MongoDB
3. Clone the repository to the server
4. Set up environment variables
5. Build the React frontend
6. Use PM2 or similar to manage the Node.js process:
   ```
   npm install -g pm2
   cd server
   pm2 start server.js
   ```
7. Configure Nginx as a reverse proxy to your application

## Accessibility

This application follows WCAG 2.1 AA standards and includes:

- Semantic HTML elements
- ARIA roles and attributes
- High color contrast (minimum 4.5:1 ratio)
- Keyboard navigation support
- Font size adjustment
- Screen reader compatibility
- High contrast mode

## Translation

The application supports English, Hindi, and Marathi languages. Translation files are located in the `client/public/locales` directory.

To add a new language:
1. Create a new directory with the language code in `client/public/locales`
2. Create a `translation.json` file with the translations
3. Add the language option in `LanguageSelector.js`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.