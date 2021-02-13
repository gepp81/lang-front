const express = require('express');

const app = express();

app.use(express.static('./dist/lang-front'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/lang-front/'}),
);

app.listen(process.env.PORT || 8080);