const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
// Temporary storage for validated data
let formData = [];
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.post('/submit', (req, res) => {
  const { name, email, age, gender, interests } = req.body;
  // Server-side validation
  if (!name || !email || !age || isNaN(age) || !gender || !interests) {
    return res.status(400).send('Invalid input');
  }
  // Store validated data
  const userData = {
    name,
    email,
    age,
    gender,
    interests: Array.isArray(interests) ? interests : [interests]
  };

  formData.push(userData);
  console.log('Stored Form Data:', formData);
  res.redirect('/submitted');
});

app.get('/submitted', (req, res) => {
  res.sendFile(__dirname + '/public/submitted.html');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
