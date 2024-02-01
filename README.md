# Book REST API

This repository contains a basic REST API built with NestJS for managing a collection of books. The API allows you to perform CRUD operations on the book collection.  [Click here to access the API Endpoints](https://erin-horse-sock.cyclic.app/api)

## Functionality

1. **Retrieve all books:**
   - Endpoint: `GET /books`
   - Returns a JSON response with an array of all books.

2. **Retrieve a specific book:**
   - Endpoint: `GET /books/:id`
   - Returns a JSON response with the details of the book matching the provided ID.

3. **Add a new book:**
   - Endpoint: `POST /books`
   - Adds a new book to the collection. The request body should contain the book details in JSON format.

4. **Update an existing book:**
   - Endpoint: `PUT /books/:id`
   - Updates the details of the book matching the provided ID. The request body should contain the updated book details in JSON format.

5. **Delete a book:**
   - Endpoint: `DELETE /books/:id`
   - Removes the book matching the provided ID from the collection.

## Requirements

1. **NestJS Version:**
   - The application is built using the latest version of NestJS.

2. **Database:**
   - Utilizes MSSQL as the chosen SQL database to store the book collection.

3. **Error Handling:**
   - Appropriate error handling and response status codes are implemented for different scenarios (e.g., book not found, invalid request).

4. **Unit Tests:**
   - Unit tests are written to verify the functionality of the API endpoints.

## How to Run and Test

1. **Environment Variables:**
   - Ensure that the following environment variables are set:
     - `MSSQL_HOST`: The host of your MSSQL database.
     - `MSSQL_PORT`: The port number for MSSQL (default is 1433).
     - `MSSQL_USERNAME`: Your MSSQL username.
     - `MSSQL_PASSWORD`: Your MSSQL password.
     - `MSSQL_DATABASE`: The name of your MSSQL database.

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start The Application:**
   ```bash
   npm run start
   ```

4. **Run Test:**
   ```bash
   npm run test
   ```
