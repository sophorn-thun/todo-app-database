# To-Do App -- Server & Database

This is a simple to-do application built with Node.js, Express and MySQL. The application allows you to interact with SQL database and implement CRUD operation with respective routes.

## Setup
1. You need to clone this repository: 
                   ```
                   $git clone git@github.com:sophorn-thun/todo-app-database.git
                   ```
2. In terminal, install: 
                        ```
                        $npm install mysql2
                        $npm install express
                        ```
3. Setup database: import todo.app.sql and update .env file with your database credentials:
                        ```
                         MYSQL_HOST=<your-database-host>
                         MYSQL_USER=<your-database-username>
                         MYSQL_PASSWORD=<your-database-password>
                         MYSQL_DATABASE=<your-database-name>
                         ```
4. Start runing:         
                         ```
                         &npm start
                         ```

## API Endpoints 
Use the following endpoints:
  - **POST /lists** : Create a new to-do list.
  - **DELETE /lists/:listId** : Delete a to-do list by its ID.
  - **POST /lists/:listId/items** : Insert a new item into a to-do list. 
  - **DELETE /lists/:listId/:itemId** : Delete an item from a to-do list by its ID.
  - **PUT /lists/completion/:listId/:itemId** : Update the completion status of an item.
  - **PUT /lists/reminder/:listId** : Add a reminder to a to-do list.
