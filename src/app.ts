import 'reflect-metadata';
import express from 'express';
import { postgresDataSource, mongoDataSource } from './dataSource';

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize PostgreSQL connection
postgresDataSource
  .initialize()
  .then(() => {
    console.log('PostgreSQL connected');
  })
  .catch((err: string) => {
    console.error('Error connecting to PostgreSQL', err);
  });

// Initialize MongoDB connection
mongoDataSource
  .initialize()
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err: string) => {
    console.error('Error connecting to MongoDB', err);
  });

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


