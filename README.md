# To-Do App -- Server & Database

This is a simple to-do application built with Node.js, Express and MySQL. The application allows you to interact with SQL database and implement CRUD operation with respective routes.

## Setup
1. Clone this repository: 
```

$git clone git@github.com:sophorn-thun/todo-app-database.git

```
2. In terminal, install: 
                        
```
$npm install mysql2/promises
$npm install express
$npm install dotenv

```
3. Setup database: import todo_app.sql and update .env file with your database credentials:
```

  - MYSQL_HOST= your-database-host
  - MYSQL_USER= your-database-username
  - MYSQL_PASSWORD= your-database-password
  - MYSQL_DATABASE= your-database-name
  
```
4. Start runing on VS Code:         node server.js


## API Endpoints 
Use the following endpoints:
  - **POST /users/:userId/create-lists** : Create a new to-do list.
  - **DELETE /users/:userId/lists/:listId/delete-lists** : Delete a to-do list by its ID.
  - **POST /users/:userId/lists/:listId/insert-items** : Insert a new item into a to-do list. 
  - **DELETE /users/:userId/lists/:listId/items/:itemId/delete-items** : Delete an item from a to-do list by its ID.
  - **PUT /users/:userId/lists/:listId/items/:itemId/update-item-status** : Update the completion status of an item.
  - **PUT /users/:userId/lists/:listId/items/:itemId/add-list-reminder** : Add a reminder to a to-do list.
