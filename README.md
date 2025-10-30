# Express API with TypeScript

This project is a simple Express API built with TypeScript. It serves as a starting point for building RESTful APIs using modern JavaScript features.

## Project Structure

```
express-api
├── src
│   ├── app.ts                # Initializes the Express application and middleware
│   ├── server.ts             # Starts the server and handles errors
│   ├── routes
│   │   └── index.ts         # Defines application routes
│   ├── controllers
│   │   └── index.ts         # Contains request handlers for routes
│   └── types
│       └── index.ts         # Custom types for request and response objects
├── package.json              # npm configuration file
├── tsconfig.json             # TypeScript configuration file
└── README.md                 # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd express-api
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Build the project:**
   ```
   npm run build
   ```

4. **Run the server:**
   ```
   npm start
   ```

## Usage

Once the server is running, you can access the API at `http://localhost:3000`. You can define your routes and controllers in the `src/routes` and `src/controllers` directories, respectively.

## License

This project is licensed under the MIT License.# debt-manager-api
