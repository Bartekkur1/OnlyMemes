import express from 'express';

const app = express();

app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});