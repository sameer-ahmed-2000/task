# Project Setup

## Clone the Repository

To get started, you need to clone the repository to your local machine. Follow these steps:

1. **Open your terminal or command prompt** and navigate to the directory where you want to clone the project.

2. **Clone the repository** using Git:

   ```bash
   git clone https://github.com/sameer-ahmed-2000/task.git


## Running the Backend

1. **Navigate to the backend directory**:

   ```bash
   cd task

2. **Install the backend dependencies**:

   ```bash
   npm install


3. **Run the backend**:

   ```bash
   npm run dev

4. **It will be running in 8000 port**
   http://localhost:8000

## Running the Frontend

1. **Navigate to the backend directory**:

   ```bash
   cd client

2. **Install the frontend dependencies**:

   ```bash
   npm install


3. **Run the frontend**:

   ```bash
   npm run dev

4. **It will be running in 8000 port**
   http://localhost:5173



## API Endpoints

### 1. Fetch Titles
- **Endpoint**: `GET /api/titles`
- **Description**: Retrieves a list of titles from the database.
- **Request**:
  - **Headers**: 
    - `Authorization`: Bearer token for authentication (if applicable).
- **Response**:
  - **Status Code**: `200 OK`
  - **Body**:
    ```json
    {
      "titles": [
        {
          "uuid": "string",
          "title": "string",
          "subject": "string",
          "description": "string"
        }
      ]
    }
    ```
  - **Error Response**:
    - **Status Code**: `500 Internal Server Error`
    - **Body**:
      ```json
      {
        "error": "Error message"
      }
      ```

### 2. Delete Title
- **Endpoint**: `DELETE /api/titles/:uuid`
- **Description**: Deletes a title specified by the UUID.
- **Request**:
  - **Parameters**: 
    - `uuid`: The unique identifier for the title to be deleted.
  - **Headers**:
    - `Authorization`: Bearer token for authentication (if applicable).
- **Response**:
  - **Status Code**: `204 No Content`
  - **Body**: No content.
  - **Error Response**:
    - **Status Code**: `404 Not Found`
    - **Body**:
      ```json
      {
        "error": "Title not found"
      }
      ```
    - **Status Code**: `500 Internal Server Error`
    - **Body**:
      ```json
      {
        "error": "Error message"
      }
      ```

### 3. Create New Title
- **Endpoint**: `POST /api/titles`
- **Description**: Creates a new title.
- **Request**:
  - **Headers**:
    - `Content-Type`: `application/json`
    - `Authorization`: Bearer token for authentication (if applicable).
  - **Body**:
    ```json
    {
      "title": "string",
      "subject": "string",
      "description": "string"
    }
    ```
- **Response**:
  - **Status Code**: `201 Created`
  - **Body**:
    ```json
    {
      "uuid": "string",
      "title": "string",
      "subject": "string",
      "description": "string"
    }
    ```
  - **Error Response**:
    - **Status Code**: `400 Bad Request`
    - **Body**:
      ```json
      {
        "error": "Validation error message"
      }
      ```
    - **Status Code**: `500 Internal Server Error`
    - **Body**:
      ```json
      {
        "error": "Error message"
      }
      ```


### 5. User Login
- **Endpoint**: `POST /api/login`
- **Description**: Authenticates a user and returns a token.
- **Request**:
  - **Headers**:
    - `Content-Type`: `application/json`
  - **Body**:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
- **Response**:
  - **Status Code**: `200 OK`
  - **Body**:
    ```json
    {
      "token": "string",  // The JWT token for subsequent requests
    }
    ```
  - **Error Response**:
    - **Status Code**: `401 Unauthorized`
    - **Body**:
      ```json
      {
        "error": "Invalid credentials"
      }
      ```
    - **Status Code**: `500 Internal Server Error`
    - **Body**:
      ```json
      {
        "error": "Error message"
      }
      ```


