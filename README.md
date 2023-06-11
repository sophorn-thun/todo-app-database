# To-Do App -- Server & Database

This is a simple to-do application built with Node.js, Express and MySQL. The application allows you to interact with SQL database and implement CRUD operation with respective routes.

## Setup
1. Clone this repository: 
```

$git clone git@github.com:sophorn-thun/todo-app-database.git

```
2. In terminal, install: 
                        
```
$npm install mysql2
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
  - **POST /:userId/lists** : Create a new to-do list.
  - **DELETE /:userId/:listId** : Delete a to-do list by its ID.
  - **POST /:userId/:listId/items** : Insert a new item into a to-do list. 
  - **DELETE /:userId/:listId/:itemId** : Delete an item from a to-do list by its ID.
  - **PUT /:userId/:listId/item/:itemId** : Update the completion status of an item.
  - **PUT /:userId/list/:listId/reminder** : Add a reminder to a to-do list.
