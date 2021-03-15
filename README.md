# todo-todone-tada

#### Setting Up and Starting a Local Server

1. Install dependencies from the root directory of the project

   ```bash
   pipenv install -r requirements.txt
   ```

2. Typically, I would have have users create a new `.env` file based off the `.env.example`, however, since there is no concern of security, the `.env` file is included.
3. Setup your PostgreSQL user, password and database and make sure it matches your `.env` file.
   ```sh
   CREATE USER ttt_app WITH CREATEDB PASSWORD 'strong1password';
   CREATE DATABASE todo_todone_tada WITH OWNER ttt_app;
   \q
   ```

4. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask run
   ```

5. To run the React App in development, in a separate terminal:

   ```
   cd client
   ```

   ```
   npm install
   ```

   ```
   npm start
   ```
