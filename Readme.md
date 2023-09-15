
# dashing app

This is a small full stack typescript app to login a user and list a collection of users while being able to add, delete and modify if you are an admin user.
The back end is very basic and seeks to provide data for the frontend to simulate a login and provide user data. This would normally be handled by an auth library with jwts. In our case we retrieve a user based on user login details and set the user in local storage.

## Getting Started

These instructions will guide you through the process of setting up the project on your local machine for development and testing purposes.

### Prerequisites

- [Node.js and npm](https://nodejs.org/en/download/) are required.

### Installing

The repo consists of a client and server, you will need to npm i at root level, client and server


1. **Clone the repository:**

   ```bash
   git clone https://github.com/srlyttle/dashing-app
   cd dashing-app
Install the  dependencies:
npm run install:all


To run both the client and server i have installed concurrently which will spin up client and server:

In project root and run
npm run dev

This command will start both the client and server applications concurrently. By default, the client will run on port 3000 and the server on port 3001, unless specified otherwise in their respective configuration.

There are 2 users set up to test at (Viewer, Editor) levels.
```javascript
[
      {
        id: '1234',
        username: 'john34',
        firstName: 'john',
        lastName: 'doe',
        role: 'editor',
        email: 'john34@gmail.com',
        password: 'T@1234567Ks',
      },
      {
        id: '5678',
        username: 'peter12',
        firstName: 'peter',
        lastName: 'jones',
        role: 'viewer',
        email: 'peter12@gmail.com',
        password: 'T@1234567Ks',
      },
    ]
```

After running npm run dev you will be redirected to the login screen, enter a username and password from one of the above users and you will be redirected to the users screen. 
The viewer can only view the user data, a user with the editor role can select a row and edit or delete it. They can also add a new role via the user form.
To log out select the use profile menu on the navbar and logout to login as a different user

Built With
React - Client-side framework.
Node.js - Server-side runtime.
Concurrently - Tool for running multiple npm scripts concurrently.

Authors
Simon Lyttle
