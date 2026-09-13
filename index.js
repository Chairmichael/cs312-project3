const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {

  const cards = [
    { title: 'Card One', description: 'First card content' },
    { title: 'Card Two', description: 'Second card content' },
  ];
  const post_tags = [
    'Tech', 'Lifestyle', 'Education'
  ];
  res.render('index', { cards, post_tags });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

