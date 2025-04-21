# Project README

## Overview
This is a simple project developed for practicing React Js, combining both frontend and backend technologies.

## Technologies Used

### Frontend
- ReactJs With Vite
- Tailwind CSS

### Backend
- NodeJs
- ExpressJs
- PostgreSql
- Drizzle ORM
- Supabase

## Setup Guide

### Prerequisites
- Node.js (version 18 or above)
- PostgreSQL
- npm package manager

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd /backend
   ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Prepare environment configuration:
- *Rename .env.template to .env*
- Update .env file with appropriate credentials

4. Migrate the DB with proper schema:
(This step should only done after proper configuration of DB and .env)

    ```bash
    npx drizzle-kit push
    ```

5. Start the backend server:
    ```bash
    npm start
    ```
6. Verify Database Connection:
- If terminal displays "DB connected ✅" - Setup successful! 🎉🥳
- If an error occurs, most likely due to incorrect credentials in .env
- Double-check your database connection details

*go to http://localhost:3000/api/v1/getallcater*
(To verfiy that backend is working fine)

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Prepare environment configuration:
- *Rename .env.template to .env*
- Update .env file with appropriate credentials
- Note: RazorPay API key is required for payment testing (optional)
- Note: Creating a [Supabase](https://www.supabase.com) is mandatory to run the project successfully.

4. Start the frontend development server:
    ```bash
    npm run dev
    ```


*Visit http://localhost:3001 to use the application*


### Troubleshooting
- Verify all credentials in .env files
- Ensure PostgreSQL is running
- Check Node.js version compatibility

- If you encounter any issues during setup, please raise an issue in the project repository.

### Happy Hacking🎉!

![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/jey-exp/Cater?utm_source=oss&utm_medium=github&utm_campaign=jey-exp%2FCater&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)
