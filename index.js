const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const cards = [
    {
        title: 'Card One',
        description: 'First card content',
        author: 'John',
        tag: 'Tech',
        createdAt: new Date('2026-09-10T14:30:00'),
        id: '50b1d5e7-04a3-401c-9f74-cc51ce331b89',
    },
    {
        title: 'Card Two',
        description: 'Second card content',
        author: 'Jeffrey Alexander Montgomery-Smith',
        tag: 'Education',
        createdAt: new Date('2026-09-12T09:15:00'),
        id: '70d471ad-bf98-4520-a6d0-edc4578a2a39',
    },
];
const post_tags = [
    'Tech', 'Lifestyle', 'Education', 'Hobby', 'Business'
];

app.get('/', (req, res) => {
    const testarr = ['a', 'b', 'c'];
    res.render('index', { cards, post_tags });
});

app.post('/', (req, res) => {
    const { postId, username, title, tags, body } = req.body;
    const existingPostIndex = cards.findIndex((card) => card.id === postId);

    const updatedPost = {
        title,
        description: body,
        author: username,
        tag: tags,
        createdAt: existingPostIndex === -1 ? new Date() : cards[existingPostIndex].createdAt,
        id: postId,
    };

    if (existingPostIndex === -1) {
        cards.push(updatedPost);
    } else {
        cards[existingPostIndex] = updatedPost;
    }

    console.log(updatedPost);

    res.redirect('/');
});

app.post('/delete', (req, res) => {
    const postIndex = cards.findIndex((card) => card.id === req.body.postId);

    if (postIndex !== -1) {
        cards.splice(postIndex, 1);
    }

    console.log(updatedPost);
    res.sendStatus(204);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

