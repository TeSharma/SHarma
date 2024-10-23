const express = require('express');
const app = express();
const port = 3001; 

app.use(express.json()); 


app.post('/trades', (req, res) => {
  const tradeData = req.body;
  console.log(tradeData);
  res.json({ message: 'Trade received successfully' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});