const express = require('express');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

// Connect to the ToDo App database
async function getConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    });
    console.log('Connected to the database successfully');
    return connection;
  } catch (error) {
    console.log('Errors occurred when connecting to the database:', error);
    throw error;
  }
}

// Create new todo_list
app.post('/lists', async (req, res) => {
  try {
    const { listName, completionStatus, dueDate } = req.body;
    const connection = await getConnection();
    const [result] = await connection.execute('INSERT INTO todo_list (list_name, completion_status, due_date) VALUES (?, ?, ?)', [listName, completionStatus, dueDate]);
    const newListId = result.insertId;
    console.log('New to-do list created successfully');
    res.status(201).json({ newListId });
  } catch (error) {
    console.error('Failed to create to-do list:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete todo_list
app.delete('/lists/:listId', async (req, res) => {
  try {
    const { listId } = req.params;
    const connection = await getConnection();
    const [result] = await connection.execute('DELETE FROM todo_list WHERE list_id = ?', [listId]);
    console.log('To-do list deleted successfully');
    res.status(200).json({ result });
  } catch (error) {
    console.error('Failed to delete to-do list:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Insert todo_item
app.post('/lists/:listId/items', async (req, res) => {
  try {
    const { listId } = req.params;
    const { completionStatus, dueDate, description } = req.body;
    const connection = await getConnection();
    const [result] = await connection.execute('INSERT INTO todo_item (list_id, completion_status, due_date, description) VALUES (?, ?, ?, ?)', [listId, completionStatus, dueDate, description]);
    const newItemId = result.insertId;
    console.log('New todo_item created successfully');
    res.status(201).json({ newItemId });
  } catch (error) {
    console.error('Failed to insert todo_item:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Delete todo_item
app.delete('/lists/:listId/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    const connection = await getConnection();
    const [result] = await connection.execute('DELETE FROM todo_item WHERE todo_id = ?', [itemId]);
    console.log('Todo_item deleted successfully');
    res.status(200).json({ result });
  } catch (error) {
    console.error('Failed to delete todo_item:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Update item status
app.put('/lists/completion/:listId/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    const { completionStatus } = req.body;
    const connection = await getConnection();
    const [result] = await connection.execute('UPDATE todo_item SET completion_status = ? WHERE todo_id = ?', [completionStatus, itemId]);
    console.log('Item status updated successfully');
    res.status(200).json({ result });
  } catch (error) {
    console.error('Failed to update item status:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Add reminder to the list
app.put('/lists/reminder/:listId', async (req, res) => {
  try {
    const { listId } = req.params;
    const { dueDate } = req.body;
    const connection = await getConnection();
    const [result] = await connection.execute('UPDATE todo_list SET due_date = ? WHERE list_id = ?', [dueDate, listId]);
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
