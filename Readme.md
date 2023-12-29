# E-Commerce Backend

This is the backend for an upcoming E-Commerce Flutter app. It provides the server-side functionality needed for the app, including user authentication, product management, and more.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization
- Product management (CRUD operations)
- Order processing

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/theatulgupta/E-Commerce-Backend.git

### Usage

- Describe how to use your backend. Include information on authentication, API endpoints, and any other relevant details.

1. Navigate to the project directory

   ```bash
   cd E-Commerce-Backend

2. Install dependencies

   ```bash
   npm install

3. Set up environment variables

   - Create a .env file in the root directory and add the necessary environment variables.

    ```bash
    PORT=5000
    DB_CONNECTION_URI=mongodb://localhost:27017/e_commerce
    JWT_SECRET=your_jwt_secret_key

### API Endpoints

- Provide a list of important API endpoints and their descriptions.
  - POST /api/v1/users/createAccount: Register a new user.
  - POST /api/v1/users/login: Log in and receive a JWT token.

- For more detailed documentation, refer to API Documentation.

### Contributing

- Contributions are welcome! Please follow our contribution guidelines.

### License

- This project is licensed under the MIT License.
