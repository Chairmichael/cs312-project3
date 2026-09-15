const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const cards = [
    {
        title: 'Coffee',
        description: 'Just switched to a pour-over setup and honestly the difference is night and day.',
        author: 'Mia',
        tag: 'Lifestyle',
        createdAt: new Date('2026-09-11T08:05:00'),
        id: crypto.randomUUID(),
    },
    {
        title: 'Refactoring Our Auth Flow: Lessons From a Painful Migration',
        description: 'We spent three weeks migrating from session-based auth to JWTs and hit almost every pitfall along the way. This post covers what broke, why it broke, and the checklist we wish we had at the start. The first mistake was assuming we could swap the underlying mechanism without touching anything downstream, but token expiration, refresh logic, and CORS headers all needed to be reworked in tandem. We underestimated how much of our session middleware had quietly become load-bearing for things unrelated to login, like rate limiting and analytics tracking, and untangling those dependencies ate up more time than the migration itself. Testing in staging gave us false confidence since our traffic patterns there never matched production, so a handful of edge cases around token refresh races only showed up once real users hit them. We also learned the hard way that rotating signing keys without a grace period locks out anyone with a token issued in the last few minutes. By the end we had a much better mental model of the tradeoffs, and a runbook we now hand to anyone touching auth on the team.',
        author: 'Derek Owusu',
        tag: 'Tech',
        createdAt: new Date('2026-09-13T16:42:00'),
        id: crypto.randomUUID(),
    },
    {
        title: 'Why I Started Journaling Again',
        description: 'Picked up an old habit after a long break. A few pages in, I already notice I am thinking more clearly before big decisions.',
        author: 'Priya Nandakumar',
        tag: 'Hobby',
        createdAt: new Date('2026-09-09T21:10:00'),
        id: crypto.randomUUID(),
    },
    {
        title: 'Scaling a Two-Person Startup Without Losing Your Mind',
        description: 'No hiring budget, no runway to spare, and a growing customer base. Here is how we prioritized ruthlessly, automated the boring stuff, and said no to almost everything else.',
        author: 'Samuel T. Whitfield-Brooks',
        tag: 'Business',
        createdAt: new Date('2026-09-08T11:00:00'),
        id: crypto.randomUUID(),
    },
    {
        title: 'Grading Season',
        description: 'A short reflection on burnout, boundaries, and why I started blocking my calendar during finals week this year.',
        author: 'Alan',
        tag: 'Tech',
        createdAt: new Date('2026-09-12T13:27:00'),
        id: crypto.randomUUID(),
    },
];
const post_tags = [
    'Tech', 'Lifestyle', 'Education', 'Hobby', 'Business'
];

app.get('/', (req, res) => {
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

