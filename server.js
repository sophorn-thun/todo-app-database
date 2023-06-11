const express = require('express');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

// Connect to the ToDo App database
let connectionPool;

async function getConnection() {
  if (!connectionPool) {
    connectionPool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,

    });
    console.log('Connection pool created');
  }
  try {
    const connection = await connectionPool.getConnection();
    console.log('Connection acquired from the pool');
    return connection;
  } catch (error) {
    console.log('Errors occurred when acquiring a connection from the pool:', error);
    throw error;
  }
}

// Function to check if user exists
async function checkUser(userId) {
  try {
    const connection = await getConnection();
    const [result] = await connection.execute('SELECT COUNT(*) as count FROM User WHERE id = ?', [userId]);
    const count = result[0].count;
    return count > 0;
  } catch (error) {
    console.error('Failed to check if user exists: ', error);
    throw error;
  }
}

// Function to check if the list exists
async function checkListExists(userId, listId) {
  try {
    const connection = await getConnection();
    const [result] = await connection.execute('SELECT COUNT(*) as count FROM todo_list WHERE user_id = ? AND list_id = ?', [userId, listId]);
    const count = result[0].count;
    return count > 0;
  } catch (error) {
    console.error('Failed to check if the list exists:', error);
    throw error;
  }
}

// Function to check if the item exists
async function checkItemExists(userId, listId, itemId) {
  try {
    const connection = await getConnection();
    const [result] = await connection.execute('SELECT COUNT(*) as count FROM todo_item WHERE user_id = ? AND list_id = ? AND todo_id = ?', [userId, listId, itemId]);
    const count = result[0].count;
    return count > 0;
  } catch (error) {
    console.error('Failed to check if the item exists:', error);
    throw error;
  }
}


// Create new todo_list
app.post('/users/:userId/create-lists', async (req, res) => {
  try {
    const { userId } = req.params;
    const { listName, completionStatus, dueDate } = req.body;
    const connection = await getConnection();
    const userExists = await checkUser(userId);
    if (!userExists) {
      return res.status(404).send('User not found');
    }

    const [result] = await connection.execute('INSERT INTO todo_list (user_id, list_name, completion_status, due_date) VALUES (?, ?, ?, ?)', [userId, listName, completionStatus, dueDate]);
    const newListId = result.insertId;
    
    console.log('New to-do list created successfully');
    res.status(201).json({ newListId });
  } catch (error) {
    console.error('Failed to create to-do list:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete todo_list
app.delete('/users/:userId/lists/:listId/delete-lists', async (req, res) => {
  try {
    const { userId, listId } = req.params;
    const connection = await getConnection();
    const userExists = await checkUser(userId);
    if (!userExists) {
      return res.status(404).send('User not found');
    }

    const listExists = await checkListExists(userId, listId);
    if (!listExists) {
      return res.status(404).send('List not found')
    }

    const [result] = await connection.execute('DELETE FROM todo_list WHERE user_id = ? AND list_id = ?', [userId, listId]);
    console.log('To-do list deleted successfully');
    res.status(200).json({ result });
  } catch (error) {
    console.error('Failed to delete to-do list:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Insert todo_item
app.post('/users/:userId/lists/:listId/insert-items', async (req, res) => {
  try {
    const { userId, listId } = req.params;
    const { completionStatus, dueDate, description } = req.body;
    const connection = await getConnection();
    const userExists = await checkUser(userId);
    if (!userExists) {
      return res.status(404).send('User not found');
    }

    const [result] = await connection.execute('INSERT INTO todo_item (user_id, list_id, completion_status, due_date, description) VALUES (?, ?, ?, ?, ?)', [userId, listId, completionStatus, dueDate, description]);
    const newItemId = result.insertId;
    console.log('New todo_item created successfully');
    res.status(201).json({ newItemId });
  } catch (error) {
    console.error('Failed to insert todo_item:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Delete todo_item
app.delete('/users/:userId/lists/:listId/items/:itemId/delete-items', async (req, res) => {
  try {
    const { userId, listId, itemId } = req.params;
    const connection = await getConnection();
    const userExists = await checkUser(userId);
    if (!userExists) {
      return res.status(404).send('User not found');
    }

    const itemExists = await checkItemExists(userId, listId, itemId) 
    if (!itemExists) {
      return res.status(404).send('Item not found');
    }

    const [result] = await connection.execute('DELETE FROM todo_item WHERE user_id = ? AND list_id = ? AND todo_id = ?', [userId, listId, itemId]);
    console.log('Todo_item deleted successfully');
    res.status(200).json({ result });
  } catch (error) {
    console.error('Failed to delete todo_item:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Update item status
app.put('/users/:userId/lists/:listId/items/:itemId/update-item-status', async (req, res) => {
  try {
    const { userId, listId, itemId } = req.params;
    const { completionStatus } = req.body;
    const connection = await getConnection();
    const userExists = await checkUser(userId);
    if (!userExists) {
      return res.status(404).send('User not found');
    }

    const [result] = await connection.execute('UPDATE todo_item SET completion_status = ? WHERE user_id = ? AND list_id = ? AND todo_id = ?', [completionStatus, userId, listId, itemId]);
    console.log('Item status updated successfully');
    res.status(200).json({ result });
  } catch (error) {
    console.error('Failed to update item status:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Add reminder to the list
app.put('/users/:userId/lists/:listId/items/:itemId/add-list-reminder', async (req, res) => {
  try {
    const { userId, listId } = req.params;
    const { dueDate } = req.body;
    const connection = await getConnection();
    const userExists = await checkUser(userId);
    if (!userExists) {
      return res.status(404).send('User not found');
    }
    
    const [result] = await connection.execute('UPDATE todo_list SET due_date = ? WHERE user_id = ? AND list_id = ?', [dueDate, userId, listId]);
    console.log('Reminder added to the list successfully');
    res.status(200).json({ result });
  } catch (error) {
    console.error('Failed to add reminder to the list:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Invalid routes
app.use((req, res) => {
  res.status(404).send('Page not found/Invalid route');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
