const express = require('express');
const app = express();
const port = 3000;
const authRoutes = require('../routes/authRoutes');

app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});