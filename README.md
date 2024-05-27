# PhoneSpamChecker API

This project is a RESTful API for a mobile app that helps users identify spam phone numbers and find a person's name by searching for their phone number. It is built using Node.js with the Express framework and uses PostgreSQL as the relational database along with Prisma as the ORM.

## Hosted

Server - AWS EC2

Database - AWS RDS

## Features

1. **User Registration and Authentication**
      - Users can register with their name, phone number, and password.
      - Email address is optional.
      - Each phone number can be registered only once.
      - Authentication is required for all actions.
2. **User Contacts Management**
      - Users can have zero or more personal contacts.
      - Contacts are imported automatically (implementation of the import is assumed and not provided).
3. **Spam Reporting**
      - Users can mark any phone number as spam.
      - Spam reports are stored in a global database accessible by all users.
4. **Search Functionality**
      - Search by name: Find people by name in the global database.
           - Results are ordered by names starting with the query first, then names containing the query.
      - Search by phone number: Find people by phone number in the global database.
           - If a registered user has the phone number, only that result is shown.
           - Otherwise, all contacts matching the phone number are shown.
      - Search results include the name, phone number, and spam likelihood.
5. **Profile Viewing**
      - View all details of a person from search results.
      - Emails are shown only if the person is a registered user and the viewer is in their contact list.

## Installation

### Prerequisites

- Node.js
- PostgreSQL

### Steps

1.    Clone the repository:

      ```
      git clone https://github.com/arkajyotiadhikary/PhoneSpamChecker-API.git
      cd PhoneSpamChecker
      ```

2.    Install dependencies:

      ```
      npm install
      tsc
      ```

3.    Configure environment variables:
      Create a `.env` file in the root directory with the following content:
      `   DATABASE_URL= "YOUR DB INSTANCE URI"
JWT_SECRET="yourmysecretkey"
TOKEN_EXPIRES="24h"`
4.    Set up the database:

      ```
      npx prisma migrate dev --name init
      ```

5.    Start the server:

      ```
      npm start
      ```

## Auto Populate Database

Uncomment **_populateDB()_** in app.ts and rebuild the project

## **API Endpoints**

### **Authentication**

- **POST /register**: Register a new user.
     - Request: **`{ "name": "John Doe", "phone": "1234567890", "password": "password", "email": "john@example.com" }`**
     - Response: **`200 OK`**
- **POST /login**: Log in an existing user.
     - Request: **`{ "phone": "1234567890", "password": "password" }`**
     - Response: **`200 OK`**

### **Contacts**

- **GET /search/users/contacts/**: Get the list of contacts for the logged-in user by name.
     - Response: **`200 OK`**
- **POST /users/contact**: Add a new contact for the logged-in user.
     - Request: **`{ "name": "Jane Doe", "phone": "0987654321", "email": "jane@example.com" }`**
     - Response: **`200 OK`**

### **Spam Reporting**

- **POST /markAsSpam**: Mark a phone number as spam.
     - Request: **`{ "phone": "0987654321" }`**
     - Response: **`200 OK`**
- **GET /search/phone-number/getSpamCounts**: Get the phone numbers ordered by highest spam count.
     - Response: **`200 OK`**
- **GET /search/phone-number/getSpamNumbers**: Get the phone numbers where spam count is greater than 5.
     - Response: **`200 OK`**

### **Search**

- **GET /search/users/name/**: Search for a person by name.
     - Response: **`200 OK`**
- **GET /search/users/phone-number/**: Search for a person by phone number.
     - Response: **`200 OK`**
- **GET /search/users/all**: Get all users.
     - Response: **`200 OK`**
- **GET /search/users/**: Get user details by user ID.
     - Response: **`200 OK`**

## Testing

- Partially Done - TODO

## Security Considerations

- Ensuring all endpoints are protected and require authentication.
- Storing passwords securely using hashing (e.g., bcrypt).
- Validating all inputs using JOI to prevent SQL injection and other attacks.
- Implemented rate limiting to protect against brute force attacks.

## Performance and Scalability

- TODO

##
